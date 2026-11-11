<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Organisation extends Model
{
    protected $fillable = [
        'user_id',
        'school_name',
        'subdomain',
        'school_type',
        'plan',
        'billing_cycle',
        'payment_method',
        'address',
        'city',
        'state',
        'phone',
        'website',
        'student_count',
        'status',
    ];

    protected $casts = [
        'student_count' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
