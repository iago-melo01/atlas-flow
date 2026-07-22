<?php
namespace Tests\Feature\Auth;

use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;

use Tests\TestCase;

abstract class AuthTestCase extends TestCase
{
    protected function setUp(): void 
    {
        parent::setUp();
        $this->withoutMiddleware(PreventRequestForgery::class);
    }
}