<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActivityLog extends Model
{
    protected $fillable = [
        'user_id',
        'event',
        'description',
        'subject_type',
        'subject_id',
        'ip_address',
        'user_agent',
        'properties',
    ];

    protected $casts = [
        'properties' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Helpers

    /**
     * Record an activity log entry.
     */
    public static function record(
        string $event,
        string $description,
        ?int $userId = null,
        ?string $subjectType = null,
        ?int $subjectId = null,
        array $properties = []
    ): self {
        return static::create([
            'user_id'      => $userId,
            'event'        => $event,
            'description'  => $description,
            'subject_type' => $subjectType,
            'subject_id'   => $subjectId,
            'ip_address'   => request()->ip(),
            'user_agent'   => substr(request()->userAgent() ?? '', 0, 255),
            'properties'   => $properties ?: null,
        ]);
    }

    /**
     * Map event slugs to icon names consumed by the frontend.
     */
    public static function iconFor(string $event): string
    {
        if (str_contains($event, 'login'))    return 'log-in';
        if (str_contains($event, 'logout'))   return 'log-out';
        if (str_contains($event, 'register')) return 'user-plus';
        if (str_contains($event, 'demo'))     return 'presentation';
        if (str_contains($event, 'password')) return 'key';
        if (str_contains($event, 'profile'))  return 'user-pen';
        if (str_contains($event, 'delete'))   return 'trash-2';
        return 'activity';
    }

    /**
     * Map event slugs to colour classes consumed by the frontend.
     */
    public static function colorFor(string $event): string
    {
        if (str_contains($event, 'login'))    return 'blue';
        if (str_contains($event, 'logout'))   return 'gray';
        if (str_contains($event, 'register')) return 'green';
        if (str_contains($event, 'demo'))     return 'oxblood';
        if (str_contains($event, 'password')) return 'yellow';
        if (str_contains($event, 'profile'))  return 'purple';
        if (str_contains($event, 'delete'))   return 'red';
        return 'gray';
    }
}
