<?php

use Illuminate\Support\Facades\Route;

// No web routes — API only
Route::get('/', fn() => response()->json(['message' => 'IMDb Play API', 'version' => '1.0']));
