<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\Favorite;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $items = $request->user()->favorites()->with('content')->get()
            ->pluck('content')->filter()->values();
        return response()->json(['success' => true, 'data' => $items]);
    }

    public function add(Request $request, int $id): JsonResponse
    {
        if (!Content::find($id)) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        Favorite::firstOrCreate(['user_id' => $request->user()->id, 'content_id' => $id]);
        return response()->json(['success' => true, 'message' => 'Added to Favorites.']);
    }

    public function remove(Request $request, int $id): JsonResponse
    {
        $request->user()->favorites()->where('content_id', $id)->delete();
        return response()->json(['success' => true, 'message' => 'Removed from Favorites.']);
    }
}
