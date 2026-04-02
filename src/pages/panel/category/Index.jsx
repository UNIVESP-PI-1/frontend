import React, { useEffect, useState } from 'react';
import { LayoutGrid, Plus, Search, Edit, Trash2, Loader2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';
import ConfirmModal from '../../../components/ui/ConfirmModal';
import CategoryModal from './CategoryModal'; // Você precisará criar este modal
import { getCategories, deleteCategory } from '../../../api/category';
import { useNotification } from '../../../context/NotificationContext';

export default function CategoryIndex() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { notify } = useNotification();

    // Modais
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const { data } = await getCategories();
            setCategories(data || []);
        } catch (error) {
            notify("Erro ao carregar categorias", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setCategoryModalOpen(true);
    };

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteCategory(selectedCategory.id);
            notify("Categoria removida com sucesso", "success");
            setCategories(prev => prev.filter(c => c.id !== selectedCategory.id));
            setDeleteModalOpen(false);
        } catch (error) {
            const errorMessage = error.response?.data?.detail ||
                "Não é possível excluir esta categoria pois existem produtos vinculados a ela.";
            notify(errorMessage, "warning");
            setDeleteModalOpen(false);
        } finally {
            setIsDeleting(false);
            setSelectedCategory(null);
        }
    };

    const CategoryCard = ({ category }) => (
        <div className="bg-white p-5 border-b border-gray-100 last:border-0 flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        <LayoutGrid size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">{category.name}</h4>
                        <span className="text-[10px] font-mono text-gray-400 uppercase">ID: #{category.id}</span>
                    </div>
                </div>
            </div>

            {category.description && (
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {category.description}
                </p>
            )}

            <div className="flex gap-2">
                <button onClick={() => handleEdit(category)} className="flex-1 py-2 bg-amber-50 text-amber-600 rounded-xl flex justify-center items-center gap-2 text-xs font-bold transition-all hover:bg-amber-100">
                    <Edit size={16} /> Editar
                </button>
                <button onClick={() => handleDeleteClick(category)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );

    const columns = [
        {
            header: 'Categoria',
            render: (category) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        <LayoutGrid size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-800">{category.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">ID: #{category.id}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Descrição',
            render: (category) => (
                <div className="max-w-[400px] truncate text-sm text-gray-500">
                    {category.description || <span className="text-gray-300 italic">Sem descrição</span>}
                </div>
            )
        },
        {
            header: 'Ações',
            align: 'right',
            render: (category) => (
                <div className="flex justify-end gap-1">
                    <Button variant="outline" className="px-2 border-none text-amber-600 hover:bg-amber-50" icon={Edit} onClick={() => handleEdit(category)} />
                    <Button variant="outline" className="px-2 border-none text-red-600 hover:bg-red-50" icon={Trash2} onClick={() => handleDeleteClick(category)} />
                </div>
            )
        }
    ];

    const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-indigo-100">
                        <LayoutGrid size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Categorias</h1>
                        <p className="text-slate-500 text-sm">Organize seus produtos por grupos</p>
                    </div>
                </div>
                <Button
                    variant="primary"
                    icon={Plus}
                    onClick={() => { setSelectedCategory(null); setCategoryModalOpen(true); }}
                    className="w-full sm:w-auto justify-center bg-indigo-600 hover:bg-indigo-700"
                >
                    Nova Categoria
                </Button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-t-[2rem] border border-slate-100 border-b-0">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar categoria..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-b-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <div className="md:hidden">
                    {loading ? (
                        <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>
                    ) : (
                        filteredCategories.map(cat => <CategoryCard key={cat.id} category={cat} />)
                    )}
                </div>
                <div className="hidden md:block">
                    <DataTable columns={columns} data={filteredCategories} loading={loading} />
                </div>
            </div>

            {/* Modais */}
            <CategoryModal
                isOpen={categoryModalOpen}
                onClose={() => setCategoryModalOpen(false)}
                onSuccess={fetchCategories}
                category={selectedCategory}
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                loading={isDeleting}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Excluir Categoria"
                message={<span>Tem certeza que deseja remover a categoria <b>{selectedCategory?.name}</b>? Esta ação não pode ser desfeita.</span>}
            />
        </div>
    );
}
