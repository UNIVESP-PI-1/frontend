import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ShieldCheck, Boxes, AlertCircle, CircleDot } from 'lucide-react';

export default function Signin() {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState(location.state?.successMessage || '');

  useEffect(() => {
    if (token) {
      navigate('/home', { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await login(email, password);
      navigate('/home', { replace: true });
    } catch (err) {
      setError(err.response?.status === 401 ? 'Credenciais inválidas.' : 'Falha na comunicação com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] font-['Inter'] p-4">
      {/* Container Centralizado */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">

        {/* Topo do Card - Identidade */}
        <div className="pt-10 pb-6 px-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-dark rounded-xl mb-4 shadow-lg shadow-dark/10">
            <Boxes className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-dark tracking-tight">Gestão de Estoque</h1>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mt-1">Console de Administração</p>
        </div>

        {/* Área do Formulário */}
        <div className="px-10 pb-10">

          {/* Alertas Compactos */}
          {(successMsg || error) && (
            <div className={`mb-6 p-3 rounded-lg flex items-center gap-3 border ${error ? 'bg-red-50 border-red-100 text-red-700' : 'bg-green-50 border-green-100 text-green-700'
              }`}>
              {error ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <ShieldCheck className="w-4 h-4 flex-shrink-0" />}
              <p className="text-xs font-semibold">{error || successMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all text-sm"
                  placeholder="admin@admin.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Senha de Acesso
                </label>
                <a href="/auth/forgot-password" title="Recuperar credenciais" className="text-[11px] text-primary hover:text-dark font-bold uppercase">
                  Esqueci
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-dark text-white py-4 rounded-xl font-bold hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-md disabled:bg-gray-400 mt-2"
            >
              {loading ? (
                <CircleDot className="w-5 h-5 animate-spin" />
              ) : (
                <>Entrar no Sistema</>
              )}
            </button>
          </form>

          {/* Rodapé do Card */}
          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">
              Acesso Restrito · {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}