<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\SeriesController;
use App\Http\Controllers\Api\EpisodeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\MyListController;

/*
|--------------------------------------------------------------------------
| IMDb Play API Routes
| Base URL: /api/...
| Auth: Sanctum Bearer + SPA cookie auth. CSRF is required for mutating requests when using the frontend.
|--------------------------------------------------------------------------
*/

// ── Public Auth ──────────────────────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('/register',        [AuthController::class, 'register']);
    Route::post('/login',           [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password',  [AuthController::class, 'resetPassword']);
});

// ── Public Content ───────────────────────────────────────────────────────────
Route::prefix('contents')->group(function () {
    Route::get('/',              [ContentController::class, 'index']);
    Route::get('/featured',      [ContentController::class, 'featured']);
    Route::get('/trending',      [ContentController::class, 'trending']);
    Route::get('/top-rated',     [ContentController::class, 'topRated']);
    Route::get('/search',        [ContentController::class, 'search']);
    Route::get('/movies',        [ContentController::class, 'movies']);
    Route::get('/series-list',   [ContentController::class, 'seriesList']);
    Route::get('/genre/{genre}', [ContentController::class, 'byGenre']);
    Route::get('/{id}/related',  [ContentController::class, 'related']);
    Route::get('/{id}',          [ContentController::class, 'show']);
});

Route::get('/series/{id}/seasons',         [SeriesController::class,  'seasons']);
Route::get('/seasons/{seasonId}/episodes', [EpisodeController::class, 'bySeasonIndex']);
Route::get('/episodes/{id}',              [EpisodeController::class, 'show']);
Route::get('/directors/{name}/contents',  [ContentController::class, 'byDirector']);
Route::get('/cast/{name}/contents',       [ContentController::class, 'byCast']);

// ── Authenticated ────────────────────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth info
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    // User profile
    Route::get('/user',          [UserController::class, 'profile']);
    Route::put('/user',          [UserController::class, 'update']);
    Route::put('/user/password', [UserController::class, 'changePassword']);

    // My List
    Route::get   ('/my-list',       [MyListController::class, 'index']);
    Route::post  ('/my-list/{id}',  [MyListController::class, 'add']);
    Route::delete('/my-list/{id}',  [MyListController::class, 'remove']);

    // Favorites
    Route::get   ('/favorites',      [FavoriteController::class, 'index']);
    Route::post  ('/favorites/{id}', [FavoriteController::class, 'add']);
    Route::delete('/favorites/{id}', [FavoriteController::class, 'remove']);

    // ── Admin only ────────────────────────────────────────────────────────────
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get   ('/stats',                      [AdminController::class,   'stats']);
        Route::get   ('/users',                      [AdminController::class,   'users']);
        Route::delete('/users/{id}',                 [AdminController::class,   'deleteUser']);
        Route::post  ('/contents',                   [ContentController::class, 'store']);
        Route::put   ('/contents/{id}',              [ContentController::class, 'update']);
        Route::delete('/contents/{id}',              [ContentController::class, 'destroy']);
        Route::put   ('/contents/{id}/featured',     [ContentController::class, 'setFeatured']);
        Route::post  ('/contents/{id}/seasons',      [SeriesController::class,  'addSeason']);
        Route::put   ('/seasons/{id}',               [SeriesController::class,  'updateSeason']);
        Route::delete('/seasons/{id}',               [SeriesController::class,  'deleteSeason']);
        Route::post  ('/seasons/{id}/episodes',      [EpisodeController::class, 'store']);
        Route::put   ('/episodes/{id}',              [EpisodeController::class, 'update']);
        Route::delete('/episodes/{id}',              [EpisodeController::class, 'destroy']);
    });
});
