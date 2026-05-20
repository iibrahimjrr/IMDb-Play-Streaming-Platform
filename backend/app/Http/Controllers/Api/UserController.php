<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function profile(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json([
            'success' => true,
            'data'    => [
                'id'         => $user->id,
                'name'       => $user->name,
                'email'      => $user->email,
                'role'       => $user->role,
                'avatar'     => $user->avatar,
                'myList'     => $user->myList()->pluck('content_id'),
                'favorites'  => $user->favorites()->pluck('content_id'),
                'created_at' => $user->created_at,
            ],
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $user = $request->user();
        $request->validate([
            'name'  => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
        ]);
        $user->update($request->only(['name', 'email']));
        return response()->json(['success' => true, 'message' => 'Profile updated.', 'data' => $user]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $user = $request->user();
        $request->validate([
            'current_password' => 'required|string',
            'password'         => 'required|string|min:6|confirmed',
        ]);
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Current password is incorrect.'], 422);
        }
        $user->update(['password' => Hash::make($request->password)]);
        $user->tokens()->delete();
        return response()->json(['success' => true, 'message' => 'Password changed. Please log in again.']);
    }
}
