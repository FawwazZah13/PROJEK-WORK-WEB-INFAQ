<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bayar extends Model
{
    use HasFactory;

    protected $table = 'tb_bayar';
    protected $fillable = [
        'siswa_id',
        'bulan_id',
        'bukti_id',
        'order_id',
        'status_pay',
        'kategori',
        'metode',
        'tanggal_bayar',
        'redirect_url',
    ];

    public function siswas()
    {
        return $this->belongsTo(Siswas::class, 'siswa_id');
    }
   
    // public function bulans()
    // {
    //     return $this->belongsTo(Bulans::class, 'bulan_id');
    // }

    public function bulans()
    {
        return $this->hasMany(Bulans::class, 'id', 'bulan_id');
    }

    public function rayons()
{
    return $this->belongsTo(Rayons::class, 'rayon_id', 'id'); // Pastikan 'rayon_id' sesuai
}
    


    public function bukti()
    {
        return $this->belongsTo(Bukti::class, 'bukti_id');
    }
    // public function kategori()
    // {
    //     return $this->belongsTo(Kategori::class, 'kategori_id');
    // }
    // public function metode()
    // {
    //     return $this->belongsTo(Metode::class, 'metode_id');
    // }

}
