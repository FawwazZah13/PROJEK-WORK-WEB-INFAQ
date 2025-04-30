import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Users/Dashboard';
import Login from './Login/login';
import Pembayaran from './Pembayaran/Pembayaran';
import Pembayaran3 from './Pembayaran/Bayar/Metode';
import Nunggak from './assets/Items/Menunggak';
import Sidebar from './PS/Sidebar/index';
import TabelSiswa from './PS/Siswa';
import View from './PS/View';
import Home from './PS/Home';
import SidebarAdmin from './Admin/Sidebar';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Users/Profile';

const RedirectIfAuthenticated = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (token) {
    // Arahkan pengguna ke halaman sesuai role jika sudah login
    if (role === "Siswa") {
      return <Navigate to="/User/dashboard" replace />;
    } else if (role === "Admin") {
      return <Navigate to="/Admin/" replace />;
    } else if (role === "PS") {
      return <Navigate to="/PS/" replace />;
    }
  }

  return children;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Proteksi route / dan /login */}
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <Navigate to="/login" replace />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        
        {/* Route untuk siswa */}
        <Route path="/User/dashboard" element={<ProtectedRoute requiredRole="Siswa"><Dashboard /></ProtectedRoute>} />
        <Route path="/User/riwayat" element={<ProtectedRoute requiredRole="Siswa"><Pembayaran /></ProtectedRoute>} />
        <Route path="/User/pembayaran" element={<ProtectedRoute requiredRole="Siswa"><Pembayaran /></ProtectedRoute>} />
        <Route path="/User/pembayaran2" element={<ProtectedRoute requiredRole="Siswa"><Pembayaran3 /></ProtectedRoute>} />
        <Route path="/User/nunggak" element={<ProtectedRoute requiredRole="Siswa"><Nunggak /></ProtectedRoute>} />
        <Route path="/User/profile" element={<ProtectedRoute requiredRole="Siswa"><Profile /></ProtectedRoute>} />

        
        {/* Route untuk PS */}
        <Route path="/PS" element={<ProtectedRoute requiredRole="PS"><Sidebar /></ProtectedRoute>}>
          <Route path="/PS/" element={<Home />} />
          <Route path="/PS/view" element={<View />} />
          <Route path="/PS/pembayaran" element={<TabelSiswa />} />
        </Route>

        {/* Route untuk Admin */}
        <Route path="/Admin/" element={<ProtectedRoute requiredRole="Admin"><SidebarAdmin /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
