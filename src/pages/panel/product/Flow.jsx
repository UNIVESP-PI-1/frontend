import React, { useEffect, useState } from 'react';
import { ArrowUpDown, ArrowUpRight, ArrowDownLeft, Calendar, User, Package, Loader2, Search, Filter } from 'lucide-react';
import { getFlow } from "../../../api/product";
import { useNotification } from '../../../context/NotificationContext';
import DataTable from '../../../components/ui/DataTable';

export default function ProductFlow() {
    const [flows, setFlows] = useState([]);
    const [loading, setLoading] = useState(true);
    const { notify } = useNotification();

    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const fetchFlow = async () => {
        setLoading(true);
        try {
            const { data } = await getFlow();
            setFlows(data || []);
        } catch (error) {
            notify("Erro ao carregar o fluxo de estoque", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlow();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredFlows = flows.filter(item => {
        const matchesSearch = 
            item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.user_name.toLowerCase().includes(searchTerm.toLowerCase());

        // Se o filtro selecionado for ENTRADA, exibe também os de CADASTRO INICIAL
        let matchesType = true;
        if (typeFilter !== '') {
            if (typeFilter === 'ENTRADA') {
                matchesType = item.type === 'ENTRADA' || item.type === 'CADASTRO INICIAL';
            } else {
                matchesType = item.type === typeFilter;
            }
        }

        let matchesDate = true;
        if (dateFilter) {
            const itemDate = new Date(item.created_at).toISOString().split('T')[0];
            matchesDate = itemDate === dateFilter;
        }

        return matchesSearch && matchesType && matchesDate;
    });

    const FlowMobileCard = ({ item }) => {
        const isEntry = item.type === "ENTRADA" || item.type === "CADASTRO INICIAL";  
        return (
            <div className="bg-white p-4 border-b border-gray-100 last:border-0 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isEntry ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {isEntry ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-950 text-sm">{item.product_name}</h4>
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                <User size={12} />
                                <span>{item.user_name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className={`inline-flex items-center font-mono font-bold text-sm ${isEntry ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isEntry ? '+' : '-'}{item.quantity}
                        </span>
                        <div className="text-[10px] text-gray-400 mt-1">{formatDate(item.created_at)}</div>
                    </div>
                </div>
            </div>
        );
    };

    const columns = [
        {
            header: 'Tipo',
            width: '180px',
            render: (item) => {
                // CORRIGIDO AQUI: Adicionado CADASTRO INICIAL na validação Desktop
                const isEntry = item.type === "ENTRADA" || item.type === "CADASTRO INICIAL";
                return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        isEntry ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                        {isEntry ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                        {item.type}
                    </span>
                );
            }
        },
        {
            header: 'Produto',
            render: (item) => (
                <div className="flex items-center gap-2.5 py-1">
                    <div className="p-1.5 bg-slate-50 text-slate-500 rounded-lg">
                        <Package size={16} />
                    </div>
                    <span className="font-semibold text-gray-800">{item.product_name}</span>
                </div>
            )
        },
        {
            header: 'Quantidade',
            width: '120px',
            render: (item) => {
                // CORRIGIDO AQUI TAMBÉM: Para exibir o sinal de "+" no cadastro inicial
                const isEntry = item.type === "ENTRADA" || item.type === "CADASTRO INICIAL";
                return (
                    <span className={`font-mono font-bold ${isEntry ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isEntry ? '+' : '-'}{item.quantity}
                    </span>
                );
            }
        },
        {
            header: 'Operador',
            render: (item) => (
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                    <User size={14} className="text-gray-400" />
                    <span>{item.user_name}</span>
                </div>
            )
        },
        {
            header: 'Data do Registro',
            align: 'right',
            width: '180px',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5 text-gray-400 text-xs font-medium">
                    <Calendar size={14} />
                    <span>{formatDate(item.created_at)}</span>
                </div>
            )
        }
    ];

    return (
        <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-indigo-100">
                        <ArrowUpDown size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Movimentações</h1>
                        <p className="text-slate-500 text-sm">Histórico completo de entradas e saídas do estoque</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-t-[2rem] border border-slate-100 border-b-0 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por produto ou operador..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <select
                            className="w-full sm:w-44 pl-4 pr-10 py-3 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm appearance-none font-medium text-slate-700"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="">Todos os Tipos</option>
                            <option value="ENTRADA">Entradas</option>
                            <option value="SAIDA">Saídas</option>
                        </select>
                        <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>

                    <div className="relative">
                        <input
                            type="date"
                            className="w-full sm:w-48 px-4 py-3 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium text-slate-700"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-b-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <div className="md:hidden">
                    {loading ? (
                        <div className="p-10 flex justify-center">
                            <Loader2 className="animate-spin text-indigo-600" />
                        </div>
                    ) : filteredFlows.length === 0 ? (
                        <div className="p-8 text-center text-sm text-gray-400">Nenhuma movimentação encontrada para os filtros aplicados.</div>
                    ) : (
                        filteredFlows.map(item => <FlowMobileCard key={item.id} item={item} />)
                    )}
                </div>

                <div className="hidden md:block">
                    <DataTable 
                        columns={columns} 
                        data={filteredFlows}
                        loading={loading}
                        itemsPerPage={10}
                    />
                </div>
            </div>
        </div>
    );
}