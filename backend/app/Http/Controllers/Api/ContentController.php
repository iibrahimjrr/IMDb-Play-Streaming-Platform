<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContentController extends Controller
{
    // ── Public endpoints ──────────────────────────────────────────────────────

    public function index(Request $request): JsonResponse
    {
        $items = Content::with('seasons.episodes')
            ->when($request->type,  fn($q) => $q->where('type', $request->type))
            ->when($request->genre, fn($q) => $q->where('genre', $request->genre))
            ->latest()->get();

        return response()->json(['success' => true, 'data' => $items->map(fn($c) => $this->fmt($c))]);
    }

    public function featured(): JsonResponse
    {
        $c = Content::with('seasons.episodes')->where('is_featured', true)->first()
            ?? Content::with('seasons.episodes')->latest()->first();

        return response()->json(['success' => true, 'data' => $c ? $this->fmt($c) : null]);
    }

    public function trending(): JsonResponse
    {
        $items = Content::where(fn($q) =>
            $q->where('is_hot', true)->orWhere('is_new', true)->orWhere('is_trending', true)
        )->latest()->get();

        return response()->json(['success' => true, 'data' => $items->map(fn($c) => $this->fmt($c))]);
    }

    public function topRated(): JsonResponse
    {
        $items = Content::where('is_top_rated', true)->orWhere('rating', '>=', 8.0)
            ->orderByDesc('rating')->get();

        return response()->json(['success' => true, 'data' => $items->map(fn($c) => $this->fmt($c))]);
    }

    public function movies(Request $request): JsonResponse
    {
        $items = Content::where('type', 'movie')
            ->when($request->genre, fn($q) => $q->where('genre', $request->genre))
            ->latest()->get();

        return response()->json(['success' => true, 'data' => $items->map(fn($c) => $this->fmt($c))]);
    }

    public function seriesList(Request $request): JsonResponse
    {
        $items = Content::with('seasons.episodes')->where('type', 'series')
            ->when($request->genre, fn($q) => $q->where('genre', $request->genre))
            ->latest()->get();

        return response()->json(['success' => true, 'data' => $items->map(fn($c) => $this->fmt($c))]);
    }

    public function search(Request $request): JsonResponse
    {
        $q     = $request->get('q', '');
        $items = Content::where(fn($query) =>
            $query->where('title', 'LIKE', "%{$q}%")
                  ->orWhere('description', 'LIKE', "%{$q}%")
                  ->orWhere('director', 'LIKE', "%{$q}%")
        )->limit(20)->latest()->get();

        return response()->json(['success' => true, 'data' => $items->map(fn($c) => $this->fmt($c))]);
    }

    public function byGenre(string $genre): JsonResponse
    {
        $items = Content::where('genre', urldecode($genre))->latest()->get();
        return response()->json(['success' => true, 'data' => $items->map(fn($c) => $this->fmt($c))]);
    }

    public function show(int $id): JsonResponse
    {
        $c = Content::with('seasons.episodes')->find($id);
        if (!$c) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        return response()->json(['success' => true, 'data' => $this->fmt($c)]);
    }

    public function related(int $id): JsonResponse
    {
        $c = Content::find($id);
        if (!$c) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        $items = Content::where('genre', $c->genre)->where('id', '!=', $id)->limit(6)->get();
        return response()->json(['success' => true, 'data' => $items->map(fn($c) => $this->fmt($c))]);
    }

    public function byDirector(string $name): JsonResponse
    {
        $items = Content::where('director', urldecode($name))->get();
        return response()->json(['success' => true, 'data' => $items->map(fn($c) => $this->fmt($c))]);
    }

    public function byCast(string $name): JsonResponse
    {
        $n     = urldecode($name);
        $items = Content::whereJsonContains('cast', $n)->get();
        return response()->json(['success' => true, 'data' => $items->map(fn($c) => $this->fmt($c))]);
    }

    // ── Admin endpoints ───────────────────────────────────────────────────────

    public function store(Request $request): JsonResponse
    {
        $v = Validator::make($request->all(), [
            'title'       => 'required|string|max:255',
            'type'        => 'required|in:movie,series',
            'genre'       => 'required|string',
            'year'        => 'required|string|max:4',
            'rating'      => 'required|numeric|min:0|max:10',
            'description' => 'required|string',
            'director'    => 'required|string',
            'cast'        => 'required|array',
            'image'       => 'required|string',
        ]);

        if ($v->fails()) {
            return response()->json(['success' => false, 'errors' => $v->errors()], 422);
        }

        if ($request->boolean('is_featured')) {
            Content::where('is_featured', true)->update(['is_featured' => false]);
        }

        $c = Content::create([
            'title'            => $request->title,
            'type'             => $request->type,
            'genre'            => $request->genre,
            'year'             => $request->year,
            'duration'         => $request->duration,
            'rating'           => $request->rating,
            'description'      => $request->description,
            'director'         => $request->director,
            'cast'             => $request->cast,
            'image'            => $request->image,
            'background_image' => $request->background_image,
            'watch_link'       => $request->watch_link,
            'is_hot'           => $request->boolean('is_hot'),
            'is_new'           => $request->boolean('is_new'),
            'is_trending'      => $request->boolean('is_trending'),
            'is_top_rated'     => $request->boolean('is_top_rated'),
            'is_featured'      => $request->boolean('is_featured'),
        ]);

        return response()->json(['success' => true, 'data' => $this->fmt($c)], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $c = Content::find($id);
        if (!$c) return response()->json(['success' => false, 'message' => 'Not found'], 404);

        if ($request->boolean('is_featured')) {
            Content::where('is_featured', true)->where('id', '!=', $id)->update(['is_featured' => false]);
        }

        $c->update(array_filter([
            'title'            => $request->title,
            'type'             => $request->type,
            'genre'            => $request->genre,
            'year'             => $request->year,
            'duration'         => $request->duration,
            'rating'           => $request->rating,
            'description'      => $request->description,
            'director'         => $request->director,
            'cast'             => $request->cast,
            'image'            => $request->image,
            'background_image' => $request->background_image,
            'watch_link'       => $request->watch_link,
            'is_hot'           => $request->has('is_hot') ? $request->boolean('is_hot') : null,
            'is_new'           => $request->has('is_new') ? $request->boolean('is_new') : null,
            'is_trending'      => $request->has('is_trending') ? $request->boolean('is_trending') : null,
            'is_top_rated'     => $request->has('is_top_rated') ? $request->boolean('is_top_rated') : null,
            'is_featured'      => $request->has('is_featured') ? $request->boolean('is_featured') : null,
        ], fn($v) => !is_null($v)));

        return response()->json(['success' => true, 'data' => $this->fmt($c->fresh())]);
    }

    public function destroy(int $id): JsonResponse
    {
        $c = Content::find($id);
        if (!$c) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        $c->delete();
        return response()->json(['success' => true, 'message' => 'Deleted.']);
    }

    public function setFeatured(int $id): JsonResponse
    {
        Content::where('is_featured', true)->update(['is_featured' => false]);
        $c = Content::findOrFail($id);
        $c->update(['is_featured' => true]);
        return response()->json(['success' => true, 'data' => $this->fmt($c)]);
    }

    // ── Format helper ─────────────────────────────────────────────────────────
    public function fmt(Content $c): array
    {
        $data = [
            'id'              => $c->id,
            'title'           => $c->title,
            'type'            => $c->type,
            'genre'           => $c->genre,
            'year'            => $c->year,
            'duration'        => $c->duration,
            'rating'          => (float) $c->rating,
            'description'     => $c->description,
            'director'        => $c->director,
            'cast'            => $c->cast ?? [],
            'image'           => $c->image,
            'backgroundImage' => $c->background_image,
            'watchLink'       => $c->watch_link,
            'isHot'           => (bool) $c->is_hot,
            'isNew'           => (bool) $c->is_new,
            'newRelease'      => (bool) $c->is_new,
            'trending'        => (bool) $c->is_trending,
            'topRated'        => (bool) $c->is_top_rated,
            'featured'        => (bool) $c->is_featured,
        ];

        if ($c->relationLoaded('seasons')) {
            $data['seasons'] = $c->seasons->map(function ($s) {
                return [
                    'id'       => $s->id,
                    'number'   => $s->number,
                    'title'    => $s->title,
                    'episodes' => $s->relationLoaded('episodes')
                        ? $s->episodes->map(fn($e) => [
                            'id'          => $e->id,
                            'number'      => $e->number,
                            'title'       => $e->title,
                            'description' => $e->description,
                            'duration'    => $e->duration,
                            'rating'      => (float) $e->rating,
                            'releaseDate' => $e->release_date,
                            'thumbnail'   => $e->thumbnail,
                            'watchLink'   => $e->watch_link,
                        ])->values()
                        : [],
                ];
            })->values();
        }

        return $data;
    }
}
