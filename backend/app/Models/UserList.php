<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserList extends Model
{
    protected $table    = 'user_lists';
    protected $fillable = ['user_id', 'content_id'];

    public function content() { return $this->belongsTo(Content::class); }
    public function user()    { return $this->belongsTo(User::class); }
}
