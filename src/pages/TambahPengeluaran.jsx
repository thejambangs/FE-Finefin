// src/pages/AddTransaction.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Utils/axiosInstance';
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
    
    // --- VALIDASI FORM (SATPAM) ---
    if (!formData.namaPengeluaran.trim()) {
      toast.error("Nama pengeluaran tidak boleh kosong!");
      return;
    }
    if (!formData.kategori) {
      toast.warning("Silakan pilih kategori!");
      return;
    }
    if (!formData.totalPengeluaran || parseInt(formData.totalPengeluaran.replace(/\./g, ''), 10) <= 0) {
      toast.error("Total pengeluaran harus lebih dari 0!");
      return;
    }
    if (!formData.metodePembayaran) {
      toast.warning("Pilih metode pembayaran!");
      return;
    }
    if (!formData.tanggal) {
      toast.warning("Pilih tanggal transaksi!");
      return;
    }

    try {
      const rawNominal = formData.totalPengeluaran.replace(/\./g, '');
      const dataPayload = {
        ...formData,
        totalPengeluaran: parseInt(rawNominal, 10)
      };

      await axiosInstance.post('/transaction', dataPayload);

      // --- SUKSES (GANTI ALERT KE TOAST) ---
      toast.success("Transaksi berhasil ditambahkan!");
      
      // Jeda 2 detik sebelum pindah
      setTimeout(() => navigate('/dashboard'), 2000);

    } catch (error) {
      // --- ERROR (GANTI ALERT KE TOAST) ---
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan server.";
      toast.error(`Gagal menyimpan: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral font-sans flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Struktur form kamu tetap sama di sini... */}
      <form onSubmit={handleSimpan} className="flex flex-col gap-8 w-full">
         {/* Pastikan input-input kamu menggunakan value={formData.xxx} dan onChange={handleInputChange} */}
      </form>
    </div>
  );
};

export default AddTransaction;