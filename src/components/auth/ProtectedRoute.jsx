import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const { token, church, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!token) {
    return <Navigate to="/auth/signin" replace />;
  }
  
  return <Outlet />;
}
