<?php

namespace App\Traits;

trait RolesHelper {


    public function isAdmin(): bool
    {
        return ($this->role === 'admin');
    }
}