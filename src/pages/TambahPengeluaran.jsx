// src/pages/TambahPengeluaran.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TambahPengeluaran = () => {
  const navigate = useNavigate();
  
  // 1. STATE FORM
  const [formData, setFormData] = useState({
    namaTransaksi: '',
    tipeTransaksi: '', 
    nominal: '',
    kategori: '',
    metodePembayaran: '',
    tanggal: ''
  });

  // 2. STATE UNTUK TABEL
  const [transactions, setTransactions] = useState([]);

  // STATE UNTUK FITUR EDIT
  const [editId, setEditId] = useState(null);

  // 3. EFFECT UNTUK MENARIK DATA TRANSAKSI
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

  // FUNGSI UNTUK LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info("Berhasil keluar.");
    navigate('/login');
  };

  // FUNGSI UNTUK MENGHAPUS
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

  // FUNGSI UNTUK KLIK EDIT
  const handleEditClick = (trx) => {
    setEditId(trx._id || trx.id);
    
    const formattedNominal = String(trx.nominal || '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    setFormData({
      namaTransaksi: trx.namaTransaksi,
      tipeTransaksi: trx.tipeTransaksi,
      nominal: formattedNominal,
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
      if (cleanValue.length > 1 && cleanValue.startsWith('0')) cleanValue = cleanValue.replace(/^0+/, '');
      const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    
    const safeTotalTransaksi = String(formData.nominal || '');
    const rawNominal = safeTotalTransaksi.replace(/\./g, '');
    
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
        
        setTransactions((prev) => 
          prev.map((trx) => ((trx._id || trx.id) === editId ? updatedTransaction : trx))
        );

        toast.success("Transaksi berhasil diperbarui!");
        setEditId(null); 
      } else {
        const response = await axiosInstance.post('/api/transaction', dataPayload);
        const newTransaction = response.data.data || { 
          _id: Date.now().toString(), 
          ...dataPayload 
        };
        
        setTransactions((prev) => [...prev, newTransaction]);
        toast.success("Transaksi berhasil ditambahkan!");
      }
      
      setFormData({
        namaTransaksi: '',
        tipeTransaksi: '',
        nominal: '',
        kategori: '',
        metodePembayaran: '',
        tanggal: ''
      });

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan server.";
      toast.error(`Gagal: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-neutral font-sans flex flex-col items-center pb-20">
      
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ================= HEADER ================= */}
      <div className="navbar bg-white border-b border-gray-100 px-4 md:px-8 w-full shrink-0">
        <div className="flex-1">
          <Link to="/dashboard" className="text-3xl font-black tracking-tighter uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#10B981]">
            FineFin
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-6 text-lg font-semibold">
            <li><Link to="/pengeluaran" className="text-[#7C3AED] border-b-2 border-[#7C3AED] rounded-none px-1 pb-2 pt-2 bg-transparent">Pengeluaran</Link></li>
            <li><Link to="/robo-advisor" className="text-gray-400 hover:text-black rounded-none px-1 pb-2 pt-2 bg-transparent">Robo-Advisor</Link></li>
          </ul>
        </div>
        <div className="flex-none ml-8 flex items-center gap-4">
          <div className="form-control">
            <input type="text" placeholder="Search in site" className="input border-gray-200 focus:outline-none focus:border-gray-300 input-sm rounded-full w-48 bg-white text-black" />
          </div>
        </nav>

      {/* ================= KONTEN FORM ATAS ================= */}
      <div className="w-full max-w-5xl px-6 py-10 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-[#0F172A]">Tambahkan Transaksi</h1>
          <p className="text-base text-[#64748B]">Catat pengeluaran dalam hitungan detik—dasbor Anda akan langsung diperbarui.</p>
        </div>

        <form onSubmit={handleSimpan} className="flex flex-col gap-6 w-full bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm">
          
          {/* NAMA TRANSAKSI */}
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text font-bold text-[#0F172A] text-sm">Nama Transaksi</span></div>
            <input 
              type="text" 
              name="namaTransaksi"
              placeholder="Contoh: Beli Makan, Gaji Bulanan..." 
              value={formData.namaTransaksi}
              onChange={handleInputChange}
              className="input input-bordered w-full rounded-md border-gray-200 bg-white text-black focus:outline-none focus:border-[#7C3AED]" 
            />
            <div className="label pt-1"><span className="label-text-alt text-gray-400">Tuliskan deskripsi singkat.</span></div>
          </label>

          {/* TIPE TRANSAKSI */}
          <label className="form-control w-full">
            <div className="label pb-1"><span className="label-text font-bold text-[#0F172A] text-sm">Tipe Transaksi</span></div>
            <select 
              name="tipeTransaksi"
              value={formData.tipeTransaksi}
              onChange={handleInputChange}
              className={`select select-bordered w-full rounded-md border-gray-200 bg-white focus:outline-none focus:border-[#7C3AED] font-normal ${formData.tipeTransaksi === '' ? 'text-gray-400' : 'text-black'}`}
            >
              <option value="" disabled>Pilih tipe transaksi...</option>
              <option value="Pengeluaran">💸 Pengeluaran</option>
              <option value="Pemasukan">💰 Pemasukan</option>
            </select>
            <div className="label pt-1"><span className="label-text-alt text-gray-400">Tentukan jenis arus kas.</span></div>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-[#0F172A] text-sm">Total Transaksi</span></div>
              <div className="input input-bordered flex items-center gap-2 rounded-md border-gray-200 bg-white focus-within:border-[#7C3AED]">
                <span className="text-gray-500">Rp.</span>
                <input 
                  type="text" 
                  name="nominal"
                  placeholder="0"
                  value={formData.nominal}
                  onChange={handleInputChange}
                  className="grow bg-transparent text-black border-none focus:outline-none focus:ring-0" 
                />
              </div>
              <div className="label pt-1"><span className="label-text-alt text-gray-400">Angka akan diformat secara otomatis.</span></div>
            </label>

            {/* KATEGORI */}
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-[#0F172A] text-sm">Kategori</span></div>
              <select 
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                className={`select select-bordered w-full rounded-md border-gray-200 bg-white focus:outline-none focus:border-[#7C3AED] font-normal ${formData.kategori === '' ? 'text-gray-400' : 'text-black'}`}
              >
                <option value="" disabled>Pilih kategori...</option>
                <option value="Makanan & Minuman">Makanan & Minuman</option>
                <option value="Transportasi & Bensin">Transportasi & Bensin</option>
                <option value="Belanja Bulanan">Belanja Bulanan</option>
                <option value="Tagihan & Utilitas">Tagihan & Utilitas (Listrik, Air)</option>
                <option value="Service Motor/Mobil">Service Kendaraan</option>
                <option value="Bayar Pajak">Bayar Pajak</option>
                <option value="Asuransi">Asuransi</option>
                <option value="DP / Cicilan Rumah">DP / Cicilan Rumah</option>
                <option value="Kesehatan & Skincare">Kesehatan & Skincare</option>
                <option value="Hiburan & Rekreasi">Hiburan & Rekreasi</option>
                <option value="Gaji Utama">Gaji Utama (Pemasukan)</option>
                <option value="Lain-lain">Lain-lain</option>
              </select>
              <div className="label pt-1"><span className="label-text-alt text-gray-400">Pilih yang paling sesuai.</span></div>
            </label>

            {/* METODE PEMBAYARAN */}
            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-[#0F172A] text-sm">Metode Pembayaran</span></div>
              <select 
                name="metodePembayaran"
                value={formData.metodePembayaran}
                onChange={handleInputChange}
                className={`select select-bordered w-full rounded-md border-gray-200 bg-white focus:outline-none focus:border-[#7C3AED] font-normal ${formData.metodePembayaran === '' ? 'text-gray-400' : 'text-black'}`}
              >
                <option value="" disabled>Pilih metode pembayaran...</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="Qris / E-Wallet">Qris / E-Wallet (Gopay/OVO/Dana)</option>
                <option value="Tunai">Tunai / Cash</option>
              </select>
              <div className="label pt-1">
                <span className="label-text-alt text-gray-400">
                  Membantu meningkatkan akurasi pelaporan.
                </span>
              </div>
            </label>

            <label className="form-control w-full">
              <div className="label pb-1"><span className="label-text font-bold text-[#0F172A] text-sm">Tanggal</span></div>
              <input 
                type="date" 
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                className={`input input-bordered w-full rounded-md border-gray-200 bg-white focus:outline-none focus:border-[#7C3AED] ${formData.tanggal === '' ? 'text-gray-400' : 'text-black'}`} 
              />
              <div className="label pt-1">
                <span className="label-text-alt text-gray-400">
                  Hanya berlaku untuk tanggal mundur jika diperlukan.
                </span>
              </div>
            </label>
          </div>

          <div className="flex flex-row justify-center gap-4 mt-6 w-full max-w-sm mx-auto">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')}
              className="btn flex-1 rounded-md text-sm bg-white text-[#0F172A] border border-[#0F172A] hover:bg-gray-50 font-semibold"
            >
              Kembali
            </button>
            <button 
              type="submit" 
              className="btn flex-1 rounded-md text-sm bg-[#7C3AED] text-white hover:bg-[#4C1D95] font-semibold border-none"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </div>

      {/* ================= KONDISI: TAMPILKAN TABEL JIKA ADA TRANSAKSI ================= */}
      {transactions.length > 0 && (
        <>
          <div className="w-full max-w-5xl px-6 my-6">
            <hr className="border-gray-100" />
          </div>

      {/* ================= KONTEN TABEL BAWAH ================= */}
      <div className="w-full max-w-5xl px-6">
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="table w-full text-black">
              {/* Header Tabel */}
              <thead className="bg-white border-b border-gray-200 text-[#0F172A] font-bold">
                <tr>
                  <th className="bg-transparent py-4 pl-6">No</th>
                  <th className="bg-transparent py-4">Tanggal</th>
                  <th className="bg-transparent py-4">Nama Transaksi</th>
                  <th className="bg-transparent py-4">Tipe</th>
                  <th className="bg-transparent py-4">Total</th>
                  <th className="bg-transparent py-4">Kategori</th>
                  <th className="bg-transparent py-4">Metode Pembayaran</th>
                  <th className="bg-transparent py-4 text-center pr-6">Aksi</th>
                </tr>
              </thead>
              
              {/* Body Tabel */}
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-400">
                      Belum ada transaksi. Silakan input form di atas.
                    </td>
                  </tr>
                </thead>
                
                <tbody>
                  {transactions.map((trx, index) => (
                    <tr key={trx._id || index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="pl-6">{index + 1}</td>
                      <td>{trx.tanggal ? trx.tanggal.substring(0, 10).split('-').reverse().join('/') : '-'}</td>
                      <td className="font-medium">{trx.namaTransaksi}</td>
                      
                      <td>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${trx.tipeTransaksi === 'Pemasukan' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {trx.tipeTransaksi}
                        </span>
                      </td>
                      <td className={`font-semibold ${trx.tipeTransaksi === 'Pemasukan' ? 'text-green-600' : 'text-red-500'}`}>
                        {trx.tipeTransaksi === 'Pemasukan' ? '+' : '-'}Rp. {Number(trx.nominal || 0).toLocaleString('id-ID')}
                      </td>
                      <td>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">
                          {trx.kategori}
                        </span>
                      </td>
                      <td>{trx.metodePembayaran}</td>
                      <td className="flex justify-center gap-4 pr-6 py-4">
                        <button 
                          onClick={() => handleEditClick(trx)} 
                          className="text-blue-500 hover:text-blue-700 transition-colors" 
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>

                        <button 
                          onClick={() => handleDelete(trx._id)} 
                          className="text-red-500 hover:text-red-700 transition-colors" 
                          title="Hapus"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TambahPengeluaran;