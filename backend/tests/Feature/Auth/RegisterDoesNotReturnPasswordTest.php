<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
class NormalizedEmail extends AuthTestCase
{
    use RefreshDatabase;

    public function test_resposta_nao_retorna_senha(): void
    {
        $response = $this->postJson('/register/', [
            'name' => 'Joazinho',
            'email' => 'joaozinho@gmail.com',
            'password' => 'joaozinho123',
        ]);

        $response->assertJsonMissing(['password' => 'joaozinho123']);
    }

}