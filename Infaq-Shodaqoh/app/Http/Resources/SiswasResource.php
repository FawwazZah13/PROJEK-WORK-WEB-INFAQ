<?php

namespace App\Http\Resources;

use App\Models\Bayar;
use App\Models\Bulans;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\RayonResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SiswasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
{
    // Ambil semua bulan dari tabel bulans
    $semuaBulan = Bulans::all();

    // Ambil daftar bulan yang sudah dibayar oleh siswa
    $bulanDibayar = Bayar::where('siswa_id', $this->id)
        ->where('status_pay', 'paid')
        ->pluck('bulan_id')
        ->toArray();

    // Ubah bulan_id dari JSON string ke array jika diperlukan
    $bulanDibayar = collect($bulanDibayar)->map(function ($item) {
        return json_decode($item, true); // Ubah JSON string menjadi array
    })->flatten()->toArray();

    // Filter bulan yang belum dibayar
    $bulanList = $semuaBulan->reject(function ($bulan) use ($bulanDibayar) {
        return in_array($bulan->id, $bulanDibayar); // Hapus bulan yang sudah dibayar
    })->map(function ($bulan) {
        return [
            'id' => $bulan->id,
            'nama_bulan' => $bulan->nama_bulan,
        ];
    });

    return [
        'id' => $this->id,
        'name' => $this->name,
        'nis' => $this->nis,
        'nama_rombel' => $this->nama_rombel,
        'no_tlp' => $this->no_tlp,
        'nominal' => $this->nominal,
        'email' => $this->email,
        'rayon_id' => new RayonResource($this->rayons),
        'user' => new UserResource($this->user),
        'bulan' => $bulanList, // Menampilkan hanya bulan yang belum dibayar
    ];
}

}
