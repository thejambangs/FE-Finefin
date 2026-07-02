// src/pages/AddTransaction.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; 
// 1. IMPORT TOAST
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaPengeluaran: '',
    totalPengeluaran: '',
    kategori: '',
    metodePembayaran: '',
    tanggal: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // ... (Logika regex tetap sama)
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
    
    // 2. VALIDASI FORM (Sesuai saran reviewer)
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

    try {
      const rawNominal = formData.totalPengeluaran.replace(/\./g, '');
      const dataPayload = {
        ...formData,
        totalPengeluaran: parseInt(rawNominal, 10)
      };

      await axiosInstance.post('/transaction', dataPayload);

      // 3. GANTI ALERT JADI TOAST
      toast.success("Transaksi berhasil ditambahkan!");
      
      // Kasih jeda sedikit biar toast terlihat sebelum pindah halaman
      setTimeout(() => navigate('/dashboard'), 2000);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan server.";
      toast.error(`Gagal: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral font-sans flex flex-col items-center">
      {/* 4. TAMBAHKAN TOAST CONTAINER DI SINI */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* ... (Sisa struktur form tetap sama seperti sebelumnya) ... */}
      <form onSubmit={handleSimpan} className="flex flex-col gap-8 w-full">
         {/* ... (Input fields) ... */}
      </form>
    </div>
  );
};

export default AddTransaction;