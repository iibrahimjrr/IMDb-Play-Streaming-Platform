<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = [
        'season_id', 'number', 'title', 'description',
        'duration', 'rating', 'release_date', 'thumbnail', 'watch_link',
    ];

    protected $casts = ['rating' => 'float'];

    public function season()
    {
        return $this->belongsTo(Season::class);
    }
}
