import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Boxes, AlertCircle, CircleDot, ShieldCheck } from 'lucide-react';
import { storeUser } from '../../api/user';

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await storeUser(formData);
    
      navigate('/', { 
        state: { 
          successMessage: 'Conta criada com sucesso! Faça login.',
          email: formData.email 
        } 
      });
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        'Erro ao criar conta. Verifique os dados ou tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] font-['Inter'] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">

        {/* Topo do Card */}
        <div className="pt-10 pb-6 px-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-dark rounded-xl mb-4 shadow-lg shadow-dark/10">
            <Boxes className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-dark tracking-tight">Criar Nova Conta</h1>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mt-1">Gestão de Estoque</p>
        </div>

        {/* Área do Formulário */}
        <div className="px-10 pb-10">

          {/* Alertas de Erro */}
          {error && (
            <div className="mb-6 p-3 rounded-lg flex items-center gap-3 border bg-red-50 border-red-100 text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-xs font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Nome */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all text-sm"
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">
                Email Corporativo
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all text-sm"
                  placeholder="exemplo@empresa.com"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">
                Definir Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                <>Criar Conta</>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <p className="text-xs text-gray-500">
              Já possui acesso?{' '}
              <Link to="/" className="text-dark font-bold hover:underline">
                Fazer Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
