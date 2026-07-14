<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas são inválidas]']
            ]);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Login Realizado com Sucesso',
            'token' => $request->user(),
        ]); 
    }
}
