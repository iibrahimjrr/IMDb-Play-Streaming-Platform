<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Content extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'type', 'genre', 'year', 'duration', 'rating',
        'description', 'director', 'cast', 'image', 'background_image',
        'watch_link', 'is_hot', 'is_new', 'is_trending', 'is_top_rated', 'is_featured',
    ];

    protected $casts = [
        'cast'         => 'array',
        'rating'       => 'float',
        'is_hot'       => 'boolean',
        'is_new'       => 'boolean',
        'is_trending'  => 'boolean',
        'is_top_rated' => 'boolean',
        'is_featured'  => 'boolean',
    ];

    public function seasons()
    {
        return $this->hasMany(Season::class)->orderBy('number');
    }
}
