<?php

namespace App\Http\Controllers\API;

use App\Models\Bukti;
use App\Models\Siswas;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\BuktiResource;
use Illuminate\Support\Facades\Validator;

class BuktiController extends Controller
{
    public function index()
    {
        $bukti = Bukti::all();

        return response()->json([
            'success' => true,
            'message' => 'Data bukti berhasil diambil',
            'data' => BuktiResource::collection($bukti),
        ]);
    }

    public function uploadPembayaran(Request $request, $id_bayar)
    {
        // Validasi file upload
        $validated = $request->validate([
            'upload_pembayaran' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048'
        ]);
    
        // Simpan file
        $path = $request->file('upload_pembayaran')->store('pembayaran', 'public');
    
        // Cari data bukti berdasarkan id_bayar
        // $bukti = Bukti::findOrFail($id_bayar);
        $bukti = Bukti::where('id_bayar', $id_bayar)->firstOrFail();

    
        // Update field upload dan status lainnya
        $bukti->update([
            'upload_pembayaran' => $path,
            'paraf' => '✅',
            'ttd_ortu' => '✅',
            'status' => '✅'
        ]);
    
        return response()->json([
            'message' => 'Upload bukti pembayaran berhasil.',
            'data' => $bukti
        ]);
    }
    

    // public function create(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'penerima' => 'required',
    //         // 'tanggal_bayar' => 'required',
    //         'paraf' => 'required',
    //         'ttd_ortu' => 'required',
    //         'status' => 'required',
    //         // 'bulan_id' => 'required',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Ada kesalahan',
    //             'data' => $validator->errors()
    //         ]);
    //     }

    //     $bukti = Bukti::create([
    //         'penerima' => $request->penerima,
    //         // 'tanggal_bayar' => $request->tanggal_bayar,
    //         'paraf' => $request->paraf,
    //         'ttd_ortu' => $request->ttd_ortu,
    //         'status' => $request->status,
    //         // 'bulan_id' => $request->bulan_id,
    //     ]);

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Sukses create Data',
    //         'data' => $bukti,
    //     ]);
    // }

    

    // public function update(Request $request, string $id)
    // {
    //     $bukti = Bukti::find($id);

    //     if (!$bukti) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Data tidak ditemukan'
    //         ], 404);
    //     }

    //     $validator = Validator::make($request->all(), [
    //         'penerima' => 'required',
    //         // 'tanggal_bayar' => 'required',
    //         'paraf' => 'required',
    //         'ttd_ortu' => 'required',
    //         'status' => 'required',
    //         // 'bulan_id' => 'required',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Gagal melakukan update data!',
    //             'data' => $validator->errors()
    //         ]);
    //     }

    //     $bukti->penerima = $request->input('penerima');
    //     // $bukti->tanggal_bayar = $request->input('tanggal_bayar');
    //     $bukti->paraf = $request->input('paraf');
    //     $bukti->ttd_ortu = $request->input('ttd_ortu');
    //     $bukti->status = $request->input('status');
    //     // $bukti->bulan_id = $request->input('bulan_id');

    //     $bukti->save();

    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Sukses Update Data'
    //     ]);
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $bukti = Bukti::find($id);

        if (!$bukti) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }


        $bukti->delete();

        return response()->json([
            'status' => true,
            'message' => 'Sukses Hapus Data'
        ]);
    }
}
