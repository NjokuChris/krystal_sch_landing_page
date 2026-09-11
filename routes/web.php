<?php

use App\Http\Controllers\DemoRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Demo request endpoint — rate-limited to prevent abuse
Route::middleware(['throttle:10,1'])->group(function () {
    Route::post('/demo-request', [DemoRequestController::class, 'store'])
        ->name('demo.request');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
