import AuthRoutes from './AuthRoutes';
import PanelRoutes from './PanelRoutes';
import Signin from '../pages/auth/Signin';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from '../context/NotificationContext';

export default function AppRoutes() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="auth/*" element={<AuthRoutes />} />
            <Route path="/" element={<Signin />} />
            <Route path="/*" element={<PanelRoutes />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </NotificationProvider>
  );
}