// src/pages/Kuesioner.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Kuesioner = () => {
  const [currentStep, setCurrentStep] = useState(1); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pemasukan: '',
    tanggalGajian: '',
    tagihanNama: '',
    tagihanNominal: '',
    cicilanNama: '',
    cicilanNominal: '',
    targetTabungan: '',
    impian: '', 
    rencanaInvestasi: '',
    tujuanInvestasi: '',
    pengetahuanInvestasi: '',
    reaksiPasar: '',
    alokasiSurplus: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // =========================================================================
  // LOGIKA FE 2: FUNGSI PEMBERSIH ANGKA (Sanitization)
  // Menghapus huruf/simbol dan memastikan output adalah Number murni
  // =========================================================================
  const cleanNumber = (val) => {
    if (!val) return 0;
    const sanitized = val.toString().replace(/[^0-9]/g, ''); // Perbaikan regex agar murni angka 0-9
    return sanitized ? parseInt(sanitized, 10) : 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    if (currentStep < 7) { 
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsLoading(true);

      // =========================================================================
      // LOGIKA FE 2: MODIFIKASI MENGGUNAKAN ARRAY UNTUK RISK PROFILE
      // Ditata menggunakan Array agar BE 2 di Sprint 4 tinggal melakukan looping jumlah skor
      // =========================================================================
      const finalPayload = {
        impian: formData.impian,
        financialProfile: {
          pemasukan: cleanNumber(formData.pemasukan),
          tanggalGajian: cleanNumber(formData.tanggalGajian),
          tagihan: {
            nama: formData.tagihanNama,
            nominal: cleanNumber(formData.tagihanNominal)
          },
          cicilan: formData.cicilanNama ? {
            nama: formData.cicilanNama,
            nominal: cleanNumber(formData.cicilanNominal)
          } : null,
          targetTabungan: cleanNumber(formData.targetTabungan)
        },
        
        // DIUBAH MENJADI ARRAY OF NUMBERS (Tugas FE 2)
        // Berisi kumpulan skor dari pertanyaan 1-5 di Step 7
        riskProfile: [
          cleanNumber(formData.rencanaInvestasi),     // Indeks 0: Jawaban Pertanyaan 1
          cleanNumber(formData.tujuanInvestasi),      // Indeks 1: Jawaban Pertanyaan 2
          cleanNumber(formData.pengetahuanInvestasi), // Indeks 2: Jawaban Pertanyaan 3
          cleanNumber(formData.reaksiPasar),          // Indeks 3: Jawaban Pertanyaan 4
          cleanNumber(formData.alokasiSurplus)        // Indeks 4: Jawaban Pertanyaan 5
        ]
      };

      setTimeout(() => {
        setIsLoading(false);
        alert("Seluruh Kuesioner Berhasil Dikirim!");
        
        // Cek hasilnya di console log browser (F12), properti riskProfile akan berupa array [angka, angka, dst]
        console.log("Data Terstruktur (API-Ready dengan Array):", finalPayload);
        
        navigate('/dashboard'); 
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      
      {/* PANEL KIRI: Statis */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 lg:px-32 xl:px-40 gap-4 bg-white select-none">
        <h1 className="text-6xl font-extrabold text-black tracking-tight">Isi Kuisioner</h1>
        <p className="text-xl font-medium text-gray-500">Tentukan jawaban sesuai pengalaman Anda.</p>
      </div>

      {/* PANEL KANAN */}
      <div className="w-1/2 h-full bg-white flex flex-col">
        
        <form onSubmit={handleNext} className="w-full h-full flex flex-col">
          
          {/* ZONA 1: KHUSUS KONTEN PERTANYAAN */}
          <div className="flex-grow overflow-y-auto px-16 lg:px-24 xl:px-32 pt-12 pb-6">
            <div className="min-h-full flex flex-col justify-center gap-8">
              
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-black">1. Berapa rata-rata pemasukan bersihmu setiap bulannya?</h2>
                  <input 
                    type="text" required placeholder="Rpxxx.xxx.xxx" 
                    value={formData.pemasukan} onChange={(e) => handleInputChange('pemasukan', e.target.value)}
                    className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
                  />
                  <p className="text-sm text-gray-400">Bisa diisi dari gaji tetap, uang saku, atau rata-rata fee proyek freelance tiap bulan</p>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-black">2. Setiap tanggal berapa biasanya siklus keuanganmu dimulai (Tanggal Gajian)?</h2>
                  <select 
                    required value={formData.tanggalGajian} onChange={(e) => handleInputChange('tanggalGajian', e.target.value)}
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

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-black">3. Yuk, catat tagihan bulanan yang nominalnya pasti dan wajib dibayar!</h2>
                  <input 
                    type="text" required placeholder="Nama Pengeluaran: misal, Bayar Kosan / Token Listrik" 
                    value={formData.tagihanNama} onChange={(e) => handleInputChange('tagihanNama', e.target.value)}
                    className="input input-bordered w-full rounded-md border-gray-300 h-14 text-base text-black bg-white focus:border-black focus:ring-0 mb-2"
                  />
                  <input 
                    type="text" required placeholder="Nominal: Rpxxx.xxx.xxx" 
                    value={formData.tagihanNominal} onChange={(e) => handleInputChange('tagihanNominal', e.target.value)}
                    className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
                  />
                </div>
              )}

              {/* Step 4 */}
              {currentStep === 4 && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-black">4. Ada pengeluaran besar tahunan yang mau dicicil dari sekarang? (Opsional)</h2>
                  <input 
                    type="text" placeholder="Nama Pengeluaran: misal, UKT Kampus / Pajak Kendaraan" 
                    value={formData.cicilanNama} onChange={(e) => handleInputChange('cicilanNama', e.target.value)}
                    className="input input-bordered w-full rounded-md border-gray-300 h-14 text-base text-black bg-white focus:border-black focus:ring-0 mb-2"
                  />
                  <input 
                    type="text" placeholder="Nominal: Rpxxx.xxx.xxx" 
                    value={formData.cicilanNominal} onChange={(e) => handleInputChange('cicilanNominal', e.target.value)}
                    className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
                  />
                </div>
              )}

              {/* Step 5 */}
              {currentStep === 5 && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-black">5. Berapa target minimal yang ingin kamu sisihkan untuk ditabung/investasi setiap bulannya?</h2>
                  <input 
                    type="text" required placeholder="Rpxxx.xxx.xxx" 
                    value={formData.targetTabungan} onChange={(e) => handleInputChange('targetTabungan', e.target.value)}
                    className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
                  />
                </div>
              )}

              {/* Step 6 */}
              {currentStep === 6 && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-black">6. Apa satu impian atau barang yang ingin kamu capai/beli dalam waktu dekat?</h2>
                  <input 
                    type="text" required placeholder="Input Teks: misal, Beli Laptop Baru, Rakit PC" 
                    value={formData.impian} onChange={(e) => handleInputChange('impian', e.target.value)}
                    className="input input-bordered w-full rounded-md border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
                  />
                  <p className="text-sm text-gray-400">Target ini akan dipajang di Dasbor utamamu sebagai penyemangat!</p>
                </div>
              )}

              {/* Step 7: Profil Risiko */}
              {currentStep === 7 && (
                <div className="flex flex-col gap-8 animate-fadeIn text-black pb-2">
                  {/* No 1 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-base">1. Berapa lama rencana Anda untuk menyimpan dana investasi ini sebelum dicairkan?</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" required name="risk1" className="radio radio-sm border-gray-400 animate-none" checked={formData.rencanaInvestasi === '1'} onChange={() => handleInputChange('rencanaInvestasi', '1')} />
                        <span>A. Kurang dari 1 tahun (Saya butuh uangnya dalam waktu dekat). (Poin 1)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk1" className="radio radio-sm border-gray-400 animate-none" checked={formData.rencanaInvestasi === '2'} onChange={() => handleInputChange('rencanaInvestasi', '2')} />
                        <span>B. 1 hingga 3 tahun (Untuk rencana jangka menengah). (Poin 2)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk1" className="radio radio-sm border-gray-400 animate-none" checked={formData.rencanaInvestasi === '3'} onChange={() => handleInputChange('rencanaInvestasi', '3')} />
                        <span>C. Lebih dari 3 tahun (Untuk jangka panjang). (Poin 3)</span>
                      </label>
                    </div>
                  </div>

                  {/* No 2 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-base">2. Apa tujuan utama Anda dalam berinvestasi?</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" required name="risk2" className="radio radio-sm border-gray-400 animate-none" checked={formData.tujuanInvestasi === '1'} onChange={() => handleInputChange('tujuanInvestasi', '1')} />
                        <span>A. Mengamankan uang dari inflasi, yang penting uang saya tidak berkurang. (Poin 1)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk2" className="radio radio-sm border-gray-400 animate-none" checked={formData.tujuanInvestasi === '2'} onChange={() => handleInputChange('tujuanInvestasi', '2')} />
                        <span>B. Mendapatkan pertumbuhan yang stabil dan rutin, meskipun keuntungannya tidak terlalu besar. (Poin 2)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk2" className="radio radio-sm border-gray-400 animate-none" checked={formData.tujuanInvestasi === '3'} onChange={() => handleInputChange('tujuanInvestasi', '3')} />
                        <span>C. Mendapatkan keuntungan sebesar-besarnya, saya siap jika nilainya naik-turun secara drastis. (Poin 3)</span>
                      </label>
                    </div>
                  </div>

                  {/* No 3 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-base">3. Seberapa jauh pengetahuan Anda tentang instrumen investasi?</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" required name="risk3" className="radio radio-sm border-gray-400 animate-none" checked={formData.pengetahuanInvestasi === '1'} onChange={() => handleInputChange('pengetahuanInvestasi', '1')} />
                        <span>A. Pemula, saya hanya tahu tabungan bank atau deposito. (Poin 1)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk3" className="radio radio-sm border-gray-400 animate-none" checked={formData.pengetahuanInvestasi === '2'} onChange={() => handleInputChange('pengetahuanInvestasi', '2')} />
                        <span>B. Menengah, saya cukup paham cara kerja instrumen seperti reksa dana atau obligasi pemerintah. (Poin 2)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk3" className="radio radio-sm border-gray-400 animate-none" checked={formData.pengetahuanInvestasi === '3'} onChange={() => handleInputChange('pengetahuanInvestasi', '3')} />
                        <span>C. Mahir, saya sudah terbiasa dengan instrumen berisiko tinggi seperti saham atau kripto. (Poin 3)</span>
                      </label>
                    </div>
                  </div>

                  {/* No 4 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-base">4. Jika nilai portofolio investasi Anda tiba-tiba turun 15% dalam sebulan, apa yang akan Anda lakukan?</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" required name="risk4" className="radio radio-sm border-gray-400 animate-none" checked={formData.reaksiPasar === '1'} onChange={() => handleInputChange('reaksiPasar', '1')} />
                        <span>A. Panik dan segera mencairkan seluruh dana agar tidak rugi lebih banyak. (Poin 1)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk4" className="radio radio-sm border-gray-400 animate-none" checked={formData.reaksiPasar === '2'} onChange={() => handleInputChange('reaksiPasar', '2')} />
                        <span>B. Membiarkannya saja sambil memantau berita, karena saya yakin akan naik lagi. (Poin 2)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk4" className="radio radio-sm border-gray-400 animate-none" checked={formData.reaksiPasar === '3'} onChange={() => handleInputChange('reaksiPasar', '3')} />
                        <span>C. Menambah modal investasi (buy the dip) karena menganggap ini kesempatan membeli murah. (Poin 3)</span>
                      </label>
                    </div>
                  </div>

                  {/* No 5 */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-base">5. Dari sisa uang (surplus) yang Anda miliki setiap bulannya, berapa persen yang bersedia Anda alokasikan untuk investasi yang berisiko?</h3>
                    <div className="flex flex-col gap-2 pl-2">
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" required name="risk5" className="radio radio-sm border-gray-400 animate-none" checked={formData.alokasiSurplus === '1'} onChange={() => handleInputChange('alokasiSurplus', '1')} />
                        <span>A. Kurang dari 20%, sebagian besar tetap saya simpan di tabungan biasa. (Poin 1)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk5" className="radio radio-sm border-gray-400 animate-none" checked={formData.alokasiSurplus === '2'} onChange={() => handleInputChange('alokasiSurplus', '2')} />
                        <span>B. Sekitar 20% - 50%. (Poin 2)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer text-sm font-medium">
                        <input type="radio" name="risk5" className="radio radio-sm border-gray-400 animate-none" checked={formData.alokasiSurplus === '3'} onChange={() => handleInputChange('alokasiSurplus', '3')} />
                        <span>C. Lebih dari 50%, saya siap memaksimalkan sisa uang untuk diputar kembali. (Poin 3)</span>
                      </label>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>

          {/* ZONA 2: AREA TOMBOL NAVIGASI STATIS */}
          <div className="shrink-0 flex flex-row gap-5 px-16 lg:px-24 xl:px-32 py-6 border-t border-gray-100 bg-white z-20 w-full">
            <button 
              type="button" onClick={handleBack} disabled={isLoading}
              className="btn flex-grow rounded-md text-lg h-14 text-black border-gray-300 bg-white hover:bg-gray-100 font-semibold disabled:opacity-50"
            >
              {currentStep === 1 ? 'Simpan Draf' : 'Kembali'}
            </button>

            <button 
              type="submit" disabled={isLoading}
              className="btn flex-grow rounded-md text-lg h-14 text-white bg-black hover:bg-neutral-800 font-semibold uppercase tracking-wide"
            >
              {isLoading && <span className="loading loading-spinner text-neutral-400"></span>}
              {isLoading ? 'Mengirim...' : currentStep === 7 ? 'Kirim Kuesioner' : 'Lanjut'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Kuesioner;