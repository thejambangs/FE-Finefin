// src/pages/Login.jsx
import React, { useState } from 'react';
// Memanggil gambar yang sudah teruji aman pada repositori lokalmu
import loginImage from '../assets/images/login-register.jpg'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // === TAMBAHAN STATE UNTUK ANIMASI LAODING ===
  const [isLoading, setIsLoading] = useState(false);

  // === FUNGSI LOGIKA SAAT TOMBOL DIKLIK ===
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true); // Mengaktifkan efek loading spinner

    // Simulasi jeda 3 detik (Nanti bagian ini akan dieksekusi oleh FE 2 dengan API asli)
    setTimeout(() => {
      setIsLoading(false); // Mematikan efek loading spinner
      alert("Simulasi Login Berhasil!");
    }, 3000);
  };

  return (
    // CONTAINER UTAMA (Nempel full satu layar tanpa padding luar)
    <div className="flex h-screen w-full bg-white">
      
      {/* PANEL KIRI (Menampilkan gambar visual penuh tanpa penyet) */}
      <div className="w-1/2 h-full bg-gray-100 border-r border-gray-200 overflow-hidden flex items-center justify-center">
        <img 
          src={loginImage} 
          alt="FineFin Login Visual" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* PANEL KANAN (Formulir Login dengan padding responsif) */}
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

        {/* FORM GROUP: KATA SANDI & CAPTION LINK */}
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

          {/* CAPTION LINK REGISTER (Gaya tombol transparan untuk FE 2) */}
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

        {/* TOMBOL CONTAINER (1 Tombol Utama dengan Efek Spinner DaisyUI) */}
        <div className="flex flex-col mt-4">
          <button 
            onClick={handleLogin}
            disabled={isLoading} // Tombol otomatis terkunci/disabled saat proses loading aktif
            className="btn w-full rounded-full text-lg h-14 text-white bg-black hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-neutral-400 uppercase font-semibold"
          >
            {/* Menyisipkan elemen spinner DaisyUI jika sedang loading */}
            {isLoading && <span className="loading loading-spinner text-neutral-400"></span>}
            
            {/* Mengubah teks tombol secara dinamis berdasarkan status loading */}
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;