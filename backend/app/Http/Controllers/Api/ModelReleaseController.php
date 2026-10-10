<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ModelRelease;
use Illuminate\Http\JsonResponse;

class ModelReleaseController extends Controller
{
    public function latest(): JsonResponse
    {
        $model = ModelRelease::query()
            ->where('is_active', true)
            ->orderByDesc('created_at')
            ->first();

        if (!$model) {
            return response()->json([
                'message' => 'No active model release'
            ], 404);
        }

        return response()->json([
            'version' => $model->version,
            'name' => $model->model_name,
            'model_url' => $model->model_url,
            'tokenizer_url' => $model->tokenizer_url,
            'sha256' => $model->sha256,
            'file_size' => $model->file_size,
        ]);
    }
}