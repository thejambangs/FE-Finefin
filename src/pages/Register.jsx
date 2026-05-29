// src/pages/Register.jsx
import axiosInstance from '../Utils/axiosInstance';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk routing
import RegisterImage from '../assets/images/login-register.jpg'; 
// import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate(); // Inisialisasi fungsi navigasi

  // Fungsi aksi saat tombol "Daftar" diklik
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi Client-Side Sederhana sebelum kirim ke database
    if (password !== confirmPassword) {
      alert("Kata sandi dan konfirmasi kata sandi tidak cocok!");
      return;
    }

    setIsLoading(true); // Aktifkan loading spinner DaisyUI

    try {
      // 2. KIRIM DATA PENDAFTARAN BARU KE BACKEND
      // Sesuaikan URL "http://localhost:5000/api/register" dengan instruksi tim Backend-mu
      const response = await axiosInstance.post('http://localhost:5000/api/auth/register', {
        username: username,
        email: email,
        password: password
      });

      // 3. JIKA DATABASE BERHASIL MENYIMPAN DATA BARU
      if (response.status === 201 || response.data.success) {
        setIsLoading(false); // Matikan spinner
        alert('Registrasi Berhasil! Data sudah tersimpan di database.');
        navigate('/login'); // Kembalikan ke halaman login
      }

    } catch (error) {
      setIsLoading(false); // Matikan spinner
      
      if (error.response) {
        // Menangkap error jika email sudah terdaftar sebelumnya di database
        alert(`Gagal Daftar: ${error.response.data.message || 'Data tidak valid!'}`);
      } else {
        alert('Gagal menyambung ke server database backend.');
      }
      console.error('Error Register:', error);
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
        
        <h1 className="text-5xl font-extrabold text-black uppercase tracking-tight">REGISTRASI</h1>

        {/* FORM GROUP: USERNAME */}
        <label className="form-control w-full gap-1">
          <div className="label p-0"><span className="label-text text-lg font-medium text-black">Username</span></div>
          <input 
            type="text"
            required
            placeholder="Masukkan username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" 
          />
        </label>

        {/* FORM GROUP: EMAIL */}
        <label className="form-control w-full gap-2">
          <div className="label p-0"><span className="label-text text-xl font-medium text-black">Email</span></div>
          <input 
            type="email" 
            placeholder="contoh@email.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" 
          />
        </label>

        {/* FORM GROUP: KATA SANDI BARU */}
        <label className="form-control w-full gap-2">
          <div className="label p-0"><span className="label-text text-xl font-medium text-black">Isi Kata Sandi Baru</span></div>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" 
          />
        </label>

        {/* FORM GROUP: KONFIRMASI KATA SANDI */}
        <label className="form-control w-full gap-2">
          <div className="label p-0"><span className="label-text text-xl font-medium text-black">Konfirmasi Kata Sandi</span></div>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" 
          />
        </label>

        {/* TOMBOL CONTAINER: SINKRONISASI NAVIGASI */}
        <div className="flex flex-row gap-5 mt-2">
          
          {/* 1. TOMBOL KEMBALI (Klik langsung mengarah ke halaman Login) */}
          <button 
            type="button"
            onClick={() => navigate('/login')} // Navigasi instan ke /login
            className="btn flex-grow rounded-full text-base h-14 text-black border-black bg-white hover:bg-gray-100 font-semibold"
          >
            Sudah punya akun? Masuk
          </button>

          {/* 2. TOMBOL DAFTAR (Klik -> Spinner jalan 2 detik -> otomatis mengarah ke halaman Login) */}
          <button 
            onClick={handleRegister}
            disabled={isLoading} // Mencegah klik ganda saat loading berjalan
            className="btn flex-grow rounded-full text-lg h-14 text-white bg-black hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-neutral-400 uppercase font-semibold"
          >
            {/* Element Spinner Animasi DaisyUI */}
            {isLoading && <span className="loading loading-spinner text-neutral-400"></span>}
            {isLoading ? 'Memproses...' : 'Daftar'}
          </button>

        </div>

      </div>
    </div>
  );
};

export default Register;