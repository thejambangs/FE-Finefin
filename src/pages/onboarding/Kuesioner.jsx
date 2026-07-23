// src/pages/Kuesioner.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// ✅ IMPORT TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // ... (useEffect dan fungsi handleInputChange/cleanNumber tetap sama) ...
  useEffect(() => {
    const saved = localStorage.getItem('kuesioner');
    if (saved) {
      const data = JSON.parse(saved);
      setFormData(data.formData || {});
      setCurrentStep(data.currentStep || 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kuesioner', JSON.stringify({ formData, currentStep }));
  }, [formData, currentStep]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNumericInputChange = (field, value) => {
    const digitOnly = value.replace(/[^0-9]/g, ''); 
    const formatted = digitOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    handleInputChange(field, formatted);
  };

  const handleTextOnlyInputChange = (field, value) => {
    const textOnly = value.replace(/[0-9]/g, ''); 
    handleInputChange(field, textOnly);
  };

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
      
      const finalPayload = {
        impian: formData.impian,
        financialProfile: {
          pemasukan: cleanNumber(formData.pemasukan),
          tanggalGajian: cleanNumber(formData.tanggalGajian),
          tagihan: { nama: formData.tagihanNama, nominal: cleanNumber(formData.tagihanNominal) },
          cicilan: formData.cicilanNama ? { nama: formData.cicilanNama, nominal: cleanNumber(formData.cicilanNominal) } : null,
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

      axiosInstance.post('/api/onboarding', finalPayload)
        .then((response) => {
            // ✅ GANTI ALERT JADI TOAST SUKSES
            toast.success(response.data.message || "Kuesioner berhasil disimpan!");

            // 👇 PERBAIKAN: Ubah is_onboarded menjadi isOnboarded, dan set nilainya jadi 'true'
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            localStorage.setItem('isOnboarded', 'true'); 
            localStorage.removeItem('kuesioner');
            
            setTimeout(() => navigate('/dashboard'), 2000);
        })
        .catch((error) => {
            // ✅ GANTI   JADI TOAST ERROR
            const errorMessage = error.response?.data?.message || "Gagal menyimpan kuesioner.";
            toast.error(`Error: ${errorMessage}`);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1); 
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
      {/* ✅ TAMBAHKAN TOAST CONTAINER */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* ... (Isi Panel Kiri dan Kanan tetap sama) ... */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 lg:px-32 xl:px-40 gap-4 bg-white select-none">
        <h1 className="text-6xl font-extrabold text-[#0F172A] tracking-tight">Isi Kuisioner</h1>
        <p className="text-xl font-medium text-[#64748B]">Tentukan jawaban sesuai pengalaman Anda.</p>
      </div>

      <div className="w-1/2 h-full bg-white flex flex-col">
        <form onSubmit={handleNext} className="w-full h-full flex flex-col">
          <div className="flex-grow overflow-y-auto px-16 lg:px-24 xl:px-32 pt-12 pb-6">
             {/* Step components (1-7) tetap sama */}
             <div className="min-h-full flex flex-col justify-center gap-8">
                {currentStep === 1 && <StepIncome formData={formData} handleNumericInputChange={handleNumericInputChange} />}
                {currentStep === 2 && <StepPayday formData={formData} handleInputChange={handleInputChange} />}
                {currentStep === 3 && <StepExpenses formData={formData} handleNumericInputChange={handleNumericInputChange} handleTextOnlyInputChange={handleTextOnlyInputChange} />}
                {currentStep === 4 && <StepYearlyExpense formData={formData} handleNumericInputChange={handleNumericInputChange} handleTextOnlyInputChange={handleTextOnlyInputChange} />}
                {currentStep === 5 && <StepTarget formData={formData} handleNumericInputChange={handleNumericInputChange} />}
                {currentStep === 6 && <StepDream formData={formData} handleNumericInputChange={handleNumericInputChange} handleTextOnlyInputChange={handleTextOnlyInputChange} handleInputChange={handleInputChange} />}
                {currentStep === 7 && <StepRisk formData={formData} handleInputChange={handleInputChange} />}
             </div>
          </div>

          <div className="shrink-0 flex flex-row gap-5 px-16 lg:px-24 xl:px-32 py-6 border-t border-gray-100 bg-white z-20 w-full">
            {currentStep > 1 && (
              <button type="button" onClick={handleBack} disabled={isLoading} className="btn flex-grow rounded-md text-lg h-14 text-[#0F172A] border-[#64748B] bg-white hover:bg-gray-100 font-semibold">
                Kembali
              </button>
            )}
            <button type="submit" disabled={isLoading} className="btn flex-grow rounded-md text-lg h-14 text-white bg-[#7C3AED] hover:bg-[#4C1D95] font-semibold uppercase tracking-wide">
              {isLoading ? 'Mengirim...' : currentStep === 7 ? 'Kirim Kuesioner' : 'Lanjut'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 

export default Kuesioner;