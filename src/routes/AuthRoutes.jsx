import Signin from '../pages/auth/Signin';
import { Routes, Route } from 'react-router-dom';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}
