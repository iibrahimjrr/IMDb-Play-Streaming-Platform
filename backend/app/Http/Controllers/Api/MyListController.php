<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\UserList;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MyListController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $items = $request->user()->myList()->with('content')->get()
            ->pluck('content')->filter()->values();
        return response()->json(['success' => true, 'data' => $items]);
    }

    public function add(Request $request, int $id): JsonResponse
    {
        if (!Content::find($id)) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        UserList::firstOrCreate(['user_id' => $request->user()->id, 'content_id' => $id]);
        return response()->json(['success' => true, 'message' => 'Added to My List.']);
    }

    public function remove(Request $request, int $id): JsonResponse
    {
        $request->user()->myList()->where('content_id', $id)->delete();
        return response()->json(['success' => true, 'message' => 'Removed from My List.']);
    }
}
