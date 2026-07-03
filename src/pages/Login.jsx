// src/pages/Login.jsx
import axiosInstance from "../Utils/axiosInstance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ✅ IMPORT TOAST
import { toast } from "react-toastify";
import LoginImage from "../assets/images/login-register.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // === VALIDASI FORM (SATPAM) ===
    if (!email.trim()) {
      toast.error("Email tidak boleh kosong!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Format email tidak valid!");
      return;
    }

    if (!password) {
      toast.error("Kata sandi tidak boleh kosong!");
      return;
    }

    if (password.length < 8) {
      toast.warning("Kata sandi minimal 8 karakter!");
      return;
    }

    setIsLoading(true);

    try {
      // Tembak data ke backend tanpa perlu hardcode URL / config token
      const response = await axiosInstance.post("/api/auth/login", {
        email: email,
        password: password,
      });

      if (response.status === 200 || response.data.success) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // 👇 TAMBAHAN BARU: Simpan status isOnboarded dari backend ke browser
        // (Pastikan BE mengirimkan data isOnboarded saat login sukses)
        const statusOnboard =
          response.data.user?.isOnboarded ?? response.data.isOnboarded;
        localStorage.setItem("isOnboarded", statusOnboard);

        // ✅ TOAST SUKSES
        toast.success("Login berhasil! Selamat datang.");

        setIsLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);

      // ✅ TOAST ERROR
      const errorMessage =
        error.response?.data?.message ||
        "Akun tidak ditemukan atau salah password!";
      toast.error(`Gagal Login: ${errorMessage}`);

      console.error("Error Login:", error);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* PANEL KIRI */}
      <div className="w-1/2 h-full bg-gray-100 border-r border-gray-200 overflow-hidden flex items-center justify-center">
        <img
          src={LoginImage}
          alt="FineFin Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* PANEL KANAN */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 lg:px-32 xl:px-40 gap-8 bg-white">
        <h1 className="text-5xl font-extrabold text-black uppercase tracking-tight">
          MASUK
        </h1>

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

        <label className="form-control w-full gap-2">
          <div className="label p-0">
            <span className="label-text text-xl font-medium text-black">
              Kata Sandi
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

        <div className="flex flex-row gap-5 mt-2">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="btn flex-grow rounded-full text-base h-14 text-black border-black bg-white hover:bg-gray-100 font-semibold"
          >
            Belum punya akun? Daftar
          </button>
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="btn flex-grow rounded-full text-lg h-14 text-white bg-black hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-neutral-400 uppercase font-semibold"
          >
            {isLoading ? (
              <span className="loading loading-spinner text-neutral-400"></span>
            ) : (
              "Masuk"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
