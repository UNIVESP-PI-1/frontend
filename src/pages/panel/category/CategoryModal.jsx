import React, { useState, useEffect } from 'react';
import { X, LayoutGrid, AlignLeft, Save, Loader2 } from 'lucide-react';
import { storeCategory, updateCategory } from '../../../api/category';
import { useNotification } from '../../../context/NotificationContext';

export default function CategoryModal({ isOpen, onClose, onSuccess, category }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const { notify } = useNotification();

    const isEditing = !!category;

    // Resetar ou preencher campos ao abrir o modal
    useEffect(() => {
        if (isOpen) {
            setName(category?.name || '');
            setDescription(category?.description || '');
        }
    }, [isOpen, category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = { 
            name, 
            description 
        };

        try {
            if (isEditing) {
                await updateCategory(category.id, payload);
                notify("Categoria atualizada com sucesso!", "success");
            } else {
                await storeCategory(payload);
                notify("Categoria criada com sucesso!", "success");
            }
            onSuccess(); // Recarrega a lista no componente pai
            onClose();   // Fecha o modal
        } catch (error) {
            const msg = error.response?.data?.detail || "Erro ao salvar categoria.";
            notify(msg, "danger");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-lg text-white">
                            <LayoutGrid size={20} />
                        </div>
                        <h2 className="font-bold text-gray-800 text-lg">
                            {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Input Nome */}
                    <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">
                            Nome da Categoria
                        </label>
                        <div className="relative">
                            <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ex: Eletrônicos, Limpeza..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* Input Descrição */}
                    <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">
                            Descrição (Opcional)
                        </label>
                        <div className="relative">
                            <AlignLeft className="absolute left-4 top-4 text-gray-300" size={18} />
                            <textarea
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Detalhes sobre os produtos desta categoria..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-sm resize-none"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    <Save size={18} />
                                    {isEditing ? 'Salvar Alterações' : 'Criar Categoria'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}