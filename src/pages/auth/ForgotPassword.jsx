import { useState } from 'react';
import { requestCode } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Cross, AlertCircle, CircleDot } from 'lucide-react';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await requestCode(email);
            navigate('/auth/verify-code', { state: { email } });
        } catch (err) {
            const status = err.response?.status;
            setError(status === 400 ? 'E-mail administrativo não localizado.' : 'Falha na comunicação com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] font-['Inter'] p-4">
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                
                {/* Botão Voltar - Discreto e elegante */}
                <div className="px-10 pt-8">
                    <button
                        onClick={() => navigate('/auth/signin')}
                        className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-dark transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Login
                    </button>
                </div>

                {/* Header Identidade */}
                <div className="pt-6 pb-6 px-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-dark rounded-xl mb-4 shadow-lg shadow-dark/10">
                        <Cross className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-dark tracking-tight">Recuperar Acesso</h1>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        Informe seu e-mail institucional para receber o código de verificação.
                    </p>
                </div>

                {/* Área do Formulário */}
                <div className="px-10 pb-10">
                    
                    {/* Alerta de Erro */}
                    {error && (
                        <div className="mb-6 p-3 rounded-lg flex items-center gap-3 border bg-red-50 border-red-100 text-red-700">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <p className="text-xs font-semibold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 ml-1">
                                E-mail de Operador
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-dark focus:border-dark outline-none transition-all text-sm"
                                    placeholder="admin@igreja.com"
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
                                    Solicitar Código
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Rodapé do Card */}
                    <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">
                            Protocolo de Segurança Ativo
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}