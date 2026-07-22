<?php

namespace App\Services\User;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserService{
    public function store(array $data): User {
        return DB::transaction(function () use ($data){
            return User::create($data);
        });
    }
}