<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BayarResource extends JsonResource
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
            'siswa_id' => new SiswasResource($this->whenLoaded('siswas')),
            // 'bulan_id' => new BulansResource($this->whenLoaded('bulans')),
            'bulan_id' => $this->bulan_id,
            'kategori' => $this->kategori,
            'metode' => $this->metode,
            'status_pay' => $this->status_pay,
            'tanggal_bayar' => $this->tanggal_bayar,
            'bukti' => new BuktiResource($this->whenLoaded('bukti')),
        ];
}
}
