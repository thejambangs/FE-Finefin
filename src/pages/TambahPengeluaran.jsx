// src/pages/AddTransaction.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTransaction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaPengeluaran: "",
    totalPengeluaran: "",
    kategori: "",
    metodePembayaran: "",
    tanggal: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "totalPengeluaran") {
      let cleanValue = value.replace(/[^0-9]/g, "");
      if (cleanValue.length > 1 && cleanValue.startsWith("0"))
        cleanValue = cleanValue.replace(/^0+/, "");
      const formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
    if (
      !formData.totalPengeluaran ||
      parseInt(formData.totalPengeluaran.replace(/\./g, ""), 10) <= 0
    ) {
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
      const rawNominal = formData.totalPengeluaran.replace(/\./g, "");
      const dataPayload = {
        ...formData,
        totalPengeluaran: parseInt(rawNominal, 10),
      };

      await axiosInstance.post("/api/transaction", dataPayload);

      // --- SUKSES (GANTI ALERT KE TOAST) ---
      toast.success("Transaksi berhasil ditambahkan!");

      // Jeda 2 detik sebelum pindah
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      // --- ERROR (GANTI ALERT KE TOAST) ---
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan server.";
      toast.error(`Gagal menyimpan: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-neutral font-sans flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ================= HEADER ================= */}
      <div className="navbar bg-white border-b border-gray-100 px-4 md:px-8 w-full shrink-0">
        <div className="flex-1">
          <a
            href="/dashboard"
            className="text-3xl font-black text-black tracking-tighter uppercase select-none"
          >
            FineFin
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-6 text-lg font-semibold">
            <li>
              <a
                href="/dashboard"
                className="text-black border-b-2 border-black rounded-none px-1 pb-2 pt-2 bg-transparent"
              >
                Pengeluaran
              </a>
            </li>
            <li>
              <a
                href="/robo-advisor"
                className="text-gray-400 hover:text-black rounded-none px-1 pb-2 pt-2 bg-transparent"
              >
                Robo-Advisor
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-none ml-8 flex items-center gap-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search in site"
              className="input input-bordered input-sm rounded-full w-48 bg-white text-black"
            />
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* ================= KONTEN FORM ================= */}
      <div className="w-full max-w-4xl px-6 py-12 flex flex-col gap-10 mt-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-black">
            Tambahkan Pengeluaran
          </h1>
          <p className="text-lg text-gray-600">
            Catat pengeluaran dalam hitungan detik—dasbor Anda akan langsung
            diperbarui.
          </p>
        </div>

        <form onSubmit={handleSimpan} className="flex flex-col gap-8 w-full">
          {/* Nama Pengeluaran */}
          <label className="form-control w-full">
            <div className="label pb-1">
              <span className="label-text font-bold text-black text-base">
                Nama Pengeluaran
              </span>
            </div>
            <input
              type="text"
              name="namaPengeluaran"
              placeholder="Contoh: Makan Siang, Bensin"
              value={formData.namaPengeluaran}
              onChange={handleInputChange}
              required
              className="input input-bordered w-full rounded-md border-gray-300 bg-white text-black focus:border-black focus:ring-0"
            />
            <div className="label pt-1">
              <span className="label-text-alt text-gray-400">
                Tuliskan deskripsi singkat pengeluaran Anda.
              </span>
            </div>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Total Pengeluaran (Sudah Berformat Titik & Anti-Negatif) */}
            <label className="form-control w-full">
              <div className="label pb-1">
                <span className="label-text font-bold text-black text-base">
                  Total Pengeluaran
                </span>
              </div>
              <div className="input input-bordered flex items-center gap-2 rounded-md border-gray-300 bg-white focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                <span className="font-bold text-gray-500">Rp</span>
                <input
                  type="text"
                  inputMode="numeric"
                  name="totalPengeluaran"
                  placeholder="0"
                  value={formData.totalPengeluaran} // Menampilkan teks berformat (contoh: 150.000)
                  onChange={handleInputChange}
                  required
                  className="grow bg-transparent text-black border-none focus:outline-none focus:ring-0"
                />
              </div>
              <div className="label pt-1">
                <span className="label-text-alt text-gray-400">
                  Otomatis menggunakan format ribuan positif.
                </span>
              </div>
            </label>

            {/* ================= TUGAS FE 2: DROPDOWN KATEGORI ================= */}
            <label className="form-control w-full">
              <div className="label pb-1">
                <span className="label-text font-bold text-black text-base">
                  Kategori
                </span>
              </div>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                required
                className="select select-bordered w-full rounded-md border-gray-300 bg-white text-black focus:border-black focus:ring-0"
              >
                <option value="" disabled>
                  Pilih kategori...
                </option>
                <option value="Makanan & Minuman">🍔 Makanan & Minuman</option>
                <option value="Transportasi">🚗 Transportasi</option>
                <option value="Hiburan & Rekreasi">
                  🎬 Hiburan & Rekreasi
                </option>
                <option value="Belanja Bulanan">🛍️ Belanja Bulanan</option>
                <option value="Tagihan & Utilitas">
                  🧾 Tagihan & Utilitas
                </option>
                <option value="Kesehatan">⚕️ Kesehatan</option>
                <option value="Pendidikan">📚 Pendidikan</option>
              </select>
              <div className="label pt-1">
                <span className="label-text-alt text-gray-400">
                  Pilih kategori pengeluaran yang paling sesuai.
                </span>
              </div>
            </label>

            {/* Metode Pembayaran */}
            <label className="form-control w-full">
              <div className="label pb-1">
                <span className="label-text font-bold text-black text-base">
                  Metode Pembayaran
                </span>
              </div>
              <select
                name="metodePembayaran"
                value={formData.metodePembayaran}
                onChange={handleInputChange}
                required
                className="select select-bordered w-full rounded-md border-gray-300 bg-white text-black focus:border-black focus:ring-0"
              >
                <option value="" disabled>
                  Pilih metode...
                </option>
                <option value="Cashless">💳 Cashless (Qris/Transfer)</option>
                <option value="Cash">💵 Cash (Tunai)</option>
              </select>
              <div className="label pt-1">
                <span className="label-text-alt text-gray-400">
                  Membantu meningkatkan akurasi pelaporan.
                </span>
              </div>
            </label>

            {/* Tanggal */}
            <label className="form-control w-full">
              <div className="label pb-1">
                <span className="label-text font-bold text-black text-base">
                  Tanggal
                </span>
              </div>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full rounded-md border-gray-300 bg-white text-black focus:border-black focus:ring-0"
              />
              <div className="label pt-1">
                <span className="label-text-alt text-gray-400">
                  Hanya berlaku untuk tanggal mundur jika diperlukan.
                </span>
              </div>
            </label>
          </div>

          {/* ================= TOMBOL AKSI ================= */}
          <div className="flex flex-row justify-center gap-6 mt-8 w-full max-w-md mx-auto">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn flex-grow rounded-md text-lg h-14 bg-white text-black border border-black hover:bg-gray-100 font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn flex-grow rounded-md text-lg h-14 bg-black text-white hover:bg-neutral-800 font-bold border-none"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
