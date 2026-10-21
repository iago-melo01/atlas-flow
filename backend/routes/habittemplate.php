<?php

use App\Http\Controllers\HabitTemplate\UpdateHabitTemplateController;
use App\Http\Controllers\HabitTemplate\CreateHabitTemplateController;
use App\Http\Controllers\HabitTemplate\DeleteHabitTemplateController;
use App\Http\Controllers\HabitTemplate\ListHabitTemplateController;
use Illuminate\Support\Facades\Route;

Route::prefix('/habittemplate')->group(function () {
    Route::middleware('auth:sanctum')->group(function (){
        Route::get('/list', [ListHabitTemplateController::class, 'list']);
        Route::post('/create', [CreateHabitTemplateController::class, 'store']);
        Route::put('/{habitTemplate:uuid}', [UpdateHabitTemplateController::class, 'update']);

        //tipo do parametro 'habitTemplate' , e coluna do parametro 'uuid' || o laravel faz 
        //isso pra ja executar um HabitTemplate::where(uuid) automaticamente
        Route::delete('/{habitTemplate:uuid}',[DeleteHabitTemplateController::class, 'delete'] );
    });
});

