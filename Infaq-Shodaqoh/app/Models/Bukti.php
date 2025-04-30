<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bukti extends Model
{
    use HasFactory;

    protected $table = 'tb_bukti';
    protected $fillable = [
        'tanggal_bayar',
        'penerima',
        'paraf',
        'ttd_ortu',
        'status',
        'bulan_id',
        'id_bayar',
        'upload_pembayaran',
    ];

    public function bulan()
    {
        return $this->belongsTo(Bulans::class, 'bulan_id');
    }

    public function bayar()
    {
        return $this->hasMany(Bayar::class, 'bukti_id');
    }
}
