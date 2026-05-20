<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\Season;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SeriesController extends Controller
{
    public function seasons(int $id): JsonResponse
    {
        $c = Content::with('seasons.episodes')->find($id);
        if (!$c) return response()->json(['success' => false, 'message' => 'Not found'], 404);

        $seasons = $c->seasons->map(fn($s) => [
            'id'       => $s->id,
            'number'   => $s->number,
            'title'    => $s->title,
            'episodes' => $s->episodes->map(fn($e) => [
                'id'          => $e->id,
                'number'      => $e->number,
                'title'       => $e->title,
                'description' => $e->description,
                'duration'    => $e->duration,
                'rating'      => (float) $e->rating,
                'releaseDate' => $e->release_date,
                'thumbnail'   => $e->thumbnail,
                'watchLink'   => $e->watch_link,
            ])->values(),
        ]);

        return response()->json(['success' => true, 'data' => $seasons]);
    }

    public function addSeason(Request $request, int $id): JsonResponse
    {
        $request->validate(['number' => 'required|integer', 'title' => 'required|string']);
        $s = Season::create(['content_id' => $id, 'number' => $request->number, 'title' => $request->title]);
        return response()->json(['success' => true, 'data' => $s], 201);
    }

    public function updateSeason(Request $request, int $id): JsonResponse
    {
        $s = Season::findOrFail($id);
        $s->update($request->only(['number', 'title']));
        return response()->json(['success' => true, 'data' => $s]);
    }

    public function deleteSeason(int $id): JsonResponse
    {
        Season::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Season deleted.']);
    }
}
