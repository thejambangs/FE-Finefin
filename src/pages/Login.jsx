// src/pages/Login.jsx
import React, { useState } from 'react';
import loginImage from '../assets/images/login-register.jpg'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex h-screen w-full bg-white">
      
      {/* PANEL KIRI */}
      <div className="w-1/2 h-full bg-gray-100 border-r border-gray-200 overflow-hidden flex items-center justify-center">
        <img 
          src={loginImage} 
          alt="FineFin Login Visual" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* PANEL KANAN */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 lg:px-32 xl:px-40 gap-8 bg-white">
        
        {/* HEADING */}
        <h1 className="text-5xl font-extrabold text-black uppercase tracking-tight">LOGIN</h1>

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

        {/* FORM GROUP: KATA SANDI & CAPTION */}
        <div className="flex flex-col gap-2">
          <label className="form-control w-full gap-2">
            <div className="label p-0">
              <span className="label-text text-xl font-medium text-black">Kata Sandi</span>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" 
            />
          </label>

          {/* CAPTION: BELUM PUNYA AKUN? REGISTER */}
          <div className="text-right px-2 text-sm text-gray-500 font-medium mt-1">
            Belum punya akun?{' '}
            <button 
              type="button"
              className="text-black font-bold hover:underline cursor-pointer transition-colors bg-transparent border-none p-0"
            >
              Register
            </button>
          </div>
        </div>

        {/* TOMBOL CONTAINER (Hanya 1 Tombol Utama) */}
        <div className="flex flex-col mt-4">
          <button className="btn w-full rounded-full text-lg h-14 text-white bg-black hover:bg-neutral-800 uppercase font-semibold">
            Masuk
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;