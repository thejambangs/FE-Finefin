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
      console.error("Gagal menarik data:", error);
    }
  };

  // FUNGSI UTAMA YANG DIPERBAIKI
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nominal') {
      // 1. Bersihkan semua karakter selain angka
      let rawValue = value.replace(/[^0-9]/g, '');
      
      // 2. Format menjadi ribuan dengan titik
      // Menggunakan regex untuk menambahkan titik di setiap 3 digit
      let formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
      setFormData((prev) => ({ ...prev, nominal: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    
    // Hapus semua titik sebelum dikirim ke database
    const nominalAngka = formData.nominal.replace(/\./g, '');
    
    if (!formData.namaTransaksi || !formData.tipeTransaksi || !nominalAngka || !formData.kategori) {
      toast.error("Mohon lengkapi semua data!");
      return;
    }

    try {
      const payload = { ...formData, nominal: parseInt(nominalAngka, 10) };
      
      if (editId) {
        await axiosInstance.put(`/api/transaction/${editId}`, payload);
        toast.success("Berhasil diperbarui!");
        setEditId(null);
      } else {
        await axiosInstance.post('/api/transaction', payload);
        toast.success("Berhasil ditambahkan!");
      }
      
      setFormData({ namaTransaksi: '', tipeTransaksi: '', nominal: '', kategori: '', metodePembayaran: '', tanggal: '' });
      fetchTransactions();
    } catch (error) {
      toast.error("Gagal menyimpan data.");
    }
  };

  const handleEditClick = (trx) => {
    setEditId(trx._id);
    setFormData({
      namaTransaksi: trx.namaTransaksi,
      tipeTransaksi: trx.tipeTransaksi,
      // Format angka mentah dari DB ke format titik saat edit
      nominal: trx.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      kategori: trx.kategori,
      metodePembayaran: trx.metodePembayaran,
      tanggal: trx.tanggal ? trx.tanggal.split('T')[0] : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-white text-black p-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Tambah Transaksi</h1>
      
      <form onSubmit={handleSimpan} className="flex flex-col gap-4 max-w-lg">
        <input 
          type="text" name="namaTransaksi" placeholder="Nama Transaksi" 
          value={formData.namaTransaksi} onChange={handleInputChange} 
          className="input input-bordered w-full" 
        />

        <select name="tipeTransaksi" value={formData.tipeTransaksi} onChange={handleInputChange} className="select select-bordered w-full">
          <option value="">Pilih Tipe</option>
          <option value="Pemasukan">Pemasukan</option>
          <option value="Pengeluaran">Pengeluaran</option>
        </select>

        {/* INPUT NOMINAL DENGAN TITIK */}
        <div className="flex items-center gap-2 border p-2 rounded">
          <span>Rp</span>
          <input 
            type="text" name="nominal" placeholder="0" 
            value={formData.nominal} onChange={handleInputChange} 
            className="w-full outline-none" 
          />
        </div>

        <button type="submit" className="btn btn-primary">Simpan</button>
      </form>
      
      {/* Tabel Transaksi */}
      <table className="table mt-10">
        <thead>
          <tr><th>Nama</th><th>Nominal</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {transactions.map((trx) => (
            <tr key={trx._id}>
              <td>{trx.namaTransaksi}</td>
              <td>Rp. {trx.nominal.toLocaleString('id-ID')}</td>
              <td>
                <button onClick={() => handleEditClick(trx)} className="text-blue-500 mr-2">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TambahPengeluaran;