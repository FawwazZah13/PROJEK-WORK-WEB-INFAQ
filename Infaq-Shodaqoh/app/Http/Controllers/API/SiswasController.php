<?php

namespace App\Http\Controllers\API;

use App\Models\Users;
use App\Models\Rayons;
use App\Models\Siswas;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use App\Http\Resources\SiswasResource;
use Illuminate\Support\Facades\Validator;

class SiswasController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    //  public function indexPs(Request $request)
    //  {
    //      // Ambil token dari request
    //      $token = $request->bearerToken();
 
    //      // Cek apakah token ada
    //      if (!$token) {
    //          return response()->json(['message' => 'Token not provided'], 401);
    //      }
 
    //      // Ambil user_id dari cache berdasarkan token
    //      $user_id = Cache::get('user_token_' . $token);
 
    //      // Jika user_id tidak ditemukan, token tidak valid
    //      if (!$user_id) {
    //          return response()->json(['message' => 'Invalid token'], 401);
    //      }
 
    //      // Cari user berdasarkan user_id yang disimpan di cache
    //      $user = Users::find($user_id);
 
    //      // Jika user tidak ditemukan
    //      if (!$user) {
    //          return response()->json(['message' => 'User not found'], 404);
    //      }
 
    //      // Cek apakah role user adalah 'PS'
    //      if ($user->role === 'PS') {
    //          // Ambil rayon dari cache berdasarkan user ID
    //          $rayon = Cache::get('user_rayon_' . $user->id);
 
    //          if ($rayon) {
    //              // Ambil data siswa berdasarkan rayon
    //              $siswa = Siswas::with('rayons') // Pastikan relasi 'rayon' terdefinisi di model Siswas
    //                  ->whereHas('rayons', function ($query) use ($rayon) {
    //                      $query->where('rayon', $rayon);
    //                  })
    //                  ->get();
    //              return response()->json($siswa);
    //          }
 
    //          return response()->json(['message' => 'Rayon not found'], 404);
    //      }
 
    //      // Jika role bukan 'PS'
    //      return response()->json(['message' => 'Access denied'], 403);
    //  }

    public function indexPs(Request $request)
{
    $token = $request->bearerToken();

    if (!$token) {
        return response()->json(['message' => 'Token not provided'], 401);
    }

    $user_id = Cache::get('user_token_' . $token);

    if (!$user_id) {
        return response()->json(['message' => 'Invalid token'], 401);
    }

    $user = Users::find($user_id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    if ($user->role === 'PS') {
        $rayonName = Cache::get('user_rayon_' . $user->id); // Ini misalnya "Ciawi 5"
        if ($rayonName) {
            // Cari ID dari nama rayon
            $rayon = Rayons::where('rayon', $rayonName)->first();


            if (!$rayon) {
                return response()->json(['message' => 'Rayon not found in database'], 404);
            }

            // Ambil siswa berdasarkan rayon_id
            $siswa = Siswas::where('rayon_id', $rayon->id)->get();

            return response()->json($siswa);
        }

        return response()->json(['message' => 'Rayon not found in cache'], 404);
    }

    return response()->json(['message' => 'Access denied'], 403);
}
    

    public function index(Request $request)
    {
        // Ambil user yang sedang login
        $user = $request->user();

        // Periksa apakah user terautentikasi
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak terautentikasi.'
            ], 401);
        }

        // Cek apakah role user adalah 'Siswa'
        if ($user->role === 'Siswa') {
            $siswa = Siswas::where('user_id', $user->id)->first();

            if (!$siswa) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data siswa tidak ditemukan.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Data siswa berhasil diambil.',
                'data' => new SiswasResource($siswa),
                'siswa_id' => $siswa ? $siswa->id : null
            ]);
        }

        // Cek apakah role user adalah 'Admin'
        if ($user->role === 'Admin') {
            // Ambil semua data siswa untuk admin
            $siswas = Siswas::all();

            return response()->json([
                'success' => true,
                'message' => 'Data siswa berhasil diambil.',
                'data' => SiswasResource::collection($siswas),
            ]);
        }

        // Cek apakah role user adalah 'PS'
        if ($user->role === 'PS') {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak. Role PS tidak memiliki izin untuk melihat data siswa.'
            ], 403);
        }

        // Jika tidak ada role yang sesuai
        return response()->json([
            'success' => false,
            'message' => 'Role tidak dikenali.'
        ], 403);
    }



    public function create(Request $request)
    {
        // Ambil NIS dari session, token, atau parameter request (misal dari session login)
        $nis = $request->user()->nis; // Asumsi NIS sudah ada di session user yang login

        // Validasi input dari form
        $validator = Validator::make($request->all(), [
            'no_tlp' => 'required',
            'nominal' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada kesalahan',
                'data' => $validator->errors()
            ]);
        }

        // Cari data siswa berdasarkan NIS
        $siswas = Siswas::where('nis', $nis)->first();

        if (!$siswas) {
            return response()->json([
                'success' => false,
                'message' => 'Data siswa tidak ditemukan.'
            ]);
        }

        // Update data no_tlp dan nominal
        $siswas->update([
            'no_tlp' => $request->no_tlp,
            'nominal' => $request->nominal,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data siswa berhasil diperbarui.',
            'data' => $siswas
        ]);
    }

    public function show($id)
{
    $siswa = Siswas::with('user', 'rayons')->find($id);

    if (!$siswa) {
        return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
    }

    return response()->json([
        'success' => true,
        'message' => 'Data siswa berhasil diambil.',
        'data' => new SiswasResource($siswa),
        'siswa_id' => $siswa ? $siswa->id : null
    ]);
}

    

    public function update($id, Request $request)
{
    Log::info('Updating siswa with ID: ' . $id);  // Menambahkan log untuk debugging
    $siswa = Siswas::find($id);
    
    if (!$siswa) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }

    $siswa->no_tlp = $request->no_tlp;
    $siswa->nominal = $request->nominal;
    $siswa->save();

    return response()->json($siswa, 200);
}

    public function destroy(Request $request, string $id)
    {
        $siswas = Siswas::find($id);

        if (!$siswas) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }


        $siswas->delete();

        return response()->json([
            'status' => true,
            'message' => 'Sukses Hapus Data'
        ]);
    }

    public function search(Request $request)
    {
        // Ambil query pencarian dari parameter
        $query = $request->input('key');

        // Lakukan pencarian di database
        $siswas = Siswas::where('name', 'like', '%' . $query . '%')
            ->orWhere('nis', 'like', '%' . $query . '%')
            ->get();

        // Kembalikan hasil pencarian dalam bentuk JSON
        return response()->json([
            'success' => true,
            'message' => 'Data siswa berhasil diambil.',
            'data' => SiswasResource::collection($siswas),
        ]);
    }
    
    public function searchPs(Request $request)
    {
        // Ambil query pencarian dari parameter
        $query = $request->input('key');
        
        // Ambil data user yang sedang login
        $user = auth()->user(); 
        
        // Pastikan user memiliki data rayon
        if (!$user || !$user->rayon) {
            return response()->json([
                'success' => false,
                'message' => 'Rayon tidak ditemukan untuk user.'
            ], 400);
        }
    
        // Ambil nama rayon dari data user
        $rayonName = $user->rayon;
    
        // Cari rayon_id berdasarkan nama rayon yang dimiliki oleh user
        $rayon = Rayons::where('rayon', $rayonName)->first();
    
        if (!$rayon) {
            return response()->json([
                'success' => false,
                'message' => 'Rayon tidak valid.'
            ], 400);
        }
    
        // Lakukan pencarian di database siswa berdasarkan rayon_id yang sesuai
        $siswas = Siswas::where('rayon_id', $rayon->id) // Filter berdasarkan rayon_id yang sesuai
            ->where(function($queryBuilder) use ($query) {
                // Cari berdasarkan nama atau NIS
                $queryBuilder->where('name', 'like', '%' . $query . '%')
                             ->orWhere('nis', 'like', '%' . $query . '%');
            })
            ->get();
    
        // Kembalikan hasil pencarian dalam bentuk JSON
        return response()->json([
            'success' => true,
            'message' => 'Data siswa berhasil diambil.',
            'data' => SiswasResource::collection($siswas),
        ]);
    }
    

    public function getStudentsByRayon(Request $request, $rayon)
    {
        // Ambil token dari header Authorization
        $token = $request->bearerToken();

        // Cek apakah token ada
        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Token tidak disediakan.'
            ], 401);
        }

        // Verifikasi token dan ambil user
        $user = $request->user(); // Akan mengembalikan user jika token valid

        // Periksa apakah user terautentikasi
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak terautentikasi.'
            ], 401);
        }

        // Ambil data siswa berdasarkan rayon yang dipilih
        $siswas = Siswas::where('rayon', $rayon)->get();

        if ($siswas->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada data siswa untuk rayon ini.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data siswa berhasil diambil.',
            'data' => SiswasResource::collection($siswas),
        ]);
    }


}
