<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
class NormalizedEmail extends AuthTestCase
{
    use RefreshDatabase;

    public function test_email_normalizado(): void 
    {
         $this->postJson('/register/', [
            'name' => 'Joazinho',
            'email' => '   Joaozinho@gmail.com',
            'password' => 'joaozinho123',
        ])->assertStatus(201);

        $this->assertDatabaseHas('users', ['email' => 'joaozinho@gmail.com']);

    }
}