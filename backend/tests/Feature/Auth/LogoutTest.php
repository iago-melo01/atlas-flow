<?php

namespace Tests\Feature\Auth;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
class LogoutTest extends AuthTestCase
{
    use RefreshDatabase;

    public function test_usuario_consegue_deslogar(): void 
    {
        $user = User::factory()->create(); // model Factory, Ele gera dados falsos pra facilitar os testes

        $response = $this->actingAS($user)->postJson('/logout');

        $response->assertNoContent();
        $this->assertGuest();

    }
}