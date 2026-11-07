<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\DemoRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Main admin dashboard — overview stats + recent activity.
     */
    public function index(): Response
    {
        $stats = $this->buildStats();
        $recentActivity = $this->recentActivity(30);
        $demoRequestsBreakdown = $this->demoRequestsBreakdown();
        $registrationTrend = $this->registrationTrend();

        return Inertia::render('admin/dashboard', compact(
            'stats',
            'recentActivity',
            'demoRequestsBreakdown',
            'registrationTrend',
        ));
    }

    /**
     * Paginated users list with search.
     */
    public function users(Request $request): Response
    {
        $search = $request->input('search', '');

        $users = User::query()
            ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%"))
            ->withCount('activityLogs')
            ->latest()
            ->paginate(20)
            ->withQueryString()
            ->through(fn (User $u) => [
                'id'                 => $u->id,
                'name'               => $u->name,
                'email'              => $u->email,
                'is_admin'           => $u->is_admin,
                'email_verified_at'  => $u->email_verified_at?->toISOString(),
                'created_at'         => $u->created_at->toISOString(),
                'activity_logs_count'=> $u->activity_logs_count,
            ]);

        return Inertia::render('admin/users', compact('users', 'search'));
    }

    /**
     * Paginated demo requests list with search + status filter.
     */
    public function demoRequests(Request $request): Response
    {
        $search = $request->input('search', '');
        $status = $request->input('status', '');

        $demoRequests = DemoRequest::query()
            ->when($search, fn ($q) => $q
                ->where('full_name', 'like', "%{$search}%")
                ->orWhere('school_name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%"))
            ->when($status, fn ($q) => $q->where('status', $status))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/demo-requests', compact('demoRequests', 'search', 'status'));
    }

    /**
     * Update a demo request status.
     */
    public function updateDemoRequestStatus(Request $request, DemoRequest $demoRequest)
    {
        $request->validate(['status' => ['required', 'in:new,contacted,converted,closed']]);

        $demoRequest->update(['status' => $request->status]);

        ActivityLog::record(
            event: 'demo_request_status_update',
            description: "Admin updated demo request #{$demoRequest->id} ({$demoRequest->school_name}) status to {$request->status}.",
            userId: $request->user()->id,
            subjectType: DemoRequest::class,
            subjectId: $demoRequest->id,
        );

        return back();
    }

    /**
     * Toggle admin status for a user.
     */
    public function toggleAdmin(Request $request, User $user)
    {
        // Prevent admin from removing their own admin access
        if ($user->id === $request->user()->id) {
            return back()->withErrors(['error' => 'You cannot change your own admin status.']);
        }

        $user->update(['is_admin' => ! $user->is_admin]);

        $action = $user->is_admin ? 'granted admin access to' : 'revoked admin access from';

        ActivityLog::record(
            event: 'admin_toggle',
            description: "Admin {$request->user()->name} {$action} {$user->name}.",
            userId: $request->user()->id,
            subjectType: User::class,
            subjectId: $user->id,
        );

        return back();
    }

    /**
     * Full paginated activity log with optional filters.
     */
    public function activityLog(Request $request): Response
    {
        $event  = $request->input('event', '');
        $userId = $request->input('user_id', '');

        $logs = ActivityLog::with('user:id,name,email')
            ->when($event, fn ($q) => $q->where('event', $event))
            ->when($userId, fn ($q) => $q->where('user_id', $userId))
            ->latest()
            ->paginate(50)
            ->withQueryString()
            ->through(fn (ActivityLog $log) => [
                'id'           => $log->id,
                'event'        => $log->event,
                'description'  => $log->description,
                'ip_address'   => $log->ip_address,
                'icon'         => ActivityLog::iconFor($log->event),
                'color'        => ActivityLog::colorFor($log->event),
                'properties'   => $log->properties,
                'created_at'   => $log->created_at->toISOString(),
                'user'         => $log->user ? [
                    'id'    => $log->user->id,
                    'name'  => $log->user->name,
                    'email' => $log->user->email,
                ] : null,
            ]);

        $eventTypes = ActivityLog::select('event')
            ->distinct()
            ->orderBy('event')
            ->pluck('event');

        $users = User::select('id', 'name', 'email')->orderBy('name')->get();

        return Inertia::render('admin/activity-log', compact('logs', 'eventTypes', 'users', 'event', 'userId'));
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private function buildStats(): array
    {
        $now   = now();
        $today = $now->startOfDay();

        return [
            'total_users'           => User::count(),
            'users_today'           => User::whereDate('created_at', $today)->count(),
            'users_this_week'       => User::where('created_at', '>=', $now->copy()->subDays(7))->count(),
            'admin_users'           => User::where('is_admin', true)->count(),
            'total_demo_requests'   => DemoRequest::count(),
            'new_demo_requests'     => DemoRequest::where('status', 'new')->count(),
            'converted_demo_requests' => DemoRequest::where('status', 'converted')->count(),
            'total_activity_logs'   => ActivityLog::count(),
            'activity_today'        => ActivityLog::whereDate('created_at', $today)->count(),
            'logins_today'          => ActivityLog::where('event', 'login')->whereDate('created_at', $today)->count(),
        ];
    }

    private function recentActivity(int $limit = 30): array
    {
        return ActivityLog::with('user:id,name,email')
            ->latest()
            ->limit($limit)
            ->get()
            ->map(fn (ActivityLog $log) => [
                'id'          => $log->id,
                'event'       => $log->event,
                'description' => $log->description,
                'icon'        => ActivityLog::iconFor($log->event),
                'color'       => ActivityLog::colorFor($log->event),
                'ip_address'  => $log->ip_address,
                'created_at'  => $log->created_at->toISOString(),
                'user'        => $log->user ? [
                    'id'    => $log->user->id,
                    'name'  => $log->user->name,
                    'email' => $log->user->email,
                ] : null,
            ])
            ->toArray();
    }

    private function demoRequestsBreakdown(): array
    {
        return DemoRequest::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
    }

    private function registrationTrend(): array
    {
        // Last 14 days, one entry per day
        return User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(13)->startOfDay())
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($row) => ['date' => $row->date, 'count' => (int) $row->count])
            ->toArray();
    }
}
