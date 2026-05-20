<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    protected $fillable = ['content_id', 'number', 'title'];

    public function content()
    {
        return $this->belongsTo(Content::class);
    }

    public function episodes()
    {
        return $this->hasMany(Episode::class)->orderBy('number');
    }
}
