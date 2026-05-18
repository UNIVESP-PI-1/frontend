import React, { useEffect, useState } from 'react';
import { 
    LayoutDashboard, 
    Package, 
    Tags, 
    Users, 
    ArrowRight, 
    Loader2,
    AlertTriangle
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
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [prodRes, catRes, userRes] = await Promise.all([
                    getProducts(),
                    getCategories(),
                    getUsers()
                ]);

                const allProducts = prodRes.data || [];
                const lowStock = allProducts.filter(p => p.stock_quantity <= p.min_stock);

                setStats({
                    products: allProducts.length,
                    categories: catRes.data?.length || 0,
                    users: userRes.data?.length || 0
                });
                
                setLowStockProducts(lowStock);
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

            {/* Alerta de Estoque Baixo */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                            <AlertTriangle size={22} className={lowStockProducts.length > 0 ? "animate-pulse" : ""} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Atenção ao Estoque</h2>
                            <p className="text-sm text-slate-400">Produtos que atingiram ou estão abaixo do estoque mínimo definido</p>
                        </div>
                    </div>
                    {!loading && lowStockProducts.length > 0 && (
                        <span className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full font-black uppercase">
                            {lowStockProducts.length} {lowStockProducts.length === 1 ? 'Item' : 'Itens'}
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>
                ) : lowStockProducts.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500 font-medium text-sm">Excelente! Todos os produtos estão com o nível de estoque normal.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {lowStockProducts.map(product => {
                            const isCritical = product.stock_quantity < product.min_stock;
                            return (
                                <div key={product.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
                                    <div className="min-w-0 flex-1 pr-3">
                                        <h4 className="font-bold text-slate-800 text-sm truncate">{product.name}</h4>
                                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mt-0.5">SKU: {product.sku}</span>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <span className={`text-xs font-black px-2 py-1 rounded-lg ${
                                                isCritical ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                Qtd: {product.stock_quantity}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-slate-400 block mt-1">Mínimo: {product.min_stock}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
