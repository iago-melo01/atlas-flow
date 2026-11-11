<?php

use App\Http\Controllers\Habit\CreateHabitController;
use App\Http\Controllers\Habit\ListHabitController;
use App\Http\Controllers\Habit\UpdateHabitController;
use App\Http\Controllers\Habit\DeleteHabitController;
use App\Http\Controllers\HabitCheckIn\CreateHabitCheckInController;
use App\Http\Controllers\HabitCheckIn\DeleteHabitCheckInController;
use Illuminate\Support\Facades\Route;

Route::prefix('/habit')->group(function () {
    Route::middleware('auth:sanctum')->group(function (){
        Route::get('/list', [ListHabitController::class, 'list']);
        Route::post('/create', [CreateHabitController::class, 'store']);
        Route::put('/{habit:uuid}', [UpdateHabitController::class, 'update']);
        Route::delete('/{habit:uuid}', [DeleteHabitController::class, 'delete']);

        Route::post('/{habit:uuid}/checkin', [CreateHabitCheckInController::class, 'store']);
        Route::delete('/{habit:uuid}/checkin', [DeleteHabitCheckInController::class, 'delete']);
    });
});

