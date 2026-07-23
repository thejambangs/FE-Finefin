// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
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

  // State
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true); // 🔒 Interactive: Toggle Intip Saldo
  const [filterType, setFilterType] = useState("ALL"); // 🎯 Interactive: Filter Transaksi

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);
  };

  const maskAmount = (val) => (showBalance ? formatRupiah(val) : "••••••••");

  const getCategoryIcon = (kategori) => {
    switch (kategori) {
      case "Makanan & Minuman": return "🍱";
      case "Transport": return "🚗";
      case "Belanja": return "🛒";
      case "Hiburan": return "🎮";
      case "Kesehatan": return "💊";
      case "Investasi": return "📈";
      case "Gaji": return "💰";
      default: return "💳";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchTransactions(), fetchSummary()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get("/api/transaction");
      setTransactions(response.data.data || []);
    } catch (error) {
      console.error("Gagal menarik riwayat transaksi:", error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axiosInstance.get("/api/transaction/summary");
      setSummary(response.data.data || null);
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

  // Warna Chart Modern
  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

  // Custom Tooltip Recharts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs font-sans">
          <p className="font-bold mb-1 text-slate-300">{payload[0].name || payload[0].payload.kategori}</p>
          <p className="text-emerald-400 font-extrabold text-sm">
            {formatRupiah(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Filter Transaksi
  const filteredTransactions = transactions.filter((item) => {
    if (filterType === "INCOME") return item.tipeTransaksi === "Pemasukan";
    if (filterType === "EXPENSE") return item.tipeTransaksi === "Pengeluaran";
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-slate-50/50 text-slate-800 font-sans p-4 lg:p-10 flex flex-col gap-8">
      {/* ================= HEADER NAVIGATION ================= */}
      <nav className="navbar bg-white/80 backdrop-blur-md sticky top-0 z-50 rounded-2xl border border-slate-200/80 shadow-sm px-6 py-3">
        <div className="flex-1">
          <Link
            to="/dashboard"
            className="text-2xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-2"
          >
            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-lg text-lg">FF</span>
            FineFin
          </Link>
        </div>

        <div className="flex-none hidden md:block">
          <ul className="menu menu-horizontal gap-2 text-sm font-semibold">
            <li>
              <Link
                to="/dashboard"
                className="text-indigo-600 bg-indigo-50 font-bold rounded-xl px-4 py-2"
              >
                Dasbor
              </Link>
            </li>
            <li>
              <Link
                to="/transaction"
                className="text-slate-500 rounded-xl px-4 py-2 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                Transaksi
              </Link>
            </li>
            <li>
              <Link
                to="/robo-adviser"
                className="text-slate-500 rounded-xl px-4 py-2 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                Robo-Advisor
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-none ml-4">
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-outline border-slate-300 hover:border-red-500 text-slate-700 hover:bg-red-500 hover:text-white rounded-xl uppercase font-bold text-xs transition-all px-4"
          >
            Log out
          </button>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="flex flex-col gap-10">
        {/* ================= HERO SECTION ================= */}
        <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 lg:p-10 rounded-3xl flex flex-col lg:flex-row justify-between items-center gap-8 shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col gap-3 max-w-xl z-10">
            <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit border border-indigo-400/20">
              Personal Financial Assistant
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Sekilas tentang <span className="text-indigo-400">Dompet Anda</span>
            </h1>
            <p className="text-slate-300 text-base leading-relaxed">
              Kelola dan pantau seluruh arus keuanganmu secara real-time dengan
              asisten pintar FineFin.
            </p>
          </div>

          <div className="w-full lg:w-[360px] h-[180px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 group">
            <img
              src={WalletImage}
              alt="Wallet illustration"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* ================= REKAP BULANAN ================= */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Rekap Bulanan</h2>
              <p className="text-sm text-slate-500">
                Analisis perbandingan persentase alokasi dana dan realisasi pengeluaran Anda.
              </p>
            </div>
            
            {/* Interactive Toggle Eye Button */}
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl shadow-sm transition-all"
            >
              <span>{showBalance ? "🙈 Sembunyikan Saldo" : "👁️ Tampilkan Saldo"}</span>
            </button>
          </div>

          {isLoading ? (
            <div className="w-full h-48 bg-white rounded-2xl animate-pulse shadow-sm border border-slate-100" />
          ) : (
            <div className="w-full bg-white border border-slate-200/80 shadow-sm p-6 lg:p-8 rounded-3xl flex flex-col lg:flex-row items-center justify-around gap-8">
              {/* Radial gauge */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="radial-progress text-indigo-600 bg-indigo-50 border-4 border-indigo-50 font-black text-2xl transition-all duration-700"
                  style={{
                    "--value": percentage,
                    "--size": "9.5rem",
                    "--thickness": "1.2rem",
                  }}
                  role="progressbar"
                >
                  {percentage}%
                </div>
                <span className="text-xs font-semibold text-slate-400">Pengeluaran vs Pemasukan</span>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 min-w-[170px]">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Pemasukan
                  </span>
                  <p className="text-xl font-extrabold text-emerald-600 mt-1">
                    {maskAmount(summary?.income)}
                  </p>
                </div>
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 min-w-[170px]">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    Pengeluaran
                  </span>
                  <p className="text-xl font-extrabold text-rose-500 mt-1">
                    {maskAmount(summary?.expense)}
                  </p>
                </div>
                <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 min-w-[170px]">
                  <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">
                    Sisa Anggaran
                  </span>
                  <p className="text-xl font-extrabold text-indigo-900 mt-1">
                    {maskAmount(summary?.balance)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= GRAFIK PENGELUARAN ================= */}
        <div className="w-full flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Grafik Pengeluaran</h2>
            <p className="text-sm text-slate-500">
              Visualisasi tren pengeluaran per kategori dan distribusi dompet pintar Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="border border-slate-200/80 shadow-sm p-6 rounded-3xl bg-white flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-800">
                  Pengeluaran per Kategori
                </h3>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                  Bulan Ini
                </span>
              </div>
              <div className="w-full h-64 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary?.categories || []}>
                    <XAxis dataKey="kategori" tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} />
                    <Bar dataKey="total" fill="#6366F1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donut Chart (Berisi Label Persentase) */}
            <div className="border border-slate-200/80 shadow-sm p-6 rounded-3xl bg-white flex flex-col gap-4">
              <h3 className="text-base font-bold text-slate-800">Distribusi Pengeluaran</h3>
              <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={summary?.categories || []}
                      dataKey="total"
                      nameKey="kategori"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={true}
                    >
                      {(summary?.categories || []).map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          className="hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RINGKASAN PENGELUARAN ================= */}
        <div className="w-full flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Ringkasan Kategori</h2>
            <p className="text-sm text-slate-500">
              Rangkuman kategori pengeluaran terbesar yang paling sering dilakukan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summary?.categories?.length > 0 ? (
              summary.categories.map((category) => (
                <div
                  key={category.kategori}
                  className="flex items-center gap-4 p-4 border border-slate-200/80 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl shrink-0 flex items-center justify-center text-xl shadow-inner">
                    {getCategoryIcon(category.kategori)}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-slate-800 text-sm">
                      {category.kategori}
                    </h4>
                    <p className="text-xs text-slate-400">Total Pengeluaran</p>
                    <p className="font-extrabold text-rose-500 text-sm mt-0.5">
                      {maskAmount(category.total)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                Belum ada data kategori.
              </div>
            )}
          </div>
        </div>

        {/* ================= DANA & ALOKASI DISARANKAN ================= */}
        <div className="w-full flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Alokasi Ideal (50/30/20)</h2>
            <p className="text-sm text-slate-500">
              Rekomendasi pembagian pos keuangan berdasarkan prinsip alokasi cerdas FineFin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Kebutuhan */}
            <div className="border border-slate-200/80 rounded-3xl p-5 bg-white shadow-sm hover:shadow-md transition-all flex flex-col gap-4 group">
              <div className="w-full h-40 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={Kebutuhan}
                  alt="Kebutuhan Pokok"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-base">Kebutuhan Pokok</h4>
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full">50%</span>
                </div>
                <p className="text-lg font-black text-slate-900 mt-2">
                  {maskAmount(kebutuhan)}
                </p>
              </div>
            </div>

            {/* Card Investasi */}
            <div className="border border-slate-200/80 rounded-3xl p-5 bg-white shadow-sm hover:shadow-md transition-all flex flex-col gap-4 group">
              <div className="w-full h-40 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={Investasi}
                  alt="Tabungan & Investasi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-base">Tabungan & Investasi</h4>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full">30%</span>
                </div>
                <p className="text-lg font-black text-slate-900 mt-2">
                  {maskAmount(investasi)}
                </p>
              </div>
            </div>

            {/* Card Hiburan */}
            <div className="border border-slate-200/80 rounded-3xl p-5 bg-white shadow-sm hover:shadow-md transition-all flex flex-col gap-4 group">
              <div className="w-full h-40 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={Hiburan}
                  alt="Keinginan & Hiburan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-base">Keinginan & Hiburan</h4>
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">20%</span>
                </div>
                <p className="text-lg font-black text-slate-900 mt-2">
                  {maskAmount(hiburan)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TRANSAKSI TERKINI ================= */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Transaksi Terkini</h2>
              <p className="text-sm text-slate-500">Daftar pengeluaran dan pemasukan terbaru Anda.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-slate-200/60 p-1 rounded-xl gap-1 text-xs font-semibold">
              <button
                onClick={() => setFilterType("ALL")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === "ALL" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterType("INCOME")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === "INCOME" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Pemasukan
              </button>
              <button
                onClick={() => setFilterType("EXPENSE")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === "EXPENSE" ? "bg-white text-rose-500 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Pengeluaran
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredTransactions.length === 0 ? (
              <div className="col-span-full py-10 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                Belum ada transaksi ditemukan.
              </div>
            ) : (
              filteredTransactions.slice(0, 6).map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center text-center bg-white border border-slate-200/70 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-xl mb-3">
                    {getCategoryIcon(item.kategori)}
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs truncate w-full">
                    {item.namaTransaksi}
                  </h4>
                  <span className="text-[10px] text-slate-400 mt-0.5 mb-2 uppercase font-medium">
                    {item.kategori}
                  </span>
                  <p
                    className={`font-black text-xs ${
                      item.tipeTransaksi === "Pemasukan"
                        ? "text-emerald-600"
                        : "text-rose-500"
                    }`}
                  >
                    {item.tipeTransaksi === "Pemasukan" ? "+" : "-"}
                    {maskAmount(item.nominal)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="text-center border-t border-slate-200/80 pt-8 mt-6">
          <p className="text-xs font-bold text-slate-700 mb-1">
            💡 Tips: Selalu amankan sesi akun Anda sebelum meninggalkan perangkat!
          </p>
          <p className="text-[11px] text-slate-400">
            Privasi Anda dilindungi secara enkripsi internal FineFin. © 2026 All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;