// src/pages/Register.jsx
import React, { useState } from 'react';
import RegisterImage from '../assets/images/login-register.jpg'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 1. TAMBAHAN STATE BARU UNTUK KONFIRMASI SANDI
  const [confirmPassword, setConfirmPassword] = useState(''); 

  return (
    <div className="flex h-screen w-full bg-white">
      
      {/* PANEL KIRI (Tetap sama, menggunakan gambar) */}
      <div className="w-1/2 h-full bg-gray-100 border-r border-gray-200 overflow-hidden flex items-center justify-center">
        <img 
          src={RegisterImage} 
          alt="FineFin Register Visual" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* PANEL KANAN (Ubah gap-10 jadi gap-8 agar form muat dengan rapi) */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 lg:px-32 xl:px-40 gap-8 bg-white">
        
        {/* HEADING DIUBAH */}
        <h1 className="text-5xl font-extrabold text-black uppercase tracking-tight">REGISTRASI</h1>

        {/* FORM GROUP: EMAIL */}
        <label className="form-control w-full gap-2">
          <div className="label p-0">
            <span className="label-text text-xl font-medium text-black">Email</span>
          </div>
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
          <div className="label p-0">
            <span className="label-text text-xl font-medium text-black">Isi Kata Sandi Baru</span>
          </div>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" 
          />
        </label>

        {/* 2. FORM GROUP BARU: KONFIRMASI KATA SANDI */}
        <label className="form-control w-full gap-2">
          <div className="label p-0">
            <span className="label-text text-xl font-medium text-black">Konfirmasi Kata Sandi</span>
          </div>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={confirmPassword} // <-- Menggunakan state baru
            onChange={(e) => setConfirmPassword(e.target.value)} // <-- Fungsi set state baru
            className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" 
          />
        </label>

        {/* 3. TOMBOL CONTAINER DIUBAH SESUAI DESAIN */}
        <div className="flex flex-row gap-5 mt-2">
          <button className="btn flex-grow rounded-full text-base h-14 text-black border-black bg-white hover:bg-gray-100 font-semibold">
            Sudah punya akun? Masuk
          </button>
          <button className="btn flex-grow rounded-full text-lg h-14 text-white bg-black hover:bg-neutral-800 uppercase font-semibold">
            Daftar
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;