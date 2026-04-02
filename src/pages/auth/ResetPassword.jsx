import { useState } from 'react';
import { changePassword } from '../../api/auth';
import { Lock, CheckCircle2, Cross, AlertCircle, CircleDot, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || null;
  const code = location.state?.code || null;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!email || !code) {
    navigate('/auth/forgot-password');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('As senhas digitadas não coincidem.');
    }

    if (password.length < 6) {
      return setError('A senha deve possuir no mínimo 6 caracteres.');
    }

    setLoading(true);
    setError('');

    try {
      await changePassword(email, code, password);
      
      navigate('/auth/signin', { 
        state: { 
            successMessage: 'Senha administrativa redefinida com sucesso.',
            replace: true
        } 
      });
    } catch (err) {
      setError('Falha ao redefinir. O código de segurança pode ter expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] font-['Inter'] p-4">
      
      {/* Card Central */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Header Identidade */}
        <div className="pt-10 pb-6 px-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-dark rounded-xl mb-4 shadow-lg shadow-dark/10">
            <Cross className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-dark tracking-tight">Nova Credencial</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Defina sua nova chave de acesso ao painel <span className="font-semibold text-primary">Igreja Digital</span>.
          </p>
        </div>

        {/* Área do Formulário */}
        <div className="px-10 pb-10">
          
          {/* Alerta de Feedback */}
          {error && (
            <div className="mb-6 p-3 rounded-lg flex items-center gap-3 border bg-red-50 border-red-100 text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-xs font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">
                Nova Senha Administrativa
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all text-sm"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">
                Confirmar Nova Senha
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all text-sm"
                  placeholder="Repita a senha"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dark text-white py-4 rounded-xl font-bold hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-md disabled:bg-gray-400 mt-2"
            >
              {loading ? (
                <CircleDot className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Atualizar Senha
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Rodapé do Card */}
          <div className="mt-8 pt-6 border-t border-gray-50 text-center text-gray-400">
             <p className="text-[10px] font-medium uppercase tracking-[0.2em]">
              Sessão de Segurança Finalizada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
