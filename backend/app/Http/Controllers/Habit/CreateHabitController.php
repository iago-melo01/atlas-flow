<?php

use App\Http\Controllers\Controller;
use App\Http\Requests\Habit\CreateHabitRequest;
use App\Services\User\UserService;

class CreateHabitController extends Controller  {

    public function __construct(){}

    public function store(CreateHabitRequest $request){
        $request->validated();


    }
}