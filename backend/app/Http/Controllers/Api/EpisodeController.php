<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use App\Models\Season;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    public function bySeasonIndex(int $seasonId): JsonResponse
    {
        $s = Season::with('episodes')->findOrFail($seasonId);
        return response()->json(['success' => true, 'data' => $s->episodes->map(fn($e) => $this->fmt($e))]);
    }

    public function show(int $id): JsonResponse
    {
        $e = Episode::findOrFail($id);
        return response()->json(['success' => true, 'data' => $this->fmt($e)]);
    }

    public function store(Request $request, int $seasonId): JsonResponse
    {
        $request->validate(['number' => 'required|integer', 'title' => 'required|string']);
        $e = Episode::create(array_merge($request->only(['number','title','description','duration','rating','release_date','thumbnail','watch_link']), ['season_id' => $seasonId]));
        return response()->json(['success' => true, 'data' => $this->fmt($e)], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $e = Episode::findOrFail($id);
        $e->update($request->only(['number','title','description','duration','rating','release_date','thumbnail','watch_link']));
        return response()->json(['success' => true, 'data' => $this->fmt($e->fresh())]);
    }

    public function destroy(int $id): JsonResponse
    {
        Episode::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Episode deleted.']);
    }

    private function fmt(Episode $e): array
    {
        return [
            'id'          => $e->id,
            'number'      => $e->number,
            'title'       => $e->title,
            'description' => $e->description,
            'duration'    => $e->duration,
            'rating'      => (float) $e->rating,
            'releaseDate' => $e->release_date,
            'thumbnail'   => $e->thumbnail,
            'watchLink'   => $e->watch_link,
        ];
    }
}
