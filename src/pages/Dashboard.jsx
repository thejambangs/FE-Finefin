// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axiosInstance from "../Utils/axiosInstance"; // 👇 Import Axios Instance kalian
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import WalletImage from "../assets/images/dompet digital.jpg";
import Kebutuhan from "../assets/images/kebutuhan.jpg";
import Investasi from "../assets/images/investasi.jpg";
import Hiburan from "../assets/images/keinginan.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 👇 State untuk menyimpan data transaksi dari backend
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number || 0);
};

const getCategoryIcon = (kategori) => {
  switch (kategori) {
    case "Makanan & Minuman":
      return "🍱";
    case "Transport":
      return "🚗";
    case "Belanja":
      return "🛒";
    case "Hiburan":
      return "🎮";
    case "Kesehatan":
      return "💊";
    case "Investasi":
      return "📈";
    case "Gaji":
      return "💰";
    default:
      return "💳";
  }
};

  // 👇 Ambil data saat halaman pertama kali dimuat
  useEffect(() => {
  fetchTransactions();
  fetchSummary();
}, []);

  const fetchTransactions = async () => {
    try {
      // Pastikan endpoint ini sesuai dengan route BE (Sprint 6)
      const response = await axiosInstance.get('/api/transaction');
      // Asumsi backend mereturn response.data.data berupa array
      setTransactions(response.data.data); 
    } catch (error) {
      console.error("Gagal menarik riwayat transaksi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSummary = async () => {
  try {
    const response = await axiosInstance.get("/api/transaction/summary");

    console.log(response.data.data);

    setSummary(response.data.data);
  } catch (error) {
    console.error("Gagal mengambil ringkasan:", error);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_Onboarded");
    navigate("/login");
  };

  const percentage =
  summary && summary.income > 0
    ? Math.min(
        Math.round((summary.expense / summary.income) * 100),
        100
      )
    : 0;

  const kebutuhan = (summary?.income || 0) * 0.5;
  const investasi = (summary?.income || 0) * 0.3;
  const hiburan = (summary?.income || 0) * 0.2;

  const COLORS = [
  "#111827",
  "#374151",
  "#6B7280",
  "#9CA3AF",
  "#D1D5DB",
];

  return (
    <div className="min-h-screen w-full bg-base-100 text-neutral font-sans p-6 lg:p-12 flex flex-col gap-6">
      {/* ================= HEADER NAVIGATION (SESUAI GAMBAR BARU) ================= */}
      <div className="navbar bg-white border-b border-gray-100 px-4 md:px-8 shrink-0">
        {/* Sisi Kiri: Logo Branding */}
        <div className="flex-1">
          <Link
            to="/dashboard"
            className="text-3xl font-black text-black tracking-tighter uppercase select-none"
          >
            FineFin
          </Link>
        </div>

        {/* Sisi Tengah: Pilihan Menu Utama */}
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-6 text-lg font-semibold">
            <li>
              {/* Indikator Menu Aktif: Teks hitam pekat dengan border bawah solid */}
              <Link
                to="/dashboard"
                className="text-black border-b-2 border-black rounded-none px-1 pb-2 pt-2 bg-transparent hover:bg-transparent"
              >
                Dasbor
              </Link>
            </li>
            <li>
              <Link
                to="/transaction"
                className="text-gray-400 rounded-none px-1 pb-2 pt-2 bg-transparent hover:bg-transparent hover:text-black"
              >
                Transaksi
              </Link>
            </li>
            <li>
              <Link
                to="/kuesioner"
                className="text-gray-400 rounded-none px-1 pb-2 pt-2 bg-transparent hover:bg-transparent hover:text-black"
              >
                Kuesioner
              </Link>
            </li>
          </ul>
        </div>

        {/* Sisi Kanan: Akses Aksi Pengguna */}
        <div className="flex-none ml-8">
          <button
            onClick={handleLogout}
            className="btn btn-outline min-h-0 h-10 rounded-full px-6 border-black text-black font-semibold text-sm hover:bg-black hover:text-white hover:border-black uppercase transition-all duration-200"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Jeda Spacing Pemisah Header dengan Konten Utama */}
      <div className="mt-4 flex flex-col gap-12">
        {/* ================= HERO SECTION: SEKILAS TENTANG DOMPET ANDA ================= */}
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

        {/* ================= REKAP BULANAN ================= */}
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black">
              Rekap Bulanan
            </h2>
            <p className="text-gray-500">
              Analisis perbandingan persentase antara alokasi dana dan realisasi
              pengeluaran Anda.
            </p>
          </div>

          <div className="w-full max-w-4xl border border-gray-100 shadow-sm p-8 rounded-2xl flex flex-col md:flex-row items-center justify-around gap-8 bg-white">
            <div className="flex justify-center items-center">
              <div
                className="radial-progress text-neutral bg-gray-100 border-4 border-gray-100 font-bold"
                style={{
                  "--value": percentage,
                  "--size": "12rem",
                  "--thickness": "2rem",
                }}
                role="progressbar"
              >
                {percentage}%
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full md:w-auto">
              <div className="text-center md:text-left">
                <span className="text-sm text-gray-400 font-medium">
                  Pemasukan
                </span>
                <p className="text-2xl font-bold text-black mt-1">
                  {formatRupiah(summary?.income)}
                </p>
              </div>
              <div className="text-center md:text-left">
                <span className="text-sm text-gray-400 font-medium">
                  Pengeluaran
                </span>
                <p className="text-2xl font-bold text-black mt-1">
                  {formatRupiah(summary?.expense)}
                </p>
              </div>
              <div className="text-center md:text-left">
                <span className="text-sm text-gray-400 font-medium">
                  Anggaran Tersisa
                </span>
                <p className="text-2xl font-bold text-black mt-1">
                  {formatRupiah(summary?.balance)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= GRAFIK PENGELUARAN ================= */}
        <div className="w-full flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-black">
              Grafik Pengeluaran
            </h2>
            <p className="text-gray-500">
              Detail visualisasi grafik tren pengeluaran per kategori dan distribusi pengeluaran
              cerdas Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Grafik 1: Pengeluaran Mingguan */}
            <div className="border border-gray-100 shadow-sm p-6 rounded-2xl bg-white flex flex-col gap-4">
              <h3 className="text-lg font-bold text-black">
                Pengeluaran per Kategori
              </h3>
              <div className="w-full h-48 bg-gray-50 rounded-xl flex items-end relative overflow-hidden p-2">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={summary?.categories || []}>
                    <XAxis
                      dataKey="kategori"
                      tick={{ fontSize: 12 }}
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="total"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="absolute bottom-2 right-4 text-xs font-semibold text-gray-400">
                  Minggu ini
                </div>
              </div>
            </div>

            {/* Grafik 2: Dompet Cerdas */}
            <div className="border border-gray-100 shadow-sm p-6 rounded-2xl bg-white flex flex-col gap-4">
              <h3 className="text-lg font-bold text-black">Distribusi Pengeluaran</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={summary?.categories || []}
                    dataKey="total"
                    nameKey="kategori"
                    outerRadius={80}
                    label
                  >
                    {(summary?.categories || []).map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ================= RINGKASAN PENGELUARAN ================= */}
        <div className="w-full flex flex-col gap-6">
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
            {summary?.categories?.length > 0 ? (
              summary.categories.map((category) => (
                <div
                  key={category.kategori}
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm"
                >
                  <div className="w-14 h-14 bg-gray-100 text-neutral rounded-xl shrink-0 flex items-center justify-center text-2xl font-bold">
                    {getCategoryIcon(category.kategori)}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-black text-lg">
                      {category.kategori}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Total Pengeluaran
                    </p>
                    <p className="font-bold text-red-500">
                      {formatRupiah(category.total)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">
                Belum ada data kategori.
              </p>
            )}
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
                  {formatRupiah(kebutuhan)}
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
                  {formatRupiah(investasi)}
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
                  {formatRupiah(hiburan)} 
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
            {transactions.length === 0 ? (
              <p className="col-span-full text-center text-gray-400">
                Belum ada transaksi.
              </p>
            ) : (
            transactions.slice(0, 6).map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-center gap-2 text-center bg-gray-50/50 p-4 rounded-xl w-full"
              >
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-14 h-14 shadow-sm text-xl flex items-center justify-center">
                    {getCategoryIcon(item.kategori)}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-black text-sm">
                    {item.namaTransaksi}
                  </h4>

                  <span className="text-xs text-gray-400">
                    {item.kategori}
                  </span>

                  <p
                    className={`font-semibold text-sm mt-1 ${
                      item.tipeTransaksi === "Pemasukan"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.tipeTransaksi === "Pemasukan" ? "+" : "-"}
                    {formatRupiah(item.nominal)}
                  </p>
                </div>
              </div>
            )))}
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
