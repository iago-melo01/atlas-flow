<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(LoginRequest $request){
        
        $request->authenticate();

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Login Realizado com Sucesso',
            'user' => $request->user(),
        ]); 
    }
}
