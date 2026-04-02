import Signin from '../pages/auth/Signin';
import { Routes, Route } from 'react-router-dom';
import VerifyCode from '../pages/auth/VerifyCode';
import ResetPassword from '../pages/auth/ResetPassword';
import ForgotPassword from '../pages/auth/ForgotPassword';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path='/verify-code' element={<VerifyCode />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Routes>
  );
}
