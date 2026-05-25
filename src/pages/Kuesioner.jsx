// src/pages/Kuesioner.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. LOGIKA FE 2: Import untuk navigasi menuju dashboard

const Kuesioner = () => {
  // === LOGIKA FE 2: STATE UNTUK MENGONTROL STEP & DATA ===
  const [currentStep, setCurrentStep] = useState(1); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // <-- 2. LOGIKA FE 2: Inisialisasi fungsi navigasi

  // State untuk menampung seluruh jawaban user
  const [formData, setFormData] = useState({
    pemasukan: '',
    tanggalGajian: '',
    tagihanNama: '',
    tagihanNominal: '',
    cicilanNama: '',
    cicilanNominal: '',
    targetTabungan: '',
    impian: '', 
  });

  // Fungsi memperbarui data jawaban saat user mengetik
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Fungsi kendali tombol "Kirim Jawaban" / Next Step
  const handleNext = (e) => {
    e.preventDefault();
    
    if (currentStep < 6) { 
      // Jika belum sampai nomor terakhir, naikkan step (ke halaman berikutnya)
      setCurrentStep((prev) => prev + 1);
    } else {
      // === 3. LOGIKA FE 2: REDIRECT KE DASHBOARD DI STEP TERAKHIR ===
      setIsLoading(true); // Aktifkan spinner DaisyUI
      
      // Simulasi pengiriman data kuesioner ke API backend selama 2 detik
      setTimeout(() => {
        setIsLoading(false); // Matikan spinner
        
        // Lempar user secara otomatis ke halaman Dashboard yang sudah kita buat tadi
        navigate('/dashboard'); 
      }, 2000);
    }
  };

  // Fungsi kendali tombol "Simpan Draf" / Back Step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    // CONTAINER UTAMA (Split Screen 50:50 yang konsisten)
    <div className="flex h-screen w-full bg-white">
      
      {/* PANEL KIRI (Tetap diam, tidak berubah saat step berganti) */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 lg:px-32 xl:px-40 gap-4 bg-white">
        <h1 className="text-6xl font-extrabold text-black tracking-tight">Isi Kuisioner</h1>
        <p className="text-xl font-medium text-gray-500">Tentukan jawaban sesuai pengalaman Anda.</p>
      </div>

      {/* PANEL KANAN (Isinya berubah secara dinamis berdasarkan nilai currentStep) */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 lg:px-24 xl:px-32 bg-white">
        
        <form onSubmit={handleNext} className="w-full flex flex-col gap-8">
          
          {/* ================= PERTANYAAN NOMOR 1 ================= */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-black">1. Berapa rata-rata pemasukan bersihmu setiap bulannya?</h2>
              <input 
                type="text" 
                placeholder="Rpxxx.xxx.xxx" 
                value={formData.pemasukan}
                onChange={(e) => handleInputChange('pemasukan', e.target.value)}
                className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
              />
              <p className="text-sm text-gray-400">Bisa diisi dari gaji tetap, uang saku, atau rata-rata fee proyek freelance tiap bulan</p>
            </div>
          )}

          {/* ================= PERTANYAAN NOMOR 2 ================= */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-black">2. Setiap tanggal berapa biasanya siklus keuanganmu dimulai (Tanggal Gajian)?</h2>
              <select 
                value={formData.tanggalGajian}
                onChange={(e) => handleInputChange('tanggalGajian', e.target.value)}
                className="select select-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
              >
                <option value="">1-31 (dropdown)</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Tanggal {i + 1}</option>
                ))}
              </select>
              <p className="text-sm text-gray-400">Sistem akan me-reset perhitungan kas bulananmu setiap tanggal ini</p>
            </div>
          )}

          {/* ================= PERTANYAAN NOMOR 3 ================= */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-black">3. Yuk, catat tagihan bulanan yang nominalnya pasti dan wajib dibayar!</h2>
              <input 
                type="text" 
                placeholder="Nama Pengeluaran: misal, Bayar Kosan / Token Listrik / Kuota Internet" 
                value={formData.tagihanNama}
                onChange={(e) => handleInputChange('tagihanNama', e.target.value)}
                className="input input-bordered w-full rounded-md border-gray-300 h-14 text-base text-black bg-white focus:border-black focus:ring-0 mb-2"
              />
              <input 
                type="text" 
                placeholder="Nominal: Rpxxx.xxx.xxx" 
                value={formData.tagihanNominal}
                onChange={(e) => handleInputChange('tagihanNominal', e.target.value)}
                className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
              />
            </div>
          )}

          {/* ================= PERTANYAAN NOMOR 4 ================= */}
          {currentStep === 4 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-black">4. Ada pengeluaran besar tahunan yang mau dicicil dari sekarang? (Opsional)</h2>
              <input 
                type="text" 
                placeholder="Nama Pengeluaran: misal, UKT Kampus / Pajak Kendaraan / Qurban" 
                value={formData.cicilanNama}
                onChange={(e) => handleInputChange('cicilanNama', e.target.value)}
                className="input input-bordered w-full rounded-md border-gray-300 h-14 text-base text-black bg-white focus:border-black focus:ring-0 mb-2"
              />
              <input 
                type="text" 
                placeholder="Nominal: Rpxxx.xxx.xxx" 
                value={formData.cicilanNominal}
                onChange={(e) => handleInputChange('cicilanNominal', e.target.value)}
                className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
              />
            </div>
          )}

          {/* ================= PERTANYAAN NOMOR 5 ================= */}
          {currentStep === 5 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-black">5. Berapa target minimal yang ingin kamu sisihkan untuk ditabung/investasi setiap bulannya?</h2>
              <input 
                type="text" 
                placeholder="Rpxxx.xxx.xxx" 
                value={formData.targetTabungan}
                onChange={(e) => handleInputChange('targetTabungan', e.target.value)}
                className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
              />
            </div>
          )}

          {/* ================= PERTANYAAN NOMOR 6 ================= */}
          {currentStep === 6 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-black">6. Apa satu impian atau barang yang ingin kamu capai/beli dalam waktu dekat?</h2>
              <input 
                type="text" 
                placeholder="Input Teks: misal, Beli Laptop Baru, Rakit PC, atau Dana Darurat" 
                value={formData.impian}
                onChange={(e) => handleInputChange('impian', e.target.value)}
                className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
              />
              <p className="text-sm text-gray-400">Target ini akan dipajang di Dasbor utamamu sebagai penyemangat!</p>
            </div>
          )}

          {/* === TOMBOL NAVIGASI KUESIONER === */}
          <div className="flex flex-row gap-5 mt-4">
            {/* Tombol Kembali / Simpan Draf */}
            <button 
              type="button"
              onClick={handleBack}
              disabled={isLoading}
              className="btn flex-grow rounded-md text-lg h-14 text-black border-gray-300 bg-white hover:bg-gray-100 font-semibold"
            >
              {currentStep === 1 ? 'Simpan Draf' : 'Kembali'}
            </button>

            {/* Tombol Kirim Jawaban (Dinamis: Di step 6 akan memicu pemindahan ke /dashboard) */}
            <button 
              type="submit"
              disabled={isLoading}
              className="btn flex-grow rounded-md text-lg h-14 text-white bg-black hover:bg-neutral-800 font-semibold uppercase tracking-wide"
            >
              {isLoading && <span className="loading loading-spinner text-neutral-400"></span>}
              {isLoading ? 'Mengirim...' : 'Kirim Jawaban'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Kuesioner;