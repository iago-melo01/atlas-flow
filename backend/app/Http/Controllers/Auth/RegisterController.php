<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\User\UserService;
use Illuminate\Support\Facades\DB;
class RegisterController extends Controller
{
    public function __construct(
        protected UserService $userService
        ){}


    public function store(RegisterRequest $request){

        $validated = $request->validated();

        $user = $this->userService->store($validated);
        
        return response()->json(array_merge(['message' => 'Usuário criado com sucesso'], $validated), 201);
    }

}
