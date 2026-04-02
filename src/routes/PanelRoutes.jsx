import Home from '../pages/panel/Home';
import { Routes, Route } from 'react-router-dom';
import PanelLayout from '../components/layouts/PanelLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function PanelRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<PanelLayout />}>

          <Route path="/home" element={<Home />} />

        </Route>
      </Route>
    </Routes>
  );
}
