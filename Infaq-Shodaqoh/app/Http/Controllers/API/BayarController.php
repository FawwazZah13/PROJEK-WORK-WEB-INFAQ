<?php

namespace App\Http\Controllers\API;

use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Bayar;
use App\Models\Bukti;
use App\Models\Bulans;
use App\Models\Siswas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\BayarResource;
use Illuminate\Support\Facades\Validator;

class BayarController extends Controller
{
    public function index()
    {
        // Mengambil semua data 'Bayar' beserta relasinya
        $bayar = Bayar::with(['siswas', 'bulans','bukti'])->get();
    
        // Mengembalikan response JSON dengan resource collection
        return response()->json([
            'success' => true,
            'message' => 'Data bayar berhasil diambil',
            'data' => BayarResource::collection($bayar),
        ]);
    }
    // {
    //     // Pastikan bulan_id bisa berupa array atau string (dipisahkan koma)
    //     $request->merge([
    //         'bulan_id' => is_array($request->bulan_id) ? $request->bulan_id : explode(',', $request->bulan_id)
    //     ]);
    
    //     // Validasi input
    //     $validator = Validator::make($request->all(), [
    //         'siswa_id' => 'required|exists:tb_siswa,id',
    //         'bulan_id' => 'required|array',
    //         'bulan_id.*' => 'integer|exists:tb_bulan,id', // Validasi setiap bulan_id
    //         'kategori' => 'required|string',
    //         'metode' => 'required|string',
    //     ]);
    
    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Ada kesalahan validasi',
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }
    
    //     // Ambil data siswa
    //     $siswa = Siswas::find($request->siswa_id);
    //     if (!$siswa) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Siswa tidak ditemukan',
    //         ], 404);
    //     }
    
    //     // Pastikan nominal valid
    //     if (!$siswa->nominal || !is_numeric($siswa->nominal)) {
    //         return response()->json(['success' => false, 'message' => 'Nominal pembayaran tidak valid.'], 400);
    //     }
    
    //     // Konfigurasi Midtrans
    //     \Midtrans\Config::$serverKey = config('midtrans.server_key');
    //     \Midtrans\Config::$isProduction = config('midtrans.is_production');
    //     \Midtrans\Config::$isSanitized = config('midtrans.is_sanitized');
        
    
    //     // Generate order_id unik
    //     $order_id = 'IS-' . uniqid();
    
    //     // Buat data transaksi Midtrans
    //     $params = [
    //         'transaction_details' => [
    //             'order_id' => $order_id,
    //             'gross_amount' => $siswa->nominal,
    //         ],
    //         'customer_details' => [
    //             'first_name' => $siswa->name,
    //             'email' => $request->user()->email ?? 'anonymous@domain.com',
    //         ],
    //         'item_details' => [
    //             [
    //                 'id' => $order_id,
    //                 'quantity' => 1,
    //                 'price' => $siswa->nominal,
    //                 'name' => 'Pembayaran Infaq Shodaqoh',
    //             ]
    //             ],
    //             'redirect_url' => url()->current() 
    //     ];
    
    //     try {
    //         // Buat transaksi Midtrans
    //         $midtrans_response = \Midtrans\Snap::createTransaction($params);
            
    //         // Simpan transaksi bayar di database
    //         $bayar = Bayar::create([
    //             'siswa_id' => $request->siswa_id,
    //             'bulan_id' => json_encode($request->bulan_id),
    //             'kategori' => $request->kategori,
    //             'metode' => $request->metode,
    //             'tanggal_bayar' => now(),
    //             'order_id' => $order_id,
    //             'status_pay' => 'pending',
    //             'redirect_url' => $midtrans_response->redirect_url,
    //             'snap_token' => $midtrans_response->token // Tambahkan ini
    //         ]);
        
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Silakan lanjutkan pembayaran.',
    //             'data' => $bayar,
    //             'snap_token' => $midtrans_response->token // Kirim snap_token ke frontend
    //         ], 201);
        
    
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Gagal membuat transaksi: ' . $e->getMessage(),
    //         ], 500);
    //     }
    // }
    
    public function create(Request $request)
{
    $request->merge([
        'bulan_id' => is_array($request->bulan_id) ? $request->bulan_id : explode(',', $request->bulan_id)
    ]);

    $validator = Validator::make($request->all(), [
        'siswa_id' => 'required|exists:tb_siswa,id',
        'bulan_id' => 'required|array',
        'bulan_id.*' => 'integer|exists:tb_bulan,id',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Ada kesalahan validasi',
            'errors' => $validator->errors()
        ], 422);
    }

    $siswa = Siswas::find($request->siswa_id);

    if (!$siswa || !$siswa->nominal || !is_numeric($siswa->nominal)) {
        return response()->json(['success' => false, 'message' => 'Data siswa tidak valid atau nominal tidak tersedia.'], 400);
    }

    \Midtrans\Config::$serverKey = config('midtrans.server_key');
    \Midtrans\Config::$isProduction = config('midtrans.is_production');
    \Midtrans\Config::$isSanitized = config('midtrans.is_sanitized');

    $order_id = 'IS-' . uniqid();

    $params = [
        'transaction_details' => [
            'order_id' => $order_id,
            'gross_amount' => $siswa->nominal,
        ],
        'customer_details' => [
            'first_name' => $siswa->name,
            'email' => $request->user()->email ?? 'anonymous@domain.com',
        ],
        'item_details' => [
            [
                'id' => $order_id,
                'quantity' => 1,
                'price' => $siswa->nominal,
                'name' => 'Pembayaran Infaq Shodaqoh',
            ]
        ],
        'redirect_url' => url()->current(),
    ];

    try {
        $midtrans_response = \Midtrans\Snap::createTransaction($params);

        $bayar = Bayar::create([
            'siswa_id' => $request->siswa_id,
            'bulan_id' => json_encode($request->bulan_id),
            'tanggal_bayar' => now(),
            'order_id' => $order_id,
            'status_pay' => 'pending',
            'redirect_url' => $midtrans_response->redirect_url,
            'snap_token' => $midtrans_response->token
        ]);

        // Simpan bukti dengan status "x"
        foreach ($request->bulan_id as $bulan) {
            Bukti::create([
                'id_bayar' => $bayar->id,
                'bulan_id' => $bulan,
                'tanggal_bayar' => now(),
                'paraf' => 'x',
                'ttd_ortu' => 'x',
                'status' => 'x',
                'upload_pembayaran' => null,
                'penerima' => 'Wikrama'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Silakan lanjutkan pembayaran.',
            'data' => $bayar,
            'snap_token' => $midtrans_response->token
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal membuat transaksi: ' . $e->getMessage(),
        ], 500);
    }
}
    public function destroy(Request $request, string $id)
    {
        $bayar = Bayar::find($id);

        if (!$bayar) {
            return response()->json([
                'bukti_id' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }


        $bayar->delete();

        return response()->json([
            'bukti_id' => true,
            'message' => 'Sukses Hapus Data'
        ]);
    }
    public function handleCallback(Request $request)
{
    Log::info('Midtrans callback received', $request->all());

    $orderId = $request->order_id;
    $statusCode = $request->status_code;
    $grossAmount = $request->gross_amount;

    $signature = hash('sha512', $orderId . $statusCode . $grossAmount . config('midtrans.server_key'));

    if ($signature !== $request->signature_key) {
        return response()->json([
            'success' => false,
            'message' => 'Invalid signature'
        ], 400);
    }

    $transaction = Bayar::where('order_id', $orderId)->first();

    if ($transaction) {
        $status = $request->transaction_status;
        Log::info('Transaction status: ' . $status); // Tambahkan log status
        if ($status === 'settlement') {
            $transaction->update(['status_pay' => 'paid']);
        } elseif ($status === 'cancel' || $status === 'deny') {
            $transaction->update(['status_pay' => 'canceled']);
        } elseif ($status === 'expire') {
            $transaction->update(['status_pay' => 'expired']);
        } else {
            $transaction->update(['status_pay' => 'pending']);
        }

        return response()->json([
            'success' => true,
            'message' => 'Callback processed successfully.'
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'Transaction not found.'
        ], 404);
    }
}

public function getBulanBySiswa($id)
{
    // Ambil semua entri di tb_bayar yang memiliki siswa_id sesuai ID
    $bayar = Bayar::where('siswa_id', $id)
        ->where('kategori', '!=', 'zakat mal') // Tambahkan filter kategori di tb_bayar
        ->get();

    if ($bayar->isNotEmpty()) {
        // Ambil semua bulan_id yang sudah dibayar kecuali kategori 'zakat mal'
        $excludedBulanIds = $bayar->pluck('bulan_id')->toArray();

        // Ambil seluruh nama bulan kecuali yang sudah dibayar
        $bulan = Bulans::whereNotIn('id', $excludedBulanIds)->get();
    } else {
        // Jika siswa_id tidak ditemukan di tb_bayar, tampilkan seluruh bulan
        $bulan = Bulans::all();
    }

    // Hitung jumlah bulan yang sudah dibayar
    $done = count($excludedBulanIds ?? []);

    return response()->json([
        'status' => 'success',
        'count' => $done,
        'data' => $bulan,
    ], 200);
}

public function getDataBayar()
{
    try {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak terautentikasi',
            ], 401);
        }

        if ($user->role === 'Siswa') {
            // Cari siswa berdasarkan user id
            $siswa = \App\Models\Siswas::where('user_id', $user->id)->first();

            if (!$siswa) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data siswa tidak ditemukan',
                ], 404);
            }

            // Ambil semua data pembayaran berdasarkan siswa_id
            $data = Bayar::with(['siswas.rayons', 'bulans'])
                ->where('siswa_id', $siswa->id)
                ->get();
        } else {
            // Untuk admin/ps, ambil semua data
            $data = Bayar::with(['siswas.rayons', 'bulans'])->get();
        }

        return response()->json([
            'success' => true,
            'message' => 'Data berhasil diambil',
            'data' => $data,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan saat mengambil data: ' . $e->getMessage(),
        ], 500);
    }
}


    public function getBulanBelumDibayar($nis)
    {
        // Ambil data siswa berdasarkan NIS
        $siswa = Siswas::where('nis', $nis)->first();
    
        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'Siswa tidak ditemukan',
            ], 404);
        }
    
        // Ambil semua bulan yang sudah dibayar oleh siswa ini
        $bulanTerbayar = Bayar::where('siswa_id', $siswa->id)
            ->where('status_pay', 'paid')
            ->pluck('bulan_id')
            ->toArray();
    
        // Pastikan bulan_id dalam bentuk array (karena bisa berupa JSON string)
        $bulanTerbayar = collect($bulanTerbayar)->map(function ($item) {
            return json_decode($item, true); // Ubah JSON string menjadi array
        })->flatten()->toArray();
    
        // Ambil semua bulan yang belum dibayar
        $bulanBelumDibayar = Bulans::whereNotIn('id', $bulanTerbayar)->get();
    
        return response()->json([
            'success' => true,
            'message' => 'Data bulan yang belum dibayar berhasil diambil',
            'data' => $bulanBelumDibayar,
        ], 200);
    }
    

    

}
