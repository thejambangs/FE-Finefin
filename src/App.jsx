// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Kuesioner from "./pages/onboarding/Kuesioner.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddTransaction from "./pages/TambahPengeluaran.jsx";
import RoboAdvisor from "./pages/RoboAdvisor.jsx";

// PENTING: Karena kita mendaftarkan rute /dashboard,
// pastikan FE 1 atau FE 2 sudah membuat file dummy (kosong) bernama Dashboard.jsx di dalam folder pages agar tidak error.
import ProtectedRoute from "./pages/onboarding/components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Jalur Utama: Jika user buka web pertama kali, langsung diarahkan ke halaman Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Jalur halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Jalur halaman Register */}
        <Route path="/register" element={<Register />} />

        {/* Jalur halaman Kuesioner */}
        <Route path="/kuesioner" element={<Kuesioner />} />

        {/* Jalur halaman Dashboard (setelah sukses login) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />

        {/* Jalur Tambah Pengeluaran */}
        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          }
        />

        {/* Jalur Robo Advisor */}
        <Route
          path="/robo-adviser"
          element={
            <ProtectedRoute>
              <RoboAdvisor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
