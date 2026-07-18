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
      setTransactions((prev) => prev.filter((trx) => (trx._id || trx._id) !== _id));
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
      nominal: trx.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
      kategori: trx.kategori,
      metodePembayaran: trx.metodePembayaran,
      tanggal: trx.tanggal ? trx.tanggal.split('T')[0] : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nominal') {
      let cleanValue = value.replace(/[^0-9]/g, '');
      const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    
    const rawNominal = String(formData.nominal || '').replace(/\./g, '');
    
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
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-6 text-lg font-semibold">
            <li><Link to="/pengeluaran" className="text-black border-b-2 border-black rounded-none px-1 pb-2 pt-2 bg-transparent">Pengeluaran</Link></li>
            <li><Link to="/robo-advisor" className="text-gray-400 hover:text-black rounded-none px-1 pb-2 pt-2 bg-transparent">Robo-Advisor</Link></li>
          </ul>
        </div>
      </div>

      <div className="w-full max-w-5xl px-6 py-12 flex flex-col gap-10 mt-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-black">Tambahkan Transaksi</h1>
          <p className="text-base text-gray-600">Catat pengeluaran dalam hitungan detik—dasbor Anda akan langsung diperbarui.</p>
        </div>

        <form onSubmit={handleSimpan} className="flex flex-col gap-6 w-full">
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Nama Transaksi</span></div>
            <input type="text" name="namaTransaksi" placeholder="Contoh: Beli Makan..." value={formData.namaTransaksi} onChange={handleInputChange} className="input input-bordered w-full rounded-md border-gray-200 bg-white text-black focus:outline-none focus:border-gray-400" />
          </label>

          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Tipe Transaksi</span></div>
            <select name="tipeTransaksi" value={formData.tipeTransaksi} onChange={handleInputChange} className="select select-bordered w-full rounded-md border-gray-200 bg-white focus:outline-none focus:border-gray-400 font-normal">
              <option value="" disabled>Pilih tipe transaksi...</option>
              <option value="Pengeluaran">💸 Pengeluaran</option>
              <option value="Pemasukan">💰 Pemasukan</option>
            </select>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Total Transaksi</span></div>
              <div className="input input-bordered flex items-center gap-2 rounded-md border-gray-200 bg-white focus-within:border-gray-400">
                <span className="text-gray-500">Rp.</span>
                <input type="text" name="nominal" placeholder="0" value={formData.nominal} onChange={handleInputChange} className="grow bg-transparent text-black border-none focus:outline-none focus:ring-0" />
              </div>
            </label>

            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Kategori</span></div>
              <select name="kategori" value={formData.kategori} onChange={handleInputChange} className="select select-bordered w-full rounded-md border-gray-200 bg-white focus:outline-none focus:border-gray-400 font-normal">
                <option value="" disabled>Pilih kategori...</option>
                <option value="Makanan & Minuman">Makanan & Minuman</option>
                <option value="Transportasi & Bensin">Transportasi & Bensin</option>
                <option value="Belanja Bulanan">Belanja Bulanan</option>
                <option value="Tagihan & Utilitas">Tagihan & Utilitas</option>
                <option value="Service Motor/Mobil">Service Kendaraan</option>
                <option value="Bayar Pajak">Bayar Pajak</option>
                <option value="Asuransi">Asuransi</option>
                <option value="DP / Cicilan Rumah">DP / Cicilan Rumah</option>
                <option value="Kesehatan & Skincare">Kesehatan & Skincare</option>
                <option value="Hiburan & Rekreasi">Hiburan & Rekreasi</option>
                <option value="Gaji Utama">Gaji Utama (Pemasukan)</option>
                <option value="Lain-lain">Lain-lain</option>
              </select>
            </label>

            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Metode Pembayaran</span></div>
              <select name="metodePembayaran" value={formData.metodePembayaran} onChange={handleInputChange} className="select select-bordered w-full rounded-md border-gray-200 bg-white focus:outline-none focus:border-gray-400 font-normal">
                <option value="" disabled>Pilih metode pembayaran...</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="Qris / E-Wallet">Qris / E-Wallet</option>
                <option value="Tunai">Tunai / Cash</option>
              </select>
            </label>

            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-black text-sm">Tanggal</span></div>
              <input type="date" name="tanggal" value={formData.tanggal} onChange={handleInputChange} className="input input-bordered w-full rounded-md border-gray-200 bg-white focus:outline-none focus:border-gray-400" />
            </label>
          </div>

          <div className="flex flex-row justify-center gap-4 mt-6 w-full max-w-sm mx-auto">
            <button type="button" onClick={() => navigate('/dashboard')} className="btn flex-1 rounded-md text-sm bg-white text-black border border-black hover:bg-gray-50 font-semibold">Kembali</button>
            <button type="submit" className="btn flex-1 rounded-md text-sm bg-black text-white hover:bg-neutral-800 font-semibold border-none">Simpan Data</button>
          </div>
        </form>
      </div>

      {transactions.length > 0 && (
        <div className="w-full max-w-5xl px-6 my-6">
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <table className="table w-full text-black">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nama</th>
                  <th>Tipe</th>
                  <th>Total</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((trx, index) => (
                  <tr key={trx._id}>
                    <td>{index + 1}</td>
                    <td>{trx.tanggal ? trx.tanggal.substring(0, 10).split('-').reverse().join('/') : '-'}</td>
                    <td>{trx.namaTransaksi}</td>
                    <td>{trx.tipeTransaksi}</td>
                    <td>Rp. {Number(trx.nominal || 0).toLocaleString('id-ID')}</td>
                    <td className="flex gap-2">
                      <button onClick={() => handleEditClick(trx)} className="text-blue-500">Edit</button>
                      <button onClick={() => handleDelete(trx._id)} className="text-red-500">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TambahPengeluaran;