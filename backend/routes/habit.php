<?php

use App\Http\Controllers\Habit\CreateHabitController;
use App\Http\Controllers\Habit\ListHabitController;
use Illuminate\Support\Facades\Route;

Route::prefix('/habit')->group(function () {
    Route::middleware('auth:sanctum')->group(function (){
        Route::get('/list', [ListHabitController::class, 'list']);
        Route::post('/create', [CreateHabitController::class, 'store']);
    });
});

