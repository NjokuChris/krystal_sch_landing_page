<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\DemoRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        if (! $request->user()->organisation && ! $request->user()->is_admin) {
            return redirect()->route('organisation.create');
        }

        $now   = now();
        $today = $now->copy()->startOfDay();

        // ── Stats ─────────────────────────────────────────────────────
        $stats = [
            'total_users'         => User::count(),
            'new_users_today'     => User::whereDate('created_at', $today)->count(),
            'new_users_week'      => User::where('created_at', '>=', $now->copy()->subDays(6)->startOfDay())->count(),
            'logins_today'        => ActivityLog::where('event', 'login')->whereDate('created_at', $today)->count(),
            'registrations_today' => ActivityLog::where('event', 'register')->whereDate('created_at', $today)->count(),
            'total_demo_requests' => DemoRequest::count(),
            'new_demo_requests'   => DemoRequest::where('status', 'new')->count(),
            'total_events_today'  => ActivityLog::whereDate('created_at', $today)->count(),
        ];

        // ── Recent activity feed (last 40 events) ─────────────────────
        $recentActivity = ActivityLog::with('user:id,name,email')
            ->latest()
            ->limit(40)
            ->get()
            ->map(fn (ActivityLog $log) => [
                'id'          => $log->id,
                'event'       => $log->event,
                'description' => $log->description,
                'icon'        => ActivityLog::iconFor($log->event),
                'color'       => ActivityLog::colorFor($log->event),
                'ip_address'  => $log->ip_address,
                'created_at'  => $log->created_at->toISOString(),
                'user'        => $log->user
                    ? ['id' => $log->user->id, 'name' => $log->user->name, 'email' => $log->user->email]
                    : null,
            ]);

        // ── Recent logins (last 10) ────────────────────────────────────
        $recentLogins = ActivityLog::with('user:id,name,email')
            ->where('event', 'login')
            ->latest()
            ->limit(10)
            ->get()
            ->map(fn (ActivityLog $log) => [
                'id'         => $log->id,
                'ip_address' => $log->ip_address,
                'created_at' => $log->created_at->toISOString(),
                'user'       => $log->user
                    ? ['id' => $log->user->id, 'name' => $log->user->name, 'email' => $log->user->email]
                    : null,
            ]);

        // ── Recent registrations (last 10) ────────────────────────────
        $recentRegistrations = User::latest()
            ->limit(10)
            ->get(['id', 'name', 'email', 'created_at'])
            ->map(fn (User $u) => [
                'id'         => $u->id,
                'name'       => $u->name,
                'email'      => $u->email,
                'created_at' => $u->created_at->toISOString(),
            ]);

        // ── 7-day activity trend ──────────────────────────────────────
        $activityTrend = ActivityLog::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', $now->copy()->subDays(6)->startOfDay())
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($row) => ['date' => $row->date, 'count' => (int) $row->count]);

        return Inertia::render('dashboard', compact(
            'stats',
            'recentActivity',
            'recentLogins',
            'recentRegistrations',
            'activityTrend',
        ));
    }

    public function history(Request $request): Response|RedirectResponse
    {
        if (! $request->user()->organisation && ! $request->user()->is_admin) {
            return redirect()->route('organisation.create');
        }

        $logs = ActivityLog::where('user_id', $request->user()->id)
            ->latest()
            ->paginate(20)
            ->through(fn (ActivityLog $log) => [
                'id'          => $log->id,
                'event'       => $log->event,
                'description' => $log->description,
                'ip_address'  => $log->ip_address,
                'created_at'  => $log->created_at->toISOString(),
            ]);

        return Inertia::render('history', compact('logs'));
    }

    public function bills(Request $request): Response|RedirectResponse
    {
        if (! $request->user()->organisation && ! $request->user()->is_admin) {
            return redirect()->route('organisation.create');
        }

        $organisation = $request->user()->organisation;

        return Inertia::render('bills', compact('organisation'));
    }
}
