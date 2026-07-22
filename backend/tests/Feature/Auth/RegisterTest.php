<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegisterTest extends AuthTestCase
{
    use RefreshDatabase;

    public function test_cadastro_valido_cria_e_autentica_usuario(): void {
        
        $response = $this->postJson('/register/', [
            'name' => 'Joazinho',
            'email' => 'joaozinho@gmail.com',
            'password' => 'joaozinho123',
        ]);

        $response->assertStatus(201)->assertJsonPath('user.email', 'joaozinho@gmail.com');

        $this->assertDatabaseHas('users', [
            'email' => 'joaozinho@gmail.com'
        ]);

        $this->assertAuthenticated();
    }
}