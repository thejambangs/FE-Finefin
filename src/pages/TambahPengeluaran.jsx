// src/pages/AddTransaction.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTransaction = () => {
  const navigate = useNavigate();
  
  // State untuk menampung data form
  const [formData, setFormData] = useState({
    namaPengeluaran: '',
    totalPengeluaran: '',
    kategori: '',
    metodePembayaran: '',
    tanggal: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimpan = (e) => {
    e.preventDefault();
    console.log("Data Transaksi Disimpan:", formData);
    alert("Transaksi berhasil ditambahkan!");
    navigate('/dashboard'); // Kembali ke dasbor setelah simpan
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral font-sans flex flex-col items-center">
      
      {/* ================= HEADER (Konsisten dengan Dashboard) ================= */}
      <div className="navbar bg-white border-b border-gray-100 px-4 md:px-8 w-full shrink-0">
        <div className="flex-1">
          <a href="/dashboard" className="text-3xl font-black text-black tracking-tighter uppercase select-none">
            FineFin
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-6 text-lg font-semibold">
            <li><a href="/dashboard" className="text-black border-b-2 border-black rounded-none px-1 pb-2 pt-2 bg-transparent">Pengeluaran</a></li>
            <li><a href="/robo-advisor" className="text-gray-400 hover:text-black rounded-none px-1 pb-2 pt-2 bg-transparent">Robo-Advisor</a></li>
          </ul>
        </div>
        <div className="flex-none ml-8 flex items-center gap-4">
          <div className="form-control">
            <input type="text" placeholder="Search in site" className="input input-bordered input-sm rounded-full w-48 bg-white text-black" />
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* ================= KONTEN FORM ================= */}
      <div className="w-full max-w-4xl px-6 py-12 flex flex-col gap-10 mt-8">
        
        {/* Judul Halaman */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-black">Tambahkan Pengeluaran</h1>
          <p className="text-lg text-gray-600">Catat pengeluaran dalam hitungan detik—dasbor Anda akan langsung diperbarui.</p>
        </div>

        <form onSubmit={handleSimpan} className="flex flex-col gap-8 w-full">
          
          {/* BARIS 1: Nama Pengeluaran (Full Width) */}
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text font-bold text-black text-base">Nama Pengeluaran</span></div>
            <input 
              type="text" 
              name="namaPengeluaran"
              placeholder="Contoh: Makan Siang, Bensin" 
              value={formData.namaPengeluaran}
              onChange={handleInputChange}
              required
              className="input input-bordered w-full rounded-md border-gray-300 bg-white text-black focus:border-black focus:ring-0" 
            />
            <div className="label pt-1"><span className="label-text-alt text-gray-400">Tuliskan deskripsi singkat pengeluaran Anda.</span></div>
          </label>

          {/* GRID BARIS 2 & 3: Dibagi 2 Kolom Kiri-Kanan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Kiri: Total Pengeluaran (Dengan Prefix Rp) */}
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-base">Total Pengeluaran</span></div>
              {/* Trik DaisyUI: input wrapper dengan flex agar Rp statis di dalam kotak */}
              <div className="input input-bordered flex items-center gap-2 rounded-md border-gray-300 bg-white focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                <span className="font-bold text-gray-500">Rp</span>
                <input 
                  type="number" 
                  name="totalPengeluaran"
                  placeholder="0"
                  value={formData.totalPengeluaran}
                  onChange={handleInputChange}
                  required
                  className="grow bg-transparent text-black border-none focus:outline-none focus:ring-0" 
                />
              </div>
              <div className="label pt-1"><span className="label-text-alt text-gray-400">Gunakan angka bulat tanpa titik.</span></div>
            </label>

            {/* Kanan: Kategori (Text Biasa) */}
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-base">Kategori</span></div>
              <input 
                type="text" 
                name="kategori"
                placeholder="Makanan & Minuman" 
                value={formData.kategori}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full rounded-md border-gray-300 bg-white text-black focus:border-black focus:ring-0" 
              />
              <div className="label pt-1"><span className="label-text-alt text-gray-400">Tuliskan kategori yang paling sesuai.</span></div>
            </label>

            {/* Kiri: Metode Pembayaran (Dropdown/Select) */}
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-base">Metode Pembayaran</span></div>
              <select 
                name="metodePembayaran"
                value={formData.metodePembayaran}
                onChange={handleInputChange}
                required
                className="select select-bordered w-full rounded-md border-gray-300 bg-white text-black focus:border-black focus:ring-0"
              >
                <option value="" disabled>Pilih metode...</option>
                <option value="Cashless">💳 Cashless (Qris/Transfer)</option>
                <option value="Cash">💵 Cash (Tunai)</option>
              </select>
              <div className="label pt-1"><span className="label-text-alt text-gray-400">Membantu meningkatkan akurasi pelaporan.</span></div>
            </label>

            {/* Kanan: Tanggal (Date Picker) */}
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-base">Tanggal</span></div>
              <input 
                type="date" 
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full rounded-md border-gray-300 bg-white text-black focus:border-black focus:ring-0" 
              />
              <div className="label pt-1"><span className="label-text-alt text-gray-400">Hanya berlaku untuk tanggal mundur jika diperlukan.</span></div>
            </label>

          </div>

          {/* ================= TOMBOL AKSI ================= */}
          <div className="flex flex-row justify-center gap-6 mt-8 w-full max-w-md mx-auto">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')}
              className="btn flex-grow rounded-md text-lg h-14 bg-white text-black border border-black hover:bg-gray-100 font-bold"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="btn flex-grow rounded-md text-lg h-14 bg-black text-white hover:bg-neutral-800 font-bold border-none"
            >
              Simpan
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddTransaction;