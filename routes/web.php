<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DemoRequestController;
use App\Http\Controllers\OrganisationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('history', [DashboardController::class, 'history'])->name('history');
    Route::get('bills', [DashboardController::class, 'bills'])->name('bills');

    // Organisation setup wizard
    Route::get('organisation/create', [OrganisationController::class, 'create'])->name('organisation.create');
    Route::post('organisation', [OrganisationController::class, 'store'])->name('organisation.store');
});

// ── Admin routes ──────────────────────────────────────────────────────────────
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Overview dashboard
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Users
    Route::get('/users', [AdminDashboardController::class, 'users'])->name('users');
    Route::post('/users/{user}/toggle-admin', [AdminDashboardController::class, 'toggleAdmin'])->name('users.toggle-admin');

    // Demo requests
    Route::get('/demo-requests', [AdminDashboardController::class, 'demoRequests'])->name('demo-requests');
    Route::patch('/demo-requests/{demoRequest}/status', [AdminDashboardController::class, 'updateDemoRequestStatus'])->name('demo-requests.status');

    // Activity log
    Route::get('/activity-log', [AdminDashboardController::class, 'activityLog'])->name('activity-log');
});

// Demo request endpoint — rate-limited to prevent abuse
Route::middleware(['throttle:10,1'])->group(function () {
    Route::post('/demo-request', [DemoRequestController::class, 'store'])
        ->name('demo.request');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
