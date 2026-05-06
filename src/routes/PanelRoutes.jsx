import Home from '../pages/panel/Home';
import { Routes, Route } from 'react-router-dom';
import PanelLayout from '../components/layouts/PanelLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import CategoryIndex from '../pages/panel/category/Index';
import ProductIndex from '../pages/panel/product/Index';
import UserIndex from '../pages/panel/user/Index';

export default function PanelRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<PanelLayout />}>

          <Route path="/home" element={<Home />} />

          <Route path="/categories" element={<CategoryIndex />} />

          <Route path="/products" element={<ProductIndex />} />

          <Route path="/users" element={<UserIndex />} />

        </Route>
      </Route>
    </Routes>
  );
}
