import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '../../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        {/* Ilustração / Ícone */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 scale-150"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
            <Search size={64} className="text-blue-600 animate-bounce-slow" />
          </div>
        </div>

        {/* Texto de Erro */}
        <h1 className="text-8xl font-black text-gray-200 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Ops! O conteúdo que você está procurando não existe ou foi movido para outro endereço.
        </p>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)} 
            icon={ArrowLeft}
            className="w-full sm:w-auto"
          >
            Voltar
          </Button>
          
          <Button 
            variant="primary" 
            onClick={() => navigate('/')} 
            icon={Home}
            className="w-full sm:w-auto"
          >
            Ir para o Início
          </Button>
        </div>

        {/* Rodapé opcional */}
        <p className="mt-12 text-sm text-gray-400">
          Se você acha que isso é um erro do sistema, <br />
          por favor, contate o suporte.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
