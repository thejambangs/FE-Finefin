// src/pages/Kuesioner.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepIncome from './components/StepIncome';
import StepPayday from './components/StepPayday';
import StepExpenses from './components/StepExpenses';
import StepYearlyExpense from './components/StepYearlyExpense';
import StepTarget from './components/StepTarget';
import StepDream from './components/StepDream';
import StepRisk from './components/StepRisk';
import axiosInstance from '../../Utils/axiosInstance';

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

  useEffect(() => {
  const saved = localStorage.getItem('kuesioner');

  if (saved) {
    const data = JSON.parse(saved);

    setFormData(data.formData || {});
    setCurrentStep(data.currentStep || 1);
  }
}, []);

useEffect(() => {
  const data = {
    formData,
    currentStep,
  };

  localStorage.setItem(
    'kuesioner',
    JSON.stringify(data)
  );
}, [formData, currentStep]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // =========================================================================
  // LOGIKA FE 2: VALIDASI REAL-TIME & FORMATTING RIBUAN (AUTO-FORMAT)
  // =========================================================================
  
  // Fungsi khusus kolom NOMINAL (Blokir huruf + Otomatis tambah titik ribuan)
  const handleNumericInputChange = (field, value) => {
    // 1. Hapus semua karakter yang bukan angka
    const digitOnly = value.replace(/[^0-9]/g, ''); 
    
    // 2. Tambahkan titik setiap 3 digit angka (Format Rupiah)
    const formatted = digitOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    handleInputChange(field, formatted);
  };

  // Fungsi khusus kolom NAMA/TEKS (Memblokir dan menghapus angka)
  const handleTextOnlyInputChange = (field, value) => {
    const textOnly = value.replace(/[0-9]/g, ''); 
    handleInputChange(field, textOnly);
  };

  // Bersihkan titik pemisah ribuan sebelum diubah menjadi Integer murni untuk BE
  const cleanNumber = (val) => {
    if (!val) return 0;
    const sanitized = val.toString().replace(/[^0-9]/g, ''); 
    return sanitized ? parseInt(sanitized, 10) : 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    if (currentStep < 7) { 
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsLoading(true);

      // =========================================================================
      // LOGIKA FE 2: RESTRUKTURISASI DATA MENGGUNAKAN ARRAY UNTUK BACKEND
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
        
        riskProfile: [
          cleanNumber(formData.rencanaInvestasi),     
          cleanNumber(formData.tujuanInvestasi),      
          cleanNumber(formData.pengetahuanInvestasi), 
          cleanNumber(formData.reaksiPasar),          
          cleanNumber(formData.alokasiSurplus)        
        ]
      };

      axiosInstance.post('/onboarding', finalPayload)
        .then((response) => {
            alert(response.data.message); // Akan memunculkan "Kuesioner berhasil! Profil risiko Anda: ..."
            
            // Hapus draf kuesioner jika berhasil
            localStorage.removeItem('kuesioner');
            // Tandai user sudah onboard
            localStorage.setItem('is_onboarded', 'true');
            
            navigate('/dashboard');
        })
        .catch((error) => {
            console.error("Gagal dikirim:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Gagal menyimpan kuesioner.");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1); 
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
                <StepIncome
                  formData={formData}
                  handleNumericInputChange={
                    handleNumericInputChange
                  }
                />
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <StepPayday
                  formData={formData}
                  handleInputChange={
                    handleInputChange
                  }
                />
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
               <StepExpenses
                  formData={formData}
                  handleNumericInputChange={
                    handleNumericInputChange
                  }
                  handleTextOnlyInputChange={
                    handleTextOnlyInputChange
                  }
                />
              )}

              {/* Step 4 */}
              {currentStep === 4 && (
                <StepYearlyExpense
                  formData={formData}
                  handleNumericInputChange={
                    handleNumericInputChange
                  }
                  handleTextOnlyInputChange={
                    handleTextOnlyInputChange
                  }
                />
              )}

              {/* Step 5 */}
              {currentStep === 5 && (
                <StepTarget
                  formData={formData}
                  handleNumericInputChange={
                    handleNumericInputChange
                  }
                />
              )}

              {/* Step 6 */}
              {currentStep === 6 && (
               <StepDream
                  formData={formData}
                  handleNumericInputChange={
                    handleNumericInputChange
                  }
                  handleTextOnlyInputChange={
                    handleTextOnlyInputChange
                  }
                  handleInputChange={
                    handleInputChange
                  }
                />
              )}

              {/* Step 7: Profil Risiko */}
              {currentStep === 7 && (
                <StepRisk
                  formData={formData}
                  handleInputChange={
                    handleInputChange
                  }
                />
              )}

            </div>
          </div>

          {/* ZONA 2: AREA TOMBOL NAVIGASI STATIS */}
          <div className="shrink-0 flex flex-row gap-5 px-16 lg:px-24 xl:px-32 py-6 border-t border-gray-100 bg-white z-20 w-full">
            {/* FIX LENGKAP: Menggunakan currentStep > 1 agar tombol kiri tersembunyi total di Step 1 */}
            {currentStep > 1 && (
              <button 
                type="button" onClick={handleBack} disabled={isLoading}
                className="btn flex-grow rounded-md text-lg h-14 text-black border-gray-300 bg-white hover:bg-gray-100 font-semibold disabled:opacity-50"
              >
                Kembali
              </button>
            )}

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