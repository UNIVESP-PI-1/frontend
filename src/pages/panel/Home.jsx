import React, { useEffect, useState } from 'react';
import { 
    LayoutDashboard, 
    Package, 
    Tags, 
    Users, 
    ArrowRight, 
    PlusCircle,
    Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { getCategories } from '../../api/category';
import { getProducts } from '../../api/product';
import { getUsers } from '../../api/user';

export default function Home() {
    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        users: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [prodRes, catRes, userRes] = await Promise.all([
                    getProducts(),
                    getCategories(),
                    getUsers()
                ]);

                setStats({
                    products: prodRes.data?.length || 0,
                    categories: catRes.data?.length || 0,
                    users: userRes.data?.length || 0
                });
            } catch (error) {
                console.error("Erro ao carregar estatísticas", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { 
            title: 'Produtos', 
            count: stats.products, 
            icon: Package, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50',
            path: '/products' 
        },
        { 
            title: 'Categorias', 
            count: stats.categories, 
            icon: Tags, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50',
            path: '/categories' 
        },
        { 
            title: 'Usuários', 
            count: stats.users, 
            icon: Users, 
            color: 'text-indigo-600', 
            bg: 'bg-indigo-50',
            path: '/users' 
        },
    ];

    return (
        <div className="p-6 md:p-10 bg-[#F8FAFC] min-h-screen">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <LayoutDashboard className="text-indigo-600" size={32} />
                    Painel de Controle
                </h1>
                <p className="text-slate-500 mt-2">Bem-vindo ao seu sistema de gestão. Aqui está o que está acontecendo hoje:</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${card.bg} ${card.color} p-4 rounded-2xl`}>
                                <card.icon size={24} />
                            </div>
                            {loading ? (
                                <Loader2 className="animate-spin text-slate-300" size={20} />
                            ) : (
                                <span className="text-3xl font-bold text-slate-800">{card.count}</span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wider">{card.title}</h3>
                            <Link 
                                to={card.path} 
                                className="flex items-center gap-2 text-indigo-600 text-sm mt-4 font-bold group-hover:gap-3 transition-all"
                            >
                                Ver todos <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative shadow-2xl shadow-indigo-200">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Ações Rápidas</h2>
                    <p className="text-indigo-200 mb-8 max-w-md">Adicione novos itens ao seu catálogo ou gerencie sua equipe com um clique.</p>
                    
                    <div className="flex flex-wrap gap-4">
                        <Link to="/products/new" className="flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                            <PlusCircle size={20} /> Novo Produto
                        </Link>
                        <Link to="/users" className="flex items-center gap-2 bg-indigo-800 text-white border border-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                            <Users size={20} /> Gerenciar Time
                        </Link>
                    </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-50"></div>
            </div>
        </div>
    );
}
