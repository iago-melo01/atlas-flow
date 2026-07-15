<?php

namespace App\Http\Requests;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Str;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email'=> ['required', 'email'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'É necessário fornecer um email',
            'email.email' => 'O email fornecido não é válido',
            'password.required' => 'É necessário fornecer uma senha',
            'password.string' => 'A senha deve ser uma string',
            'password.min' => 'A senha deve ter pelo menos 8 caracteres',
        ];
    }

    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();
        if(!Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))){
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => 'As credenciais fornecidas são inválidas',
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    public function ensureIsNotRateLimited() : void
    {
        // se nao passou de 5 tentativas, segue normal
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5))
            return;

        event(new Lockout($this)); // armazena um evento lockout com os dados desse request

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => "Você fez muitas tentativas de login, tente novamente em ". ceil($seconds /60) . " minutos"
        ]);
    }

    protected function normalizedEmail() : string {
        return (string) Str::transliterate(Str::trim(Str::lower($this->input('email'))));
    }

    public function throttleKey() : string{
        return $this->normalizedEmail() . '|' . $this->ip();
    }
}
