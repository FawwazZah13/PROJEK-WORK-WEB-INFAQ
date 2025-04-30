<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Users extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'tb_users';
    protected $fillable = [
        'email',
        'password',
        'role',
    ];

    public function rayons()
{
    return $this->belongsTo(Rayons::class, 'rayon_id');
}


    public function siswas()
    {
        return $this->hasOne(Siswas::class, 'user_id'); // Pastikan 'user_id' sesuai
    }
    
}


