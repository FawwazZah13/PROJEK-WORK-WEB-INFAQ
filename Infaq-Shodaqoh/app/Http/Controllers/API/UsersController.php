<?php
namespace App\Http\Controllers\API;

use App\Models\Bayar;
use App\Models\Users;
use App\Models\Siswas;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{

    public function index(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'User tidak terautentikasi.'
        ], 401);
    }

    // Gunakan strcasecmp agar tidak case-sensitive
    if (strcasecmp($user->role, 'Siswa') === 0) {
        $siswa = Siswas::where('user_id', $user->id)->first();

        $siswaId = null;
        if ($siswa) {
            $siswaId = Bayar::where('siswa_id', $siswa->id)->value('siswa_id');
        }

        return response()->json([
            'success' => true,
            'message' => 'Data siswa berhasil diambil',
            'data' => new UserResource($user),
            'siswa_id' => $siswaId,
        ]);
    }

    if (strcasecmp($user->role, 'Admin') === 0) {
        $users = Users::all();
        return response()->json([
            'success' => true,
            'message' => 'Data users berhasil diambil',
            'data' => UserResource::collection($users),
        ]);
    }

    if (strcasecmp($user->role, 'PS') === 0) {
        // Ambil semua siswa berdasarkan rayon milik user PS
        $siswaByRayon = Users::where('rayon', $user->rayon)->get();

        return response()->json([
            'success' => true,
            'message' => 'Data siswa berdasarkan rayon berhasil diambil',
            'data' => $siswaByRayon,
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Peran pengguna tidak dikenali.'
    ], 403);
}

//     public function index(Request $request)
// {
//     $user = $request->user();

//     if (!$user) {
//         return response()->json([
//             'success' => false,
//             'message' => 'User tidak terautentikasi.'
//         ], 401);
//     }

//     if (strcasecmp($user->role, 'Siswa') == 0) {
//         $siswa = Siswas::where('user_id', $user->id)->first();

//         $siswaId = null;
//         if ($siswa) {
//             $siswaId = Bayar::where('siswa_id', $siswa->id)->value('siswa_id');
//         }

//         return response()->json([
//             'success' => true,
//             'message' => 'Data siswa berhasil diambil',
//             'data' => new UserResource($user),
//             'siswa_id' => $siswaId,
//         ]);
//     }

//     if (strcasecmp($user->role, 'Admin') == 0) {
//         $users = Users::all();
//         return response()->json([
//             'success' => true,
//             'message' => 'Data users berhasil diambil',
//             'data' => UserResource::collection($users),
//         ]);
//     }

//     if (strcasecmp($user->role, 'PS') == 0) {
//         $users = Users::where('', $user->rayon)->get();

//         return response()->json([
//             'success' => true,
//             'message' => 'Data siswa untuk PS berhasil diambil'
//         ]);
//     }}
    
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
            'role' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Ada kesalahan',
                'data' => $validator->errors()
            ], 422);
        }

        $admin = Users::create([
            'email' => $request->email,
            'password' => Hash::make($request->password), // Menggunakan Hash::make() untuk mengenkripsi password
            'role' => $request->role,
        ]);

        return response()->json([
            'data' => $admin,
            'success' => true,
            'message' => 'Sukses create Data user',
        ]);
    }

    public function update(Request $request, string $id)
    {
        $user = Users::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
            'role' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal melakukan update data!',
                'data' => $validator->errors()
            ]);
        }

        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->role = $request->input('role');

        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Sukses Update Data'
        ]);
    }

    // {
    //     $credentials = $request->only('email', 'password');

    //     // Cek validitas login
    //     $user = Users::where('email', $credentials['email'])->first();

    //     if (!$user || $user->password !== $credentials['password']) {
    //         return response()->json(['message' => 'Invalid credentials'], 401);
    //     }

    //     // Generate token dan simpan ke cache
    //     $token = bin2hex(random_bytes(32)); // Token acak untuk pengguna
    //     Cache::put('user_token_' . $token, $user->id, 3600); // Simpan user_id berdasarkan token

    //     // Jika role adalah Admin, simpan data semua siswa ke session
    //     if ($user->role === 'Admin') {
    //         // Ambil semua data siswa
    //         $allSiswa = Siswas::all();
    //         Session::put('all_siswa', $allSiswa);
    //     }

    //     // Jika role adalah PS, simpan rayon
    //     if ($user->role === 'PS') {
    //         Cache::put('user_rayon_' . $user->id, $user->rayon, 3600);
    //     }

    //     return response()->json(['token' => $token]);
    // }

    // public function login(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);
    
    //     // Cari user berdasarkan email
    //     $user = Users::with('siswa')->where('email', $request->input('email'))->first();
    
    //     // Periksa apakah user ditemukan dan password cocok
    //     if (!$user || $user->password !== $request->input('password')) {
    //         return response()->json(['message' => 'Invalid credentials'], 401);
    //     }
    
    //     // Buat token baru menggunakan Laravel Sanctum
    //     $token = $user->createToken('API Token')->plainTextToken;
    
    //     // Menyimpan token dalam cache
    //     Cache::put('user_token_' . $token, $user->id, now()->addHours(2));
    
    //     // Simpan data siswa dalam session untuk Admin
    //     if ($user->role === 'Admin') {
    //         $allSiswa = Siswas::all();
    //         // Simpan dalam session
    //         session(['all_siswa' => $allSiswa]);  // Menggunakan helper session untuk menyimpan data
    //         \Log::info('Session all_siswa:', ['siswa' => $allSiswa->toArray()]);  // Debugging dengan mengonversi koleksi menjadi array
    //     }
    
    //     // Simpan data rayon untuk PS di cache
    //     if ($user->role === 'PS') {
    //         Cache::put('user_rayon_' . $user->id, $user->rayon, now()->addHours(2));
    //     }
    
    //     // Kembalikan token dan informasi user
    //     return response()->json([
    //         'message' => 'Login successful',
    //         'token' => $token, // Kembalikan token sebagai Bearer token
    //         'data' => new UserResource($user),
    //     ]);
    // }
    
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        // Cari user berdasarkan email
        $user = Users::with('siswa')->where('email', $request->input('email'))->first();
    
        // Periksa apakah user ditemukan dan password cocok
        if (!$user || $user->password !== $request->input('password')) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    
        // Buat token baru menggunakan Laravel Sanctum
        $token = $user->createToken('API Token')->plainTextToken;
    
            Cache::put('user_token_' . $token, $user->id, now()->addHours(2));
    
        if ($user->role === 'PS') {
            Cache::put('user_rayon_' . $user->id, $user->rayon, now()->addHours(2));
        }
    
        // Kembalikan token dan informasi user
        return response()->json([
            'message' => 'Login successful',
            'token' => $token, // Kembalikan token sebagai Bearer token
            'data' => new UserResource($user),
        ]);
    }
    
public function logout(Request $request)
{
    $user = $request->user();
    $tokenId = $request->user()->currentAccessToken()->id;

    $user->tokens()->where('id', $tokenId)->delete();

    return response()->json([
        'success' => true,
        'message' => 'Logout berhasil',
    ]);
}

}
