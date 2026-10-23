<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public const TESTER_EMAIL = 'atlas@example.com';

    public const OTHER_EMAIL = 'maria@example.com';

    public const ADMIN_EMAIL = 'admin@example.com';

    public const PASSWORD = 'password';

    /**
     * Contas locais com senha conhecida para login no SPA.
     * role é NOT NULL na migration; o registro ainda não preenche isso.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => self::TESTER_EMAIL],
            [
                'name' => 'Atlas Tester',
                'role' => 'user',
                'password' => self::PASSWORD,
                'email_verified_at' => now(),
            ],
        );

        User::query()->updateOrCreate(
            ['email' => self::OTHER_EMAIL],
            [
                'name' => 'Maria Isolamento',
                'role' => 'user',
                'password' => self::PASSWORD,
                'email_verified_at' => now(),
            ],
        );

        User::query()->updateOrCreate(
            ['email' => self::ADMIN_EMAIL],
            [
                'name' => 'Atlas Admin',
                'role' => 'admin',
                'password' => self::PASSWORD,
                'email_verified_at' => now(),
            ],
        );
    }
}
