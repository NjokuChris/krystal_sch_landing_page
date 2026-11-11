<?php

use App\Models\Organisation;
use App\Models\User;

test('guests are redirected to login when visiting organisation create', function () {
    $this->get(route('organisation.create'))->assertRedirect('/login');
});

test('users without organisation can view create organisation wizard', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('organisation.create'))
        ->assertOk();
});

test('users with organisation are redirected to dashboard from organisation create', function () {
    $user = User::factory()->create();
    Organisation::create([
        'user_id' => $user->id,
        'school_name' => 'Existing School',
        'school_type' => 'secondary',
        'plan' => 'premium',
        'billing_cycle' => 'yearly',
    ]);

    $this->actingAs($user)
        ->get(route('organisation.create'))
        ->assertRedirect(route('dashboard'));
});

test('users can create an organisation and are redirected to dashboard', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('organisation.store'), [
        'school_name'    => 'Krystal High School',
        'subdomain'      => 'krystal-high',
        'school_type'    => 'secondary',
        'plan'           => 'standard',
        'billing_cycle'  => 'termly',
        'payment_method' => 'card',
        'student_count'  => 250,
        'phone'          => '+2348012345678',
        'city'           => 'Lagos',
        'state'          => 'Lagos',
    ]);

    $response->assertRedirect(route('dashboard'));

    $this->assertDatabaseHas('organisations', [
        'user_id'        => $user->id,
        'school_name'    => 'Krystal High School',
        'subdomain'      => 'krystal-high',
        'payment_method' => 'card',
        'plan'           => 'standard',
        'status'         => 'active',
    ]);

    $this->assertDatabaseHas('activity_logs', [
        'event' => 'organisation_created',
        'user_id' => $user->id,
    ]);
});

test('users cannot create duplicate organisations', function () {
    $user = User::factory()->create();
    Organisation::create([
        'user_id' => $user->id,
        'school_name' => 'Existing School',
        'school_type' => 'primary',
        'plan' => 'standard',
        'billing_cycle' => 'termly',
    ]);

    $response = $this->actingAs($user)->post(route('organisation.store'), [
        'school_name' => 'Second School',
        'school_type' => 'secondary',
        'plan' => 'premium',
        'billing_cycle' => 'yearly',
    ]);

    $response->assertRedirect(route('dashboard'));
    expect(Organisation::where('user_id', $user->id)->count())->toBe(1);
});

