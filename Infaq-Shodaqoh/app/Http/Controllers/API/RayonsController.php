<?php

namespace App\Http\Controllers\API;

use App\Models\Bayar;
use App\Models\Rayons;
use App\Models\Siswas;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\RayonResource;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;


class RayonsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rayon = Rayons::all();

        return response()->json([
            'success' => true,
            'message' => 'Data rayon berhasil diambil',
            'data' => RayonResource::collection($rayon),
        ]);
    }

    public function getByRayon(Request $request)
    {
        // Ambil user yang sedang login
        $user = $request->user();
    
        // Pastikan user memiliki role 'PS' dan ada rayon_id
        if ($user && strcasecmp($user->role, 'PS') == 0 && $user->rayon) {
            // Cari rayon berdasarkan nama rayon yang disimpan di kolom 'rayon' milik user
            $rayon = Rayons::where('rayon', $user->rayon)->first();
    
            if (!$rayon) {
                return response()->json([
                    'success' => false,
                    'message' => 'Rayon tidak ditemukan.'
                ], 404);
            }
    
            return response()->json([
                'success' => true,
                'message' => 'Data rayon berhasil diambil',
                'data' => new RayonResource($rayon), // Menggunakan RayonResource
            ]);
        }
    
        return response()->json([
            'success' => false,
            'message' => 'Anda tidak memiliki akses ke data rayon.'
        ], 403);
    }

    // InfaqController.php
    public function jumlahInfaqRayon(Request $request)
    {
        $user = $request->user();
    
        if ($user->role === 'PS') {
            $rayonNama = $user->rayon;
    
            // Ambil semua siswa ID + nominal mereka di rayon ini
            $siswaRayon = Siswas::whereHas('rayons', function ($query) use ($rayonNama) {
                $query->where('rayon', $rayonNama);
            })->get(['id', 'nominal']);
    
            $totalInfaq = 0;
    
            foreach ($siswaRayon as $siswa) {
                // Hitung berapa kali siswa ini bayar
                $jumlahBayar = DB::table('tb_bayar')
                    ->where('siswa_id', $siswa->id)
                    ->count();
    
                // Tambahkan ke total
                $totalInfaq += $jumlahBayar * $siswa->nominal;
            }
    
            return response()->json([
                'success' => true,
                'total_infaq' => $totalInfaq
            ]);
        }
    
        return response()->json([
            'success' => false,
            'message' => 'Hanya pengguna dengan role PS yang dapat mengakses data ini.'
        ], 403);
    }
    

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'rayon' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada kesalahan',
                'data' => $validator->errors()
            ]);
        }

        $rayon = Rayons::create([
            'name' => $request->name,
            'rayon' => $request->rayon,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Sukses create Data',
            'data' => $rayon,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $rayon = Rayons::find($id);

        if (!$rayon) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'rayon' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal melakukan update data!',
                'data' => $validator->errors()
            ]);
        }

        $rayon->name = $request->input('name');
        $rayon->rayon = $request->input('rayon');

        $rayon->save();

        return response()->json([
            'status' => true,
            'message' => 'Sukses Update Data'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $rayon = Rayons::find($id);

        if (!$rayon) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }


        $rayon->delete();

        return response()->json([
            'status' => true,
            'message' => 'Sukses Hapus Data'
        ]);
    }
}