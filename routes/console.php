<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('user:make-admin {email}', function (string $email) {
    $user = \App\Models\User::where('email', $email)->first();
    if (! $user) {
        $this->error("User with email {$email} not found.");
        return 1;
    }
    $user->update(['is_admin' => true]);
    $this->info("User {$user->name} ({$email}) is now an administrator.");
    return 0;
})->purpose('Promote a user to administrator');

Artisan::command('make:admin {email?} {--name=} {--password=}', function (?string $email = null) {
    $email = $email ?: $this->ask('Admin email address');

    if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $this->error('Invalid email address.');
        return 1;
    }

    $existing = \App\Models\User::where('email', $email)->first();

    if ($existing) {
        if ($existing->is_admin) {
            $this->warn("User {$email} is already an administrator.");
            return 0;
        }
        if ($this->confirm("User {$email} already exists. Promote them to Administrator?", true)) {
            $existing->update(['is_admin' => true]);
            $this->info("✓ User {$existing->name} ({$email}) is now an Administrator.");
            return 0;
        }
        return 1;
    }

    $name = $this->option('name') ?: $this->ask('Admin name', 'Admin');
    $password = $this->option('password') ?: $this->secret('Admin password (min 8 chars)');

    if (! $password || strlen($password) < 8) {
        $this->error('Password must be at least 8 characters long.');
        return 1;
    }

    $user = \App\Models\User::create([
        'name' => $name,
        'email' => $email,
        'password' => \Illuminate\Support\Facades\Hash::make($password),
        'is_admin' => true,
        'email_verified_at' => now(),
    ]);

    $this->info("✓ Administrator [{$name}] ({$email}) registered successfully!");
    return 0;
})->purpose('Register a new administrator account directly from the CLI');
