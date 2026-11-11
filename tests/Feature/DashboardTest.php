<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users without organisation are redirected to organisation create', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->get('/dashboard')->assertRedirect(route('organisation.create'));
});

test('authenticated users with organisation can visit the dashboard', function () {
    $user = User::factory()->create();
    \App\Models\Organisation::create([
        'user_id' => $user->id,
        'school_name' => 'Test School',
        'school_type' => 'primary',
        'plan' => 'standard',
        'billing_cycle' => 'termly',
    ]);

    $this->actingAs($user);

    $this->get('/dashboard')->assertOk();
});

test('authenticated admin users can visit the dashboard', function () {
    $user = User::factory()->create(['is_admin' => true]);

    $this->actingAs($user);

    $this->get('/dashboard')->assertOk();
});
