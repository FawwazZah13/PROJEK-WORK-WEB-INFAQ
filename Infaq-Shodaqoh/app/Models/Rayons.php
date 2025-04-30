<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rayons extends Model
{
    use HasFactory;

    protected $table = 'tb_rayon'; // Pastikan nama tabel sesuai
    protected $fillable = [
        'name', // Pastikan ini adalah kolom yang ada di tabel
        'rayon' // Kolom lainnya jika ada
    ];

    public function siswas()
    {
        return $this->hasMany(Siswas::class, 'rayon_id'); // Pastikan kolom yang sesuai
    }

    public function bayar()
{
    return $this->hasMany(Bayar::class, 'rayon_id'); // Pastikan 'rayon_id' sesuai
}
}

