<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void  // esse método sempre roda antes das rules
    {
        $this->merge(['email' => $this->normalizedEmail()]);
    }


    private function normalizedEmail(): string
    {
        return (string) Str::trim(Str::transliterate(Str::lower($this->input('email'))));
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email'=> ['required', 'email', 'unique:users,email'],
            'password'=> ['required', 'string', 'min:8'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'É necessário fornecer um nome',
            'email.required' => 'É necessário fornecer um email',
            'email.email' => 'O email fornecido não é válido',
            'email.unique' => 'O email fornecido já está em uso',
            'password.required' => 'É necessário fornecer uma senha',
            'password.string' => 'A senha deve ser uma string',
            'password.min' => 'A senha deve ter pelo menos 8 caracteres',
        ];
    }
}
