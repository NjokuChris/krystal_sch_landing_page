<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Organisation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganisationController extends Controller
{
    /**
     * Show the create organisation wizard.
     * Redirect to dashboard if user already has an organisation.
     */
    public function create(Request $request): Response|RedirectResponse
    {
        if ($request->user()->organisation) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('organisation/create');
    }

    /**
     * Store the new organisation.
     */
    public function store(Request $request): RedirectResponse
    {
        // Prevent duplicate
        if ($request->user()->organisation) {
            return redirect()->route('dashboard');
        }

        $validated = $request->validate([
            'school_name'    => ['required', 'string', 'max:255'],
            'subdomain'      => ['nullable', 'string', 'max:100', 'regex:/^[a-zA-Z0-9-]+$/'],
            'school_type'    => ['required', 'string', 'in:nursery,primary,secondary,nursery_primary,university,other'],
            'plan'           => ['required', 'string', 'in:standard,premium,enterprise'],
            'billing_cycle'  => ['required', 'string', 'in:termly,yearly'],
            'payment_method' => ['nullable', 'string', 'in:card,bank_transfer,pay_later'],
            'address'        => ['nullable', 'string', 'max:255'],
            'city'           => ['nullable', 'string', 'max:100'],
            'state'          => ['nullable', 'string', 'max:100'],
            'phone'          => ['nullable', 'string', 'max:30'],
            'website'        => ['nullable', 'string', 'max:255'],
            'student_count'  => ['nullable', 'integer', 'min:1'],
        ]);

        if (empty($validated['subdomain'])) {
            $validated['subdomain'] = \Illuminate\Support\Str::slug($validated['school_name']);
        }
        $validated['subdomain'] = strtolower($validated['subdomain']);

        if (empty($validated['payment_method'])) {
            $validated['payment_method'] = 'card';
        }

        $organisation = Organisation::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'status'  => 'active',
        ]);

        ActivityLog::record(
            event: 'organisation_created',
            description: "{$request->user()->name} created organisation: {$organisation->school_name}.",
            userId: $request->user()->id,
            subjectType: Organisation::class,
            subjectId: $organisation->id,
            properties: ['plan' => $organisation->plan, 'billing_cycle' => $organisation->billing_cycle],
        );

        return redirect()->route('dashboard')
            ->with('status', 'Your school has been set up successfully! Welcome to Krystal.')
            ->with('payment_success', true);
    }
}
