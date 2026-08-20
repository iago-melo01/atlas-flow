<?php

use App\Http\Controllers\Controller;
use App\Services\User\UserService;

class CreateHabitController extends Controller  {

    public function __construct(protected UserService $userService){}

    public function store(){

    }
}