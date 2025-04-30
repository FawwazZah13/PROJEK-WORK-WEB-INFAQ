<?php

namespace App\Http\Controllers\API;

use App\Models\Bayar;
use App\Models\Rayons;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
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
    // Ambil user yang sedang login
    $user = $request->user();

    // Periksa apakah user memiliki role PS
    if ($user->role === 'PS') {
        // Ambil data siswa terkait user
        $siswa = $user->siswa;

        // Cek apakah siswa ditemukan
        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'Data siswa tidak ditemukan.'
            ], 403);
        }

        // Ambil rayon terkait siswa
        $rayon = $siswa->rayon;

        // Cek apakah rayon ditemukan
        if (!$rayon) {
            return response()->json([
                'success' => false,
                'message' => 'Data rayon tidak ditemukan.'
            ], 403);
        }

        // Hitung total nominal untuk rayon tersebut dari tabel 'bayar'
        $totalNominal = Bayar::whereHas('siswa', function($query) use ($rayon) {
            $query->where('rayon', $rayon);
        })->sum('nominal');

        return response()->json([
            'success' => true,
            'total_nominal' => $totalNominal
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