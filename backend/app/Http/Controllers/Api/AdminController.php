<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class AdminController extends Controller
{
    public function stats(): JsonResponse
    {
        return Response::json([
            'success' => true,
            'data'    => [
                'total_movies'   => Content::where('type', 'movie')->count(),
                'total_series'   => Content::where('type', 'series')->count(),
                'total_content'  => Content::count(),
                'total_users'    => User::where('role', 'user')->count(),
                'trending_count' => Content::where(function ($q) {
                    $q->where('is_hot', true)
                      ->orWhere('is_new', true);
                })->count(),
            ],
        ]);
    }

    public function users(): JsonResponse
    {
        return Response::json([
            'success' => true,
            'data'    => User::select(['id','name','email','role','created_at'])->orderByDesc('created_at')->get(),
        ]);
    }

    public function deleteUser(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        if ($user->role === 'admin') {
            return Response::json(['success' => false, 'message' => 'Cannot delete admin.'], 403);
        }

        $user->delete();
        return Response::json(['success' => true, 'message' => 'User deleted.']);
    }
}
