<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bulans extends Model
{
    use HasFactory;
    protected $table = 'tb_bulan';
    protected $fillable = [
        'nama_bulan'
    ];

    public function bayar()
    {
        return $this->hasMany(Bayar::class, 'bulan_id');
    }
    public function bukti()
    {
        return $this->hasMany(Bayar::class, 'bulan_id');
    }
}

