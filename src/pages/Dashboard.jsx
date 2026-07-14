// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axiosInstance from "../Utils/axiosInstance"; 
import WalletImage from "../assets/images/dompet digital.jpg";
import Kebutuhan from "../assets/images/kebutuhan.jpg";
import Investasi from "../assets/images/investasi.jpg";
import Hiburan from "../assets/images/keinginan.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // State untuk menyimpan data transaksi dari backend
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data saat halaman pertama kali dimuat
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get('/api/transaction');
      setTransactions(response.data.data); 
    } catch (error) {
      console.error("Gagal menarik riwayat transaksi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_Onboarded");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    const previousTransactions = [...transactions];
    setTransactions((prev) => prev.filter((trx) => trx._id !== id));

    try {
      await axiosInstance.delete(`/api/transaction/${id}`);
    } catch (error) {
      console.error("Gagal menghapus transaksi:", error);
      setTransactions(previousTransactions);
      alert("Gagal menghapus data. Periksa koneksi atau coba lagi nanti.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-base-100 text-neutral font-sans p-6 lg:p-12 flex flex-col gap-6">
      
      {/* ================= HEADER NAVIGATION ================= */}
      <div className="navbar bg-white border-b border-gray-100 px-4 md:px-8 shrink-0">
        <div className="flex-1">
          <Link to="/dashboard" className="text-3xl font-black text-black tracking-tighter uppercase select-none">
            FineFin
          </Link>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-6 text-lg font-semibold">
            <li>
              <Link to="/dashboard" className="text-black border-b-2 border-black rounded-none px-1 pb-2 pt-2 bg-transparent hover:bg-transparent">
                Dasbor
              </Link>
            </li>
            <li>
              <Link to="/transaction" className="text-gray-400 rounded-none px-1 pb-2 pt-2 bg-transparent hover:bg-transparent hover:text-black">
                Transaksi
              </Link>
            </li>
            <li>
              <Link to="/kuesioner" className="text-gray-400 rounded-none px-1 pb-2 pt-2 bg-transparent hover:bg-transparent hover:text-black">
                Kuesioner
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-none ml-8">
          <button
            onClick={handleLogout}
            className="btn btn-outline min-h-0 h-10 rounded-full px-6 border-black text-black font-semibold text-sm hover:bg-black hover:text-white hover:border-black uppercase transition-all duration-200"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-12">
        {/* ================= HERO SECTION ================= */}
        <div className="w-full bg-neutral text-neutral-content p-8 lg:p-12 rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-8 shadow-md">
          <div className="flex flex-col gap-4 max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
              Sekilas tentang Dompet Anda
            </h1>
            <p className="text-gray-400 text-lg">
              Kelola dan pantau seluruh arus keuanganmu secara realtime dengan
              asisten pintar kami.
            </p>
          </div>

          <div className="w-full lg:w-[400px] h-[220px] rounded-xl overflow-hidden shadow-md bg-[#2cbce8]">
            <img
              src={WalletImage}
              alt="Wallet and money cartoon _ Free Vector"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ================= IMPLEMENTASI SPRINT 7: VISUALISASI KEUANGAN ================= */}
        <div className="w-full flex flex-col gap-8">
          
          {/* 1. KARTU SISA SALDO (Hero Stat) */}
          <div className="stats bg-black text-white shadow-xl rounded-2xl w-full py-8 px-4 md:px-8">
            <div className="stat flex flex-col gap-2">
              <div className="stat-title text-gray-400 font-medium text-lg uppercase tracking-wider">Sisa Saldo Uang Kamu</div>
              {/* Nantinya nominal ini bisa dihubungkan dengan state transaksi oleh FE 2 */}
              <div className="stat-value text-5xl md:text-7xl font-black text-white drop-shadow-md">Rp 2.050.000</div>
              <div className="stat-desc text-green-400 mt-2 text-base font-semibold flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                +14% dari bulan lalu
              </div>
            </div>
          </div>

          {/* 2. WADAH GRAFIK UNTUK RECHARTS (Tugas FE 1: Membuat panggung untuk FE 2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Wadah Kiri: Proporsi Kategori (Pie Chart) */}
            <div className="border border-gray-200 shadow-sm p-6 rounded-2xl bg-white flex flex-col gap-4 min-h-[400px]">
              <div>
                <h3 className="text-xl font-bold text-black">Proporsi Kategori</h3>
                <p className="text-sm text-gray-500">Distribusi pengeluaranmu bulan ini.</p>
              </div>
              <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="text-center">
                  <span className="text-gray-400 font-semibold block mb-2">[ Area Pie Chart Recharts ]</span>
                  <span className="text-xs text-gray-400">FE 2 akan menyisipkan grafik di sini</span>
                </div>
              </div>
            </div>

            {/* Wadah Kanan: Tren Pengeluaran (Area/Line Chart) */}
            <div className="border border-gray-200 shadow-sm p-6 rounded-2xl bg-white flex flex-col gap-4 min-h-[400px]">
              <div>
                <h3 className="text-xl font-bold text-black">Tren Pengeluaran</h3>
                <p className="text-sm text-gray-500">Grafik arus kas mingguan.</p>
              </div>
              <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="text-center">
                  <span className="text-gray-400 font-semibold block mb-2">[ Area Line Chart Recharts ]</span>
                  <span className="text-xs text-gray-400">FE 2 akan menyisipkan grafik di sini</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* ================= AKHIR IMPLEMENTASI SPRINT 7 ================= */}

        {/* ================= RINGKASAN PENGELUARAN ================= */}
        <div className="w-full flex flex-col gap-6 mt-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black">
              Ringkasan Pengeluaran
            </h2>
            <p className="text-gray-500">
              Rangkuman kategori pengeluaran terbesar yang paling sering kamu
              lakukan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
              <div className="w-14 h-14 bg-gray-100 text-neutral rounded-xl shrink-0 flex items-center justify-center text-2xl font-bold select-none">
                🍱
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-black text-lg">
                  Makan siang di warteg Bahari bu aminah
                </h4>
                <p className="text-sm text-gray-400 mt-0.5">
                  Kategori: Makanan • Total: Rp345.000
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
              <div className="w-14 h-14 bg-gray-100 text-neutral rounded-xl shrink-0 flex items-center justify-center text-2xl font-bold select-none">
                🎯
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-black text-lg">
                  Nongkrong di warkop sukarasa
                </h4>
                <p className="text-sm text-gray-400 mt-0.5">
                  Kategori: Hiburan • Total: Rp180.000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DANA & ALOKASI YANG DISARANKAN ================= */}
        <div className="w-full flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black">
              Dana & alokasi yang disarankan
            </h2>
            <p className="text-gray-500">
              Rekomendasi pembagian pos keuangan ideal berdasarkan algoritma
              cerdas FineFin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4">
              <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-50 shadow-inner">
                <img
                  src={Kebutuhan}
                  alt="Kebutuhan Pokok - Karir & Fondasi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-black text-lg">
                  Kebutuhan Pokok (50%)
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                  Disarankan: Rp2.600.000 • Untuk makan, kosan, dan tagihan
                  wajib.
                </p>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4">
              <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-50 shadow-inner">
                <img
                  src={Investasi}
                  alt="Tabungan & Investasi - Pertumbuhan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-black text-lg">
                  Tabungan & Investasi (30%)
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                  Disarankan: Rp1.560.000 • Membangun masa depan aman.
                </p>
              </div>
            </div>
            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4">
              <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-50 shadow-inner">
                <img
                  src={Hiburan}
                  alt="Keinginan & Hiburan - Rencana Impian"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-black text-lg">
                  Keinginan & Hiburan (20%)
                </h4>
                <p className="text-sm text-gray-400 mt-1">
                  Disarankan: Rp1.040.000 • Menjaga kesehatan mentalmu.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TRANSAKSI TERKINI ================= */}
        <div className="w-full flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black">
              Transaksi Terkini
            </h2>
            <p className="text-gray-500">
              Daftar pengeluaran dan pemasukan paling baru yang kamu catat.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center max-w-5xl mx-auto w-full">
            <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-14 h-14 shadow-sm text-xl flex items-center justify-center">
                  🛒
                </div>
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Kebutuhan</h4>
                <span className="text-xs text-gray-400">Belanja Bulanan</span>
                <p className="text-red-500 font-semibold text-sm mt-1">
                  -Rp548.230
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-14 h-14 shadow-sm text-xl flex items-center justify-center">
                  ☕
                </div>
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Coffee</h4>
                <span className="text-xs text-gray-400">Nongkrong Senja</span>
                <p className="text-red-500 font-semibold text-sm mt-1">
                  -Rp100.750
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-14 h-14 shadow-sm text-xl flex items-center justify-center">
                  🚗
                </div>
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Bensin</h4>
                <span className="text-xs text-gray-400">Bahan Bakar Mobil</span>
                <p className="text-red-500 font-semibold text-sm mt-1">
                  -Rp600.000
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-14 h-14 shadow-sm text-xl flex items-center justify-center">
                  🧴
                </div>
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Kesehatan</h4>
                <span className="text-xs text-gray-400">
                  Skincare / Vitamin
                </span>
                <p className="text-red-500 font-semibold text-sm mt-1">
                  -Rp100.000
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-14 h-14 shadow-sm text-xl flex items-center justify-center">
                  📱
                </div>
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Paket Internet</h4>
                <span className="text-xs text-gray-400">Kerja & Kuliah</span>
                <p className="text-red-500 font-semibold text-sm mt-1">
                  -Rp80.000
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-14 h-14 shadow-sm text-xl flex items-center justify-center">
                  💰
                </div>
              </div>
              <div>
                <h4 className="font-bold text-black text-sm">Gaji Utama</h4>
                <span className="text-xs text-gray-400">Pemasukan Tetap</span>
                <p className="text-green-600 font-semibold text-sm mt-1">
                  +Rp10.000.000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MEMBER SUCCESS STORIES ================= */}
        <div className="w-full flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black">
              Member success stories
            </h2>
            <p className="text-gray-500">
              Apa kata mereka yang berhasil mengatur finansial sehat bersama
              FineFin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
            <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs select-none">
                  AR
                </div>
                <div>
                  <h5 className="font-bold text-black text-sm">Arkan R.</h5>
                  <span className="text-xs text-warning">★★★★★</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                "Sangat terbantu mengatur uang bulanan anak kos. Sekarang gak
                ada lagi cerita merana di akhir bulan!"
              </p>
            </div>

            <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs select-none">
                  NZ
                </div>
                <div>
                  <h5 className="font-bold text-black text-sm">Nabila Z.</h5>
                  <span className="text-xs text-warning">★★★★★</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                "Fitur Dompet Cerdasnya juara banget buat ngetrack pengeluaran
                impulsif beli kopi tiap sore."
              </p>
            </div>

            <div className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs select-none">
                  FA
                </div>
                <div>
                  <h5 className="font-bold text-black text-sm">Fahmi A.</h5>
                  <span className="text-xs text-warning">★★★★★</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                "Rekomendasi alokasi dananya akurat. Kerangka UI webnya juga
                responsif dan super minimalis."
              </p>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="text-center border-t border-gray-100 pt-8 mt-4">
          <p className="text-sm font-bold text-black mb-1">
            Tips: Jauhkan pencatatan tanpa sandi untuk mencegah kebocoran data
            pribadi anggaranmu!
          </p>
          <p className="text-xs text-gray-400">
            Privasi Anda dilindungi secara enkripsi end-to-end oleh protokol
            pengamanan internal FineFin. © 2026 All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;