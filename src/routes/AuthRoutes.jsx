import Signin from '../pages/auth/Signin';
import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/auth/Signup';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
