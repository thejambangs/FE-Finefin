// src/pages/TambahPengeluaran.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTransaction = () => {
  const navigate = useNavigate();
  
  // 1. STATE FORM
  const [formData, setFormData] = useState({
    namaPengeluaran: '',
    totalPengeluaran: '',
    kategori: '',
    metodePembayaran: '',
    tanggal: ''
  });

  // 2. STATE BARU UNTUK TABEL (Menampung daftar transaksi)
  const [transactions, setTransactions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'totalPengeluaran') {
      let cleanValue = value.replace(/[^0-9]/g, '');
      if (cleanValue.length > 1 && cleanValue.startsWith('0')) cleanValue = cleanValue.replace(/^0+/, '');
      const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    
    // VALIDASI FORM
    if (!formData.namaPengeluaran.trim()) {
      toast.error("Nama pengeluaran tidak boleh kosong!");
      return;
    }
    if (!formData.kategori) {
      toast.warning("Silakan pilih kategori!");
      return;
    }
    if (!formData.totalPengeluaran || parseInt(formData.totalPengeluaran.replace(/\./g, '')) <= 0) {
      toast.error("Total pengeluaran harus lebih dari 0!");
      return;
    }
    if (!formData.metodePembayaran) {
      toast.warning("Silakan pilih metode pembayaran!");
      return;
    }
    if (!formData.tanggal) {
      toast.warning("Silakan pilih tanggal!");
      return;
    }

    try {
      const rawNominal = formData.totalPengeluaran.replace(/\./g, '');
      const dataPayload = {
        ...formData,
        totalPengeluaran: parseInt(rawNominal, 10)
      };

      // Tembak API (Opsional, pastikan backend siap)
      // await axiosInstance.post('/transaction', dataPayload);

      // 3. MASUKKAN DATA KE DALAM STATE TABEL
      // Kita tambahkan ID unik (sementara pakai Date.now) agar React tidak error saat di-map
      const newTransaction = {
        id: Date.now(),
        ...formData,
        totalPengeluaran: parseInt(rawNominal, 10)
      };
      
      // Update array transactions dengan menambahkan data baru di akhir (append)
      setTransactions((prev) => [...prev, newTransaction]);

      // Munculkan Notifikasi
      toast.success("Transaksi berhasil ditambahkan!");
      
      // Kosongkan form kembali setelah sukses agar user bisa input data baru
      setFormData({
        namaPengeluaran: '',
        totalPengeluaran: '',
        kategori: '',
        metodePembayaran: '',
        tanggal: ''
      });

      // CATATAN: navigate() dinonaktifkan agar user tetap di halaman ini dan bisa melihat tabelnya bertambah
      // setTimeout(() => navigate('/dashboard'), 2000);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan server.";
      toast.error(`Gagal: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral font-sans flex flex-col items-center pb-20">
      
      {/* TOAST CONTAINER */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ================= HEADER ================= */}
      <div className="navbar bg-white border-b border-gray-100 px-4 md:px-8 w-full shrink-0">
        <div className="flex-1">
          <Link to="/dashboard" className="text-3xl font-black text-black tracking-tighter uppercase select-none">
            FineFin
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-6 text-lg font-semibold">
            <li><Link to="/pengeluaran" className="text-black border-b-2 border-black rounded-none px-1 pb-2 pt-2 bg-transparent">Pengeluaran</Link></li>
            <li><Link to="/robo-advisor" className="text-gray-400 hover:text-black rounded-none px-1 pb-2 pt-2 bg-transparent">Robo-Advisor</Link></li>
          </ul>
        </div>
        <div className="flex-none ml-8 flex items-center gap-4">
          <div className="form-control">
            <input type="text" placeholder="Search in site" className="input border-gray-200 focus:outline-none focus:border-gray-300 input-sm rounded-full w-48 bg-white text-black" />
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* ================= KONTEN FORM ATAS ================= */}
      <div className="w-full max-w-5xl px-6 py-12 flex flex-col gap-10 mt-2">
        
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-black">Tambahkan Pengeluaran</h1>
          <p className="text-base text-gray-600">Catat pengeluaran dalam hitungan detik—dasbor Anda akan langsung diperbarui.</p>
        </div>

        <form onSubmit={handleSimpan} className="flex flex-col gap-6 w-full">
          
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Nama Pengeluaran</span></div>
            <input 
              type="text" 
              name="namaPengeluaran"
              placeholder="Makanan" 
              value={formData.namaPengeluaran}
              onChange={handleInputChange}
              className="input input-bordered w-full rounded-md border-gray-200 bg-white text-black focus:outline-none focus:border-gray-400" 
            />
            <div className="label pt-1"><span className="label-text-alt text-gray-400">Text</span></div>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Total Pengeluaran</span></div>
              <div className="input input-bordered flex items-center gap-2 rounded-md border-gray-200 bg-white focus-within:border-gray-400">
                <span className="text-gray-500">Rp.</span>
                <input 
                  type="text" 
                  name="totalPengeluaran"
                  placeholder="xxxxxxxxx"
                  value={formData.totalPengeluaran}
                  onChange={handleInputChange}
                  className="grow bg-transparent text-black border-none focus:outline-none focus:ring-0" 
                />
              </div>
              <div className="label pt-1"><span className="label-text-alt text-gray-400">Gunakan angka desimal jika diperlukan.</span></div>
            </label>

            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Kategori</span></div>
              <input 
                type="text" 
                name="kategori"
                placeholder="Makanan & Minuman" 
                value={formData.kategori}
                onChange={handleInputChange}
                className="input input-bordered w-full rounded-md border-gray-200 bg-white text-black focus:outline-none focus:border-gray-400" 
              />
              <div className="label pt-1"><span className="label-text-alt text-gray-400">Pilih yang paling sesuai.</span></div>
            </label>

            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Metode Pembayaran</span></div>
              <select 
                name="metodePembayaran"
                value={formData.metodePembayaran}
                onChange={handleInputChange}
                className="select select-bordered w-full rounded-md border-gray-200 bg-white text-gray-500 focus:outline-none focus:border-gray-400 font-normal"
              >
                <option value="" disabled>Visa •••• 1234</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="Gopay">Gopay</option>
                <option value="Tunai">Tunai</option>
              </select>
              <div className="label pt-1"><span className="label-text-alt text-gray-400">Membantu meningkatkan akurasi pelaporan.</span></div>
            </label>

            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Tanggal</span></div>
              <input 
                type="date" 
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                className="input input-bordered w-full rounded-md border-gray-200 bg-white text-gray-500 focus:outline-none focus:border-gray-400" 
              />
              <div className="label pt-1"><span className="label-text-alt text-gray-400">Hanya berlaku untuk tanggal mundur jika diperlukan.</span></div>
            </label>

          </div>

          {/* TOMBOL AKSI */}
          <div className="flex flex-row justify-center gap-4 mt-6 w-full max-w-sm mx-auto">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')}
              className="btn flex-1 rounded-md text-sm bg-white text-black border border-black hover:bg-gray-50 font-semibold"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="btn flex-1 rounded-md text-sm bg-black text-white hover:bg-neutral-800 font-semibold border-none"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>

      {/* ================= GARIS PEMBATAS ================= */}
      <div className="w-full max-w-5xl px-6 my-6">
        <hr className="border-gray-100" />
      </div>

      {/* ================= KONTEN TABEL BAWAH ================= */}
      <div className="w-full max-w-5xl px-6">
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="table w-full text-black">
              {/* Header Tabel */}
              <thead className="bg-white border-b border-gray-200 text-black font-bold">
                <tr>
                  <th className="bg-transparent py-4 pl-6">No</th>
                  <th className="bg-transparent py-4">Tanggal</th>
                  <th className="bg-transparent py-4">Nama Pengeluaran</th>
                  <th className="bg-transparent py-4">Total Pengeluaran</th>
                  <th className="bg-transparent py-4">Kategori</th>
                  <th className="bg-transparent py-4">Metode Pembayaran</th>
                  <th className="bg-transparent py-4 text-center pr-6">Aksi</th>
                </tr>
              </thead>
              
              {/* Body Tabel */}
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-gray-400">
                      Belum ada transaksi. Silakan input pengeluaran di atas.
                    </td>
                  </tr>
                ) : (
                  // Melakukan perulangan (map) data dari state transactions
                  transactions.map((trx, index) => (
                    <tr key={trx.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="pl-6">{index + 1}</td>
                      <td>{trx.tanggal.split('-').reverse().join('/')} {/* Mengubah format YYYY-MM-DD jadi DD/MM/YYYY */}</td>
                      <td className="font-medium">{trx.namaPengeluaran}</td>
                      <td>Rp. {trx.totalPengeluaran.toLocaleString('id-ID')}</td>
                      <td>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold">
                          {trx.kategori}
                        </span>
                      </td>
                      <td>{trx.metodePembayaran}</td>
                      <td className="flex justify-center gap-4 pr-6 py-4">
                        {/* Ikon Edit (Pensil Biru) */}
                        <button className="text-blue-500 hover:text-blue-700 transition-colors" title="Edit">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        {/* Ikon Hapus (Tong Sampah Merah) */}
                        <button className="text-red-500 hover:text-red-700 transition-colors" title="Hapus">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AddTransaction;