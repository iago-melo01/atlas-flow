<?php

use App\Http\Controllers\Habit\UpdateHabitTemplateController;
use App\Http\Controllers\HabitTemplate\CreateHabitTemplateController;
use App\Http\Controllers\HabitTemplate\DeleteHabitTemplateController;
use App\Http\Controllers\HabitTemplate\ListHabitTemplateController;
use Illuminate\Support\Facades\Route;

Route::prefix('/habittemplate')->group(function () {
    Route::middleware('auth:sanctum')->group(function (){
        Route::get('/list', [ListHabitTemplateController::class, 'list']);
        Route::post('/create', [CreateHabitTemplateController::class, 'store']);
        Route::put('/{habit:uuid}', [UpdateHabitTemplateController::class, 'update']);
        Route::delete('/{habit:uuid}',[DeleteHabitTemplateController::class, 'delete'] );
    });
});

