<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class MakeAdmin extends Command
{
    protected $signature = 'admin:make {email : The email address of the user to promote}
                                       {--revoke : Revoke admin access instead of granting it}';

    protected $description = 'Grant or revoke admin access for a user by email address';

    public function handle(): int
    {
        $email  = $this->argument('email');
        $revoke = $this->option('revoke');

        $user = User::where('email', $email)->first();

        if (! $user) {
            $this->error("No user found with email: {$email}");
            return self::FAILURE;
        }

        if ($revoke) {
            $user->update(['is_admin' => false]);
            $this->info("Admin access revoked from {$user->name} ({$user->email}).");
        } else {
            $user->update(['is_admin' => true]);
            $this->info("Admin access granted to {$user->name} ({$user->email}).");
            $this->line('They can now visit <fg=yellow>/admin</> after logging in.');
        }

        return self::SUCCESS;
    }
}
