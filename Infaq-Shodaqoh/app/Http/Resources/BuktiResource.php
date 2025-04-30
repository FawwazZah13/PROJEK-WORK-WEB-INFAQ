<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BuktiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    
     public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'id_bayar' => $this->id_bayar,
        'penerima' => $this->penerima,
        'tanggal_bayar' => $this->tanggal_bayar,
        'paraf' => $this->paraf,
        'ttd_ortu' => $this->ttd_ortu,
        'status' => $this->status,
        'upload_pembayaran' => env('IMAGE_URL') . $this->upload_pembayaran,  // Menambahkan URL gambar di sini
    ];
}

     
}
