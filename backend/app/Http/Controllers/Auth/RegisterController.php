<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Services\User\UserService;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function __construct(
        protected UserService $userService
        ){}


    public function store(RegisterRequest $request){

        $validated = $request->validated();

        $user = $this->userService->store($validated);

        Auth::login($user);

        $request->session()->regenerate();
        
        return response()->json([
        'message' => 'Usuário criado com sucesso',
        'user' => $user,
            ], 201);
    }

}
