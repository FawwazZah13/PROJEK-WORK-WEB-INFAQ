<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswas extends Model
{
    use HasFactory;
    
    protected $table = 'tb_siswa';
    protected $fillable = [
        'nis',
        'name',
        'nama_rombel',
        'no_tlp',
        'nominal',
        'email',
        'rayon_id',
        'user_id'
    ];

    public function user()
{
    return $this->belongsTo(Users::class, 'user_id'); // Pastikan 'user_id' sesuai
}
public function rayons()
{
    return $this->belongsTo(Rayons::class, 'rayon_id'); // Pastikan 'rayon_id' sesuai
}
public function bulan()
{
    return $this->hasManyThrough(Bulans::class, Bayar::class, 'siswa_id', 'id', 'id', 'bulan_id');
}


}

