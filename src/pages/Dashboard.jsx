// src/pages/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-base-100 text-neutral font-sans p-6 lg:p-12 flex flex-col gap-12">
      
      {/* ================= HERO SECTION: SEKILAS TENTANG DOMPET ANDA ================= */}
      <div className="w-full bg-neutral text-neutral-content p-8 lg:p-12 rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-4 max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">Sekilas tentang Dompet Anda</h1>
          <p className="text-gray-400 text-lg">Kelola dan pantau seluruh arus keuanganmu secara realtime dengan asisten pintar kami.</p>
        </div>
        {/* Placeholder Gambar Utama menggunakan DaisyUI Skeleton */}
        <div className="w-full lg:w-[400px] h-[220px] skeleton bg-neutral-focus rounded-xl"></div>
      </div>

      {/* ================= REKAP BULANAN ================= */}
      <div className="w-full flex flex-col gap-6 items-center">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-black">Rekap Bulanan</h2>
          <p className="text-gray-500">Analisis perbandingan persentase antara alokasi dana dan realisasi pengeluaran Anda.</p>
        </div>
        
        {/* Box Konten Rekap */}
        <div className="w-full max-w-4xl border border-gray-100 shadow-sm p-8 rounded-2xl flex flex-col md:flex-row items-center justify-around gap-8 bg-white">
          {/* Placeholder Pie Chart menggunakan Radial Progress DaisyUI */}
          <div className="flex justify-center items-center">
            <div className="radial-progress text-neutral bg-gray-100 border-4 border-gray-100 font-bold" style={{ "--value": 70, "--size": "12rem", "--thickness": "2rem" }} role="progressbar">
              70%
            </div>
          </div>
          {/* Rincian Angka */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full md:w-auto">
            <div className="text-center md:text-left">
              <span className="text-sm text-gray-400 font-medium">Pemasukan</span>
              <p className="text-2xl font-bold text-black mt-1">Rp5.200.000</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-sm text-gray-400 font-medium">Pengeluaran</span>
              <p className="text-2xl font-bold text-black mt-1">Rp3.150.000</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-sm text-gray-400 font-medium">Anggaran Tersisa</span>
              <p className="text-2xl font-bold text-black mt-1">Rp2.050.000</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= GRAFIK PENGELUARAN ================= */}
      <div className="w-full flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-black">Grafik Pengeluaran</h2>
          <p className="text-gray-500">Detail visualisasi grafik tren pengeluaran mingguan dan dompet cerdas Anda.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Grafik 1: Pengeluaran Mingguan (Area Chart Placeholder) */}
          <div className="border border-gray-100 shadow-sm p-6 rounded-2xl bg-white flex flex-col gap-4">
            <h3 className="text-lg font-bold text-black">Pengeluaran Mingguan</h3>
            <div className="w-full h-48 bg-gray-50 rounded-xl flex items-end p-4 gap-2 relative overflow-hidden">
              {/* Efek Wave Statis */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent bottom-0 h-1/2 w-full"></div>
              <div className="w-full skeleton h-12 bg-gray-300 rounded-none"></div>
              <div className="w-full skeleton h-24 bg-gray-300 rounded-none"></div>
              <div className="w-full skeleton h-16 bg-gray-300 rounded-none"></div>
              <div className="w-full skeleton h-32 bg-gray-300 rounded-none"></div>
            </div>
          </div>
          {/* Grafik 2: Dompet Cerdas (Bar Chart Placeholder) */}
          <div className="border border-gray-100 shadow-sm p-6 rounded-2xl bg-white flex flex-col gap-4">
            <h3 className="text-lg font-bold text-black">Dompet Cerdas</h3>
            <div className="w-full h-48 bg-gray-50 rounded-xl flex items-end justify-between p-6 gap-3">
              <div className="w-8 bg-neutral h-32 rounded-t-sm"></div>
              <div className="w-8 bg-neutral h-16 rounded-t-sm"></div>
              <div className="w-8 bg-neutral h-24 rounded-t-sm"></div>
              <div className="w-8 bg-neutral h-12 rounded-t-sm"></div>
              <div className="w-8 bg-neutral h-36 rounded-t-sm"></div>
              <div className="w-8 bg-neutral h-20 rounded-t-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RINGKASAN PENGELUARAN ================= */}
      <div className="w-full flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-black">Ringkasan Pengeluaran</h2>
          <p className="text-gray-500">Rangkuman kategori pengeluaran terbesar yang paling sering kamu lakukan.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {/* Card Ringkasan 1 */}
          <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
            <div className="w-16 h-16 skeleton rounded-xl shrink-0"></div>
            <div className="flex flex-col">
              <h4 className="font-bold text-black text-lg">Makan siang di warteg Bahari bu aminah</h4>
              <p className="text-sm text-gray-400 mt-0.5">Kategori: Makanan • Total: Rp345.000</p>
            </div>
          </div>
          {/* Card Ringkasan 2 */}
          <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
            <div className="w-16 h-16 skeleton rounded-xl shrink-0"></div>
            <div className="flex flex-col">
              <h4 className="font-bold text-black text-lg">Nongkrong di warkop sukarasa</h4>
              <p className="text-sm text-gray-400 mt-0.5">Kategori: Hiburan • Total: Rp180.000</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DANA & ALOKASI YANG DISARANKAN ================= */}
      <div className="w-full flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-black">Dana & alokasi yang disarankan</h2>
          <p className="text-gray-500">Rekomendasi pembagian pos keuangan ideal berdasarkan algoritma cerdas FineFin.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Alokasi 1 */}
          <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4">
            <div className="w-full h-32 skeleton rounded-xl"></div>
            <div>
              <h4 className="font-bold text-black text-lg">Kebutuhan Pokok (50%)</h4>
              <p className="text-sm text-gray-400 mt-1">Disarankan: Rp2.600.000 • Untuk makan, kosan, dan tagihan wajib.</p>
            </div>
          </div>
          {/* Alokasi 2 */}
          <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4">
            <div className="w-full h-32 skeleton rounded-xl"></div>
            <div>
              <h4 className="font-bold text-black text-lg">Tabungan & Investasi (30%)</h4>
              <p className="text-sm text-gray-400 mt-1">Disarankan: Rp1.560.000 • Membangun masa depan aman.</p>
            </div>
          </div>
          {/* Alokasi 3 */}
          <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4">
            <div className="w-full h-32 skeleton rounded-xl"></div>
            <div>
              <h4 className="font-bold text-black text-lg">Keinginan & Hiburan (20%)</h4>
              <p className="text-sm text-gray-400 mt-1">Disarankan: Rp1.040.000 • Menjaga kesehatan mentalmu.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TRANSAKSI TERKINI (DENGAN ICON DAISYUI) ================= */}
      <div className="w-full flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-black">Transaksi Terkini</h2>
          <p className="text-gray-500">Daftar pengeluaran dan pemasukan paling baru yang kamu catat.</p>
        </div>
        
        {/* Grid Transaksi berbentuk Avatar Ring DaisyUI */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center max-w-5xl mx-auto w-full">
          
          {/* Item 1: Kebutuhan */}
          <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-14 shadow-sm text-xl">
                🛒
              </div>
            </div>
            <div>
              <h4 className="font-bold text-black text-sm">Kebutuhan</h4>
              <span className="text-xs text-gray-400">Belanja Bulanan</span>
              <p className="text-red-500 font-semibold text-sm mt-1">-Rp548.230</p>
            </div>
          </div>

          {/* Item 2: Coffee */}
          <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-14 shadow-sm text-xl">
                ☕
              </div>
            </div>
            <div>
              <h4 className="font-bold text-black text-sm">Coffee</h4>
              <span className="text-xs text-gray-400">Nongkrong Senja</span>
              <p className="text-red-500 font-semibold text-sm mt-1">-Rp100.750</p>
            </div>
          </div>

          {/* Item 3: Bensin */}
          <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-14 shadow-sm text-xl">
                🚗
              </div>
            </div>
            <div>
              <h4 className="font-bold text-black text-sm">Bensin</h4>
              <span className="text-xs text-gray-400">Bahan Bakar Mobil</span>
              <p className="text-red-500 font-semibold text-sm mt-1">-Rp600.000</p>
            </div>
          </div>

          {/* Item 4: Kesehatan */}
          <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-14 shadow-sm text-xl">
                🧴
              </div>
            </div>
            <div>
              <h4 className="font-bold text-black text-sm">Kesehatan</h4>
              <span className="text-xs text-gray-400">Skincare / Vitamin</span>
              <p className="text-red-500 font-semibold text-sm mt-1">-Rp100.000</p>
            </div>
          </div>

          {/* Item 5: Kuota Internet */}
          <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-14 shadow-sm text-xl">
                📱
              </div>
            </div>
            <div>
              <h4 className="font-bold text-black text-sm">Paket Internet</h4>
              <span className="text-xs text-gray-400">Kerja & Kuliah</span>
              <p className="text-red-500 font-semibold text-sm mt-1">-Rp80.000</p>
            </div>
          </div>

          {/* Item 6: Gaji Bulanan */}
          <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-14 shadow-sm text-xl">
                💰
              </div>
            </div>
            <div>
              <h4 className="font-bold text-black text-sm">Gaji Utama</h4>
              <span className="text-xs text-gray-400">Pemasukan Tetap</span>
              <p className="text-green-600 font-semibold text-sm mt-1">+Rp10.000.000</p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= MEMBER SUCCESS STORIES ================= */}
      <div className="w-full flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-black">Member success stories</h2>
          <p className="text-gray-500">Apa kata mereka yang berhasil mengatur finansial sehat bersama FineFin.</p>
        </div>
        
        {/* Grid Review Menggunakan Chat Bubble DaisyUI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          
          <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 skeleton rounded-full"></div>
              <div>
                <h5 className="font-bold text-black text-sm">Arkan R.</h5>
                <span className="text-xs text-warning">★★★★★</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">"Sangat terbantu mengatur uang bulanan anak kos. Sekarang gak ada lagi cerita merana di akhir bulan!"</p>
          </div>

          <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 skeleton rounded-full"></div>
              <div>
                <h5 className="font-bold text-black text-sm">Nabila Z.</h5>
                <span className="text-xs text-warning">★★★★★</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">"Fitur Dompet Cerdasnya juara banget buat ngetrack pengeluaran impulsif beli kopi tiap sore."</p>
          </div>

          <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 skeleton rounded-full"></div>
              <div>
                <h5 className="font-bold text-black text-sm">Fahmi A.</h5>
                <span className="text-xs text-warning">★★★★★</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">"Rekomendasi alokasi dananya akurat. Kerangka UI webnya juga responsif dan super minimalis."</p>
          </div>

        </div>
      </div>

      {/* ================= FOOTER / TIPS PRIVASI ================= */}
      <div className="text-center border-t border-gray-100 pt-8 mt-4">
        <p className="text-sm font-bold text-black mb-1">Tips: Jauhkan pencatatan tanpa sandi untuk mencegah kebocoran data pribadi anggaranmu!</p>
        <p className="text-xs text-gray-400">Privasi Anda dilindungi secara enkripsi end-to-end oleh protokol pengamanan internal FineFin. © 2026 All rights reserved.</p>
      </div>

    </div>
  );
};

export default Dashboard;