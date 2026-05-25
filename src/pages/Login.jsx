// src/pages/Login.jsx
import axiosInstance from '../Utils/axiosInstance';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. LOGIKA FE 2: Import untuk navigasi
import LoginImage from '../assets/images/login-register.jpg'; 
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // === 2. LOGIKA FE 1 & 2: State Loading & Inisialisasi Navigasi ===
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // === 3. LOGIKA FE 2: Fungsi Handle Login ===
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Aktifkan loading spinner DaisyUI

    try {
      // 2. TEMBAK DATA KE BACKEND
      // Sesuaikan URL "http://localhost:5000/api/login" dengan instruksi tim Backend-mu
      const response = await axios.post('http://localhost:5000/api/login', {
        email: email,       // Mengambil state email dari input form
        password: password  // Mengambil state password dari input form
      });

      // 3. JIKA BACKEND MENYATAKAN DATA COCOK DI DATABASE
      if (response.status === 200 || response.data.success) {
        
        // Opsional: Simpan token JWT jika backend menggunakan sistem token
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        setIsLoading(false); // Matikan spinner
        navigate('/kuesioner'); // Pindah ke kuesioner
      }

    } catch (error) {
      setIsLoading(false); // Matikan spinner jika gagal
      
      // Tangkap pesan error dari backend (misal: email salah, password tidak cocok)
      if (error.response) {
        alert(`Gagal Login: ${error.response.data.message || 'Akun tidak ditemukan!'}`);
      } else {
        alert('Gagal terhubung ke server backend. Pastikan server backend sudah menyala!');
      }
      console.error('Error Login:', error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      
      {/* PANEL KIRI: Visual Estetika FE 1 */}
      <div className="w-1/2 h-full bg-gray-100 border-r border-gray-200 overflow-hidden flex items-center justify-center">
        <img 
          src={LoginImage} 
          alt="FineFin Login Visual" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* PANEL KANAN: Form Login & Interaksi */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 lg:px-32 xl:px-40 gap-8 bg-white">
        
        <h1 className="text-5xl font-extrabold text-black uppercase tracking-tight">MASUK</h1>

        {/* INPUT EMAIL */}
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

        {/* INPUT PASSWORD */}
        <label className="form-control w-full gap-2">
          <div className="label p-0"><span className="label-text text-xl font-medium text-black">Kata Sandi</span></div>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" 
          />
        </label>

        {/* TOMBOL CONTAINER: Integrasi Navigasi & DaisyUI */}
        <div className="flex flex-row gap-5 mt-2">
          
          {/* Tombol ke Halaman Registrasi */}
          <button 
            type="button"
            onClick={() => navigate('/register')} // Lempar ke /register jika belum punya akun
            className="btn flex-grow rounded-full text-base h-14 text-black border-black bg-white hover:bg-gray-100 font-semibold"
          >
            Belum punya akun? Daftar
          </button>

          {/* Tombol Masuk (FE 1: DaisyUI Spinner | FE 2: Mengarah ke Kuesioner) */}
          <button 
            onClick={handleLogin}
            disabled={isLoading} // Kunci tombol saat sedang loading
            className="btn flex-grow rounded-full text-lg h-14 text-white bg-black hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-neutral-400 uppercase font-semibold"
          >
            {/* Animasi Spinner DaisyUI */}
            {isLoading && <span className="loading loading-spinner text-neutral-400"></span>}
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>

        </div>

      </div>
    </div>
  );
};

export default Login;