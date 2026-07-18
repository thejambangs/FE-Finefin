// src/pages/RoboAdvisor.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from 'recharts';

const RoboAdvisor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_Onboarded');
    navigate('/login');
  };

  // --- DUMMY DATA UNTUK GRAFIK (Nanti FE 2 yang menghubungkan ke API) ---
  const pieData = [
    { name: 'Terpakai', value: 65 },
    { name: 'Sisa Uang', value: 35 },
  ];
  const PIE_COLORS = ['#6B7280', '#D1D5DB']; // Warna grayscale sesuai desain

  const areaData = [
    { tahun: 'Tahun 1', uang: 1500000 },
    { tahun: 'Tahun 2', uang: 2100000 },
    { tahun: 'Tahun 3', uang: 1800000 },
    { tahun: 'Tahun 4', uang: 3200000 },
    { tahun: 'Tahun 5', uang: 4500000 },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-neutral font-sans pb-20">
      
      {/* ================= HEADER NAVIGATION ================= */}
      <div className="navbar bg-white border-b border-gray-100 px-4 md:px-12 shrink-0">
        <div className="flex-1">
          <Link to="/dashboard" className="text-3xl font-black text-black tracking-tighter uppercase select-none">
            FineFin
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-6 text-lg font-semibold">
            <li>
              <Link to="/dashboard" className="text-gray-400 rounded-none px-1 pb-2 pt-2 bg-transparent hover:bg-transparent hover:text-black">
                Dasbor
              </Link>
            </li>
            <li>
              <Link to="/transaction" className="text-gray-400 rounded-none px-1 pb-2 pt-2 bg-transparent hover:bg-transparent hover:text-black">
                Transaksi
              </Link>
            </li>
            <li>
              <Link to="/robo-advisor" className="text-black border-b-2 border-black rounded-none px-1 pb-2 pt-2 bg-transparent hover:bg-transparent">
                Robo-Advisor
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-none ml-8 flex items-center gap-4">
          <div className="form-control hidden md:block">
            <input type="text" placeholder="Search in site" className="input input-sm border-gray-200 focus:outline-none focus:border-gray-400 rounded-full w-48 bg-white text-black" />
          </div>
          <button onClick={handleLogout} className="btn btn-ghost btn-circle avatar placeholder">
            <div className="bg-gray-200 text-neutral-content rounded-full w-10">
              <span className="text-black">U</span>
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12 flex flex-col gap-20">
        
        {/* ================= JUDUL & TOMBOL AKSI ================= */}
        <div className="flex flex-col items-center text-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-black">Ringkasan Keuangan</h1>
            <p className="text-gray-500 mt-2 text-sm font-medium">Performa dan progres target Anda bulan ini.</p>
          </div>
          <div className="flex flex-row gap-4">
            <button className="btn bg-black text-white hover:bg-neutral-800 font-bold px-8 border-none rounded-md">
              Unduh Laporan
            </button>
          </div>
        </div>

        {/* ================= SECTION 1: INDIKATOR SURPLUS/DEFISIT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Kiri: Teks & Kartu Indikator */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-black leading-tight max-w-sm">
                Kartu Indikator Kondisi Surplus/Defisit
              </h2>
              <p className="text-gray-500 mt-4 text-sm leading-relaxed max-w-sm">
                Warna menunjukkan status sisa uang: merah = surplus, kuning = seimbang, merah = defisit.
                <br/><span className="text-xs text-gray-400">(Catatan desain: Teks asli menulis merah=surplus dan merah=defisit, silakan sesuaikan logikanya nanti)</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sisa Uang</span>
                <p className="text-2xl font-black text-black mt-1">Rp 1.500.000</p>
                <span className="text-xs text-gray-400">+ (hasil perhitungan)</span>
              </div>
              <div className="border border-gray-100 rounded-lg p-5 shadow-sm bg-white">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status Kartu Indikator</span>
                <p className="text-xl font-bold text-black mt-1">Kuning — Seimbang</p>
                <span className="text-xs text-gray-400">Stabil</span>
              </div>
            </div>
          </div>

          {/* Kanan: Pie Chart Status Warna */}
          <div className="border border-gray-100 shadow-sm p-6 rounded-2xl bg-white w-full h-[350px] flex flex-col">
            <h3 className="text-sm font-bold text-black">Status (Demo Warna)</h3>
            <div className="flex-grow w-full h-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={0}
                    outerRadius={100}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* ================= SECTION 2: TABEL KETERANGAN ALOKASI ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-4">
          
          {/* Kiri: Judul Alokasi */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold text-black leading-tight max-w-sm">
              Tabel Keterangan Alokasi<br/>(Profil Risiko: Moderat)
            </h2>
            <p className="text-gray-500 text-sm">
              Pembagian sisa uang berdasarkan rekomendasi robo-advisor.
            </p>
          </div>

          {/* Kanan: Daftar Alokasi */}
          <div className="flex flex-col gap-4">
            {/* Card Reksa Dana */}
            <div className="flex items-center gap-4 border border-gray-100 p-4 rounded-xl shadow-sm bg-white">
              <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
              <div className="flex flex-col">
                <h4 className="font-bold text-black text-sm">Reksa Dana Pasar Uang</h4>
                <span className="text-xs text-gray-400 font-semibold my-0.5">50%</span>
                <p className="text-sm font-medium text-black">Rp 750.000</p>
              </div>
            </div>

            {/* Card Obligasi */}
            <div className="flex items-center gap-4 border border-gray-100 p-4 rounded-xl shadow-sm bg-white">
              <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
              <div className="flex flex-col">
                <h4 className="font-bold text-black text-sm">Obligasi</h4>
                <span className="text-xs text-gray-400 font-semibold my-0.5">30%</span>
                <p className="text-sm font-medium text-black">Rp 450.000</p>
              </div>
            </div>

            {/* Card Saham */}
            <div className="flex items-center gap-4 border border-gray-100 p-4 rounded-xl shadow-sm bg-white">
              <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
              <div className="flex flex-col">
                <h4 className="font-bold text-black text-sm">Saham</h4>
                <span className="text-xs text-gray-400 font-semibold my-0.5">20%</span>
                <p className="text-sm font-medium text-black">Rp 300.000</p>
              </div>
            </div>

            {/* Card Ringkasan */}
            <div className="flex items-center gap-4 border border-gray-100 p-4 rounded-xl shadow-sm bg-white">
              <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0"></div>
              <div className="flex flex-col">
                <h4 className="font-bold text-black text-sm">Ringkasan</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Total alokasi = Rp 1.500.000 (sesuai input sisa uang tadi).
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ================= SECTION 3: GRAFIK MESIN WAKTU ================= */}
        <div className="w-full flex flex-col gap-8 mt-4">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-3xl font-extrabold text-black">Grafik Simulasi Mesin Waktu</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Simulasi masa depan: garis abu-abu untuk tabungan biasa, garis hijau terang untuk investasi sesuai rekomendasi.
            </p>
          </div>

          <div className="border border-gray-100 shadow-sm p-6 rounded-2xl bg-white w-full flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-bold text-black">Simulasi 1–5 Tahun</h3>
              <p className="text-xs text-gray-400 mt-1">Jumlah Uang</p>
            </div>
            
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUang" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
                  <Area 
                    type="monotone" 
                    dataKey="uang" 
                    stroke="#4B5563" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorUang)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400">Tahun (1 sampai 5)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoboAdvisor;