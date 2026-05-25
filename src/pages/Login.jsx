// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. IMPORT USE_NAVIGATE
import loginImage from '../assets/images/login-register.jpg'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. INISIALISASI NAVIGATE
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // CONTOH NYATA: Jika login sukses di API, pindah ke dashboard
      // navigate('/dashboard'); 
    }, 3000);
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* PANEL KIRI (Gambar) */}
      <div className="w-1/2 h-full bg-gray-100 border-r border-gray-200 overflow-hidden flex items-center justify-center">
        <img src={loginImage} alt="FineFin Login Visual" className="w-full h-full object-cover" />
      </div>

      {/* PANEL KANAN */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 lg:px-32 xl:px-40 gap-8 bg-white">
        <h1 className="text-5xl font-extrabold text-black uppercase tracking-tight">LOGIN</h1>

        {/* FORM GROUP: EMAIL */}
        <label className="form-control w-full gap-2">
          <div className="label p-0"><span className="label-text text-xl font-medium text-black">Email</span></div>
          <input type="email" placeholder="contoh@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" />
        </label>

        {/* FORM GROUP: KATA SANDI */}
        <div className="flex flex-col gap-2">
          <label className="form-control w-full gap-2">
            <div className="label p-0"><span className="label-text text-xl font-medium text-black">Kata Sandi</span></div>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full rounded-full border-gray-300 h-14 text-lg text-black bg-white focus:border-black focus:ring-0" />
          </label>

          {/* CAPTION LINK REGISTER */}
          <div className="text-right px-2 text-sm text-gray-500 font-medium mt-1">
            Belum punya akun?{' '}
            <button 
              type="button"
              // 3. PASANG FUNGSI KLIK UNTUK PINDAH KE REGISTER
              onClick={() => navigate('/register')} 
              className="text-black font-bold hover:underline cursor-pointer transition-colors bg-transparent border-none p-0"
            >
              Register
            </button>
          </div>
        </div>

        {/* TOMBOL MASUK */}
        <div className="flex flex-col mt-4">
          <button onClick={handleLogin} disabled={isLoading} className="btn w-full rounded-full text-lg h-14 text-white bg-black hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-neutral-400 uppercase font-semibold">
            {isLoading && <span className="loading loading-spinner text-neutral-400"></span>}
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;