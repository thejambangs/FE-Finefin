// src/pages/RoboAdvisor.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const RoboAdvisor = () => {
  const navigate = useNavigate();

  // State untuk menyimpan data dari API
  const [roboData, setRoboData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fungsi format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_Onboarded');
    navigate('/login');
  };

  // Fetch API saat komponen di-mount
  useEffect(() => {
    const fetchProjection = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Sesuaikan dengan base URL backend kamu (contoh: http://localhost:5000)
        const response = await axios.get('http://localhost:5000/api/robo-advisor/projection', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setRoboData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal memuat data Robo-Advisor.');
        setLoading(false);
      }
    };

    fetchProjection();
  }, [navigate]);

  // Loading State UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-black"></span>
      </div>
    );
  }

  // Error State UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-red-500 font-bold">{error}</div>
      </div>
    );
  }

  // Penentuan warna dinamis berdasarkan status
  const isSurplus = roboData.status === 'Hijau';
  const statusColor = isSurplus ? 'text-green-600' : (roboData.status === 'Kuning' ? 'text-yellow-500' : 'text-red-500');
  const statusBg = isSurplus ? 'bg-green-50' : (roboData.status === 'Kuning' ? 'bg-yellow-50' : 'bg-red-50');
  const statusBorder = isSurplus ? 'border-green-200' : (roboData.status === 'Kuning' ? 'border-yellow-200' : 'border-red-200');

  // Dummy Pie Data untuk merepresentasikan status warna
  const pieData = [{ name: 'Status', value: 100 }];
  const pieColor = isSurplus ? '#22c55e' : (roboData.status === 'Kuning' ? '#eab308' : '#ef4444');

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
          
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-black leading-tight max-w-sm">
                Kartu Indikator Kondisi Keuangan
              </h2>
              <p className="text-gray-500 mt-4 text-sm leading-relaxed max-w-sm">
                Sistem mendeteksi sisa alokasi uangmu bulan ini dan memberikan rekomendasi yang sesuai.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className={`border ${statusBorder} ${statusBg} rounded-lg p-5 shadow-sm`}>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sisa Uang</span>
                <p className={`text-2xl font-black mt-1 ${statusColor}`}>
                  {formatRupiah(roboData.surplus)}
                </p>
                <span className="text-xs text-gray-400">Bulan Ini</span>
              </div>
              <div className={`border ${statusBorder} ${statusBg} rounded-lg p-5 shadow-sm`}>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</span>
                <p className={`text-xl font-bold mt-1 ${statusColor}`}>
                  {roboData.status}
                </p>
                <span className="text-xs text-gray-500 line-clamp-2 mt-1">{roboData.message}</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-100 shadow-sm p-6 rounded-2xl bg-white w-full h-[350px] flex flex-col items-center justify-center">
            <h3 className="text-sm font-bold text-black self-start">Visualisasi Kondisi</h3>
            <div className="flex-grow w-full h-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={80} outerRadius={110} dataKey="value" stroke="none">
                    <Cell fill={pieColor} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* ================= SECTION 2: TABEL KETERANGAN ALOKASI ================= */}
        {isSurplus && roboData.recommendation && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-4">
            
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-extrabold text-black leading-tight max-w-sm">
                Rekomendasi Instrumen
              </h2>
              <p className="text-gray-500 text-sm">
                Berdasarkan profil risiko dan sisa uangmu, ini adalah alokasi terbaik yang kami sarankan.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 border border-green-100 p-4 rounded-xl shadow-sm bg-green-50">
                <div className="w-16 h-16 bg-green-200 rounded-lg shrink-0 flex items-center justify-center font-bold text-green-700">
                  {roboData.recommendation.expectedReturn.split(' ')[0]}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-black text-sm">{roboData.recommendation.instrument}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {roboData.recommendation.description}
                  </p>
                  <span className="text-xs text-green-600 font-bold mt-2">
                    Estimasi Imbal Hasil: {roboData.recommendation.expectedReturn}
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= SECTION 3: GRAFIK MESIN WAKTU ================= */}
        {isSurplus && roboData.projection.length > 0 && (
          <div className="w-full flex flex-col gap-8 mt-4">
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold text-black">Grafik Simulasi Mesin Waktu</h2>
              <p className="text-gray-500 text-sm max-w-lg mx-auto">
                Simulasi 5 tahun ke depan: <span className="font-bold text-gray-500">Abu-abu (Tabungan Biasa)</span> vs <span className="font-bold text-green-500">Hijau (Investasi Majemuk)</span>.
              </p>
            </div>

            <div className="border border-gray-100 shadow-sm p-6 rounded-2xl bg-white w-full flex flex-col gap-6">
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={roboData.projection} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorInvestasi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorModal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                    <Tooltip 
                      formatter={(value, name) => [formatRupiah(value), name === 'estimasiHasil' ? 'Hasil Investasi' : 'Tabungan Biasa']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    
                    {/* Garis Tabungan Biasa */}
                    <Area 
                      type="monotone" 
                      dataKey="totalModal" 
                      stroke="#9CA3AF" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorModal)" 
                      name="totalModal"
                    />
                    
                    {/* Garis Investasi Compound Interest */}
                    <Area 
                      type="monotone" 
                      dataKey="estimasiHasil" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorInvestasi)" 
                      name="estimasiHasil"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RoboAdvisor;