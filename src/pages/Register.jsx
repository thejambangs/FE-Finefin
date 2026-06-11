// src/pages/Register.jsx
import axiosInstance from "../Utils/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterImage from "../assets/images/login-register.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // === TAMBAHKAN VALIDASI EMAIL DI SINI ===
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Format email tidak valid! (Contoh: nama@email.com)");
      return; // Stop proses registrasi jika bukan format email
    }
    // ========================================

    // Validasi Client-Side Sederhana sebelum kirim ke database
    if (password !== confirmPassword) {
      alert("Kata sandi dan konfirmasi kata sandi tidak cocok!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/api/auth/register",
        {
          username: username,
          email: email,
          password: password,
        },
      );

      if (response.status === 201 || response.data.success) {
        setIsLoading(false);
        alert("Registrasi Berhasil! Data sudah tersimpan di database.");
        navigate("/login");
      }
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        alert(
          `Gagal Daftar: ${error.response.data.message || "Data tidak valid!"}`,
        );
      } else {
        alert("Gagal menyambung ke server database backend.");
      }
      console.error("Error Register:", error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* PANEL KIRI: Visual Gambar */}
      <div className="w-1/2 h-full bg-gray-100 border-r border-gray-200 overflow-hidden flex items-center justify-center">
        <img
          src={RegisterImage}
          alt="FineFin Register Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* PANEL KANAN: Formulir Registrasi */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 lg:px-32 xl:px-40 gap-8 bg-white">
        <h1 className="text-5xl font-extrabold text-black uppercase tracking-tight">
          REGISTRASI
        </h1>

        {/* FORM GROUP: USERNAME */}
        <label className="form-control w-full gap-2">
          <div className="label p-0"><span className="label-text text-xl font-medium text-black">Username</span></div>
          <input 
            type="text"
            placeholder="Masukkan username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" 
          />
        </label>

        {/* FORM GROUP: EMAIL */}
        <label className="form-control w-full gap-2">
          <div className="label p-0">
            <span className="label-text text-xl font-medium text-black">
              Email
            </span>
          </div>
          <input
            type="email"
            required
            placeholder="contoh@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
          />
        </label>

        {/* FORM GROUP: KATA SANDI BARU */}
        <label className="form-control w-full gap-2">
          <div className="label p-0">
            <span className="label-text text-xl font-medium text-black">
              Isi Kata Sandi Baru
            </span>
          </div>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
          />
        </label>

        {/* FORM GROUP: KONFIRMASI KATA SANDI */}
        <label className="form-control w-full gap-2">
          <div className="label p-0">
            <span className="label-text text-xl font-medium text-black">
              Konfirmasi Kata Sandi
            </span>
          </div>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0"
          />
        </label>

        {/* TOMBOL CONTAINER: SINKRONISASI NAVIGASI */}
        <div className="flex flex-row gap-5 mt-2">
          {/* 1. TOMBOL KEMBALI */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="btn grow rounded-full text-base h-14 text-black border-black bg-white hover:bg-gray-100 font-semibold"
          >
            Sudah punya akun? Masuk
          </button>

          {/* 2. TOMBOL DAFTAR */}
          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="btn grow rounded-full text-lg h-14 text-white bg-black hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-neutral-400 uppercase font-semibold"
          >
            {isLoading && (
              <span className="loading loading-spinner text-neutral-400"></span>
            )}
            {isLoading ? "Memproses..." : "Daftar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
