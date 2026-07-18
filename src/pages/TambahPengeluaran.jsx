// src/pages/TambahPengeluaran.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TambahPengeluaran = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    namaTransaksi: '',
    tipeTransaksi: '',
    nominal: '',
    kategori: '',
    metodePembayaran: '',
    tanggal: ''
  });

  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get('/api/transaction');
      setTransactions(response.data.data || []);
    } catch (error) {
      console.error("Gagal menarik data transaksi:", error);
    }
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) return;
    try {
      await axiosInstance.delete(`/api/transaction/${_id}`);
      setTransactions((prev) => prev.filter((trx) => (trx._id || trx.id) !== _id));
      toast.success("Transaksi berhasil dihapus!");
    } catch (error) {
      toast.error("Gagal menghapus data.");
    }
  };

  const handleEditClick = (trx) => {
    setEditId(trx._id || trx.id);
    setFormData({
      namaTransaksi: trx.namaTransaksi,
      tipeTransaksi: trx.tipeTransaksi,
      // Mengubah angka dari DB menjadi format titik untuk input
      nominal: new Intl.NumberFormat('id-ID').format(trx.nominal),
      kategori: trx.kategori,
      metodePembayaran: trx.metodePembayaran,
      tanggal: trx.tanggal ? trx.tanggal.split('T')[0] : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nominal') {
      const cleanValue = value.replace(/[^0-9]/g, '');
      if (cleanValue === '') {
        setFormData((prev) => ({ ...prev, nominal: '' }));
      } else {
        // Format otomatis ke format Rupiah (dengan titik)
        const formattedValue = new Intl.NumberFormat('id-ID').format(cleanValue);
        setFormData((prev) => ({ ...prev, nominal: formattedValue }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    
    // Menghapus titik sebelum kirim ke database
    const rawNominal = String(formData.nominal).replace(/\./g, '');
    
    if (!formData.namaTransaksi?.trim()) {
      toast.error("Nama transaksi tidak boleh kosong!");
      return;
    }
    if (!formData.tipeTransaksi) {
      toast.warning("Silakan pilih tipe transaksi!");
      return;
    }
    if (!rawNominal || parseInt(rawNominal, 10) <= 0) {
      toast.error("Total transaksi harus lebih dari 0!");
      return;
    }
    if (!formData.kategori) {
      toast.warning("Silakan pilih kategori!");
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
      const dataPayload = {
        ...formData,
        nominal: parseInt(rawNominal, 10)
      };

      if (editId) {
        const response = await axiosInstance.put(`/api/transaction/${editId}`, dataPayload);
        const updatedTransaction = response.data.data || { ...dataPayload, _id: editId };
        setTransactions((prev) => prev.map((trx) => ((trx._id || trx.id) === editId ? updatedTransaction : trx)));
        toast.success("Transaksi berhasil diperbarui!");
        setEditId(null);
      } else {
        const response = await axiosInstance.post('/api/transaction', dataPayload);
        const newTransaction = response.data.data || { _id: Date.now().toString(), ...dataPayload };
        setTransactions((prev) => [...prev, newTransaction]);
        toast.success("Transaksi berhasil ditambahkan!");
      }
      
      setFormData({ namaTransaksi: '', tipeTransaksi: '', nominal: '', kategori: '', metodePembayaran: '', tanggal: '' });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan server.";
      toast.error(`Gagal: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral font-sans flex flex-col items-center pb-20">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="navbar bg-white border-b border-gray-100 px-4 md:px-8 w-full shrink-0">
        <div className="flex-1">
          <Link to="/dashboard" className="text-3xl font-black text-black tracking-tighter uppercase select-none">FineFin</Link>
        </div>
      </div>

      <div className="w-full max-w-5xl px-6 py-12 flex flex-col gap-10">
        <form onSubmit={handleSimpan} className="flex flex-col gap-6 w-full">
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Nama Transaksi</span></div>
            <input type="text" name="namaTransaksi" value={formData.namaTransaksi} onChange={handleInputChange} className="input input-bordered w-full rounded-md border-gray-200" />
          </label>

          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Tipe Transaksi</span></div>
            <select name="tipeTransaksi" value={formData.tipeTransaksi} onChange={handleInputChange} className="select select-bordered w-full rounded-md border-gray-200">
              <option value="" disabled>Pilih tipe...</option>
              <option value="Pengeluaran">Pengeluaran</option>
              <option value="Pemasukan">Pemasukan</option>
            </select>
          </label>

          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Total Transaksi</span></div>
            <div className="input input-bordered flex items-center gap-2 rounded-md border-gray-200">
              <span className="text-gray-500">Rp.</span>
              <input type="text" name="nominal" placeholder="0" value={formData.nominal} onChange={handleInputChange} className="grow bg-transparent border-none focus:outline-none" />
            </div>
          </label>
          
          <button type="submit" className="btn w-full bg-black text-white">Simpan Data</button>
        </form>
      </div>
    </div>
  );
};

export default TambahPengeluaran;