<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ModelReleaseController;

Route::get('/health', function () {
    return response()->json([
        'status' => 'success',
        'application' => 'ScamShield AI',
        'message' => 'Laravel API is working'
    ]);
});

Route::get(
    '/models/latest',
    [ModelReleaseController::class, 'latest']
);