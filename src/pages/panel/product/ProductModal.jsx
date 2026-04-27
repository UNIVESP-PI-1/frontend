import React, { useState, useEffect } from 'react';
import { X, Package, Save, Loader2 } from 'lucide-react';
import { storeProduct, updateProduct } from '../../../api/product';
import { getCategories } from '../../../api/category';
import { useNotification } from '../../../context/NotificationContext';

export default function ProductModal({ isOpen, onClose, onSuccess, product }) {
    const { notify } = useNotification();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        sku: '',
        barcode: '',
        cost_price: '',
        sale_price: ''
    });

    const isEditing = !!product;

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const { data } = await getCategories();
                setCategories(data || []);
            } catch (err) {
                notify("Erro ao carregar categorias", "error");
            }
        };

        if (isOpen) {
            loadCategories();
            if (product) {
                setFormData({
                    name: product.name,
                    description: product.description || '',
                    category_id: product.category_id,
                    sku: product.sku,
                    barcode: product.barcode || '',
                    cost_price: (product.cost_price / 100).toString(),
                    sale_price: (product.sale_price / 100).toString()
                });
            } else {
                setFormData({
                    name: '', description: '', category_id: '',
                    sku: '', barcode: '', cost_price: '', sale_price: ''
                });
            }
        }
    }, [isOpen, product, notify]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            category_id: parseInt(formData.category_id),
            cost_price: Math.round(parseFloat(formData.cost_price) * 100),
            sale_price: Math.round(parseFloat(formData.sale_price) * 100)
        };

        try {
            if (isEditing) {
                await updateProduct(product.id, payload);
                notify("Produto atualizado!", "success");
            } else {
                await storeProduct(payload);
                notify("Produto criado!", "success");
            }
            onSuccess();
            onClose();
        } catch (error) {
            const msg = error.response?.data?.detail || "Erro ao salvar produto.";
            notify(msg, "error");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            {/* Alterado de max-w-2xl para max-w-md para ficar mais estreito */}
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl my-8 overflow-hidden">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <Package size={20} />
                        </div>
                        <h2 className="font-bold text-gray-800 text-lg">
                            {isEditing ? 'Editar Produto' : 'Novo Produto'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-2 gap-4">

                        {/* Nome - Ocupa 2 colunas */}
                        <div className="col-span-2">
                            <label className="block text-[11px] font-black uppercase text-gray-400 mb-1.5 ml-1">Nome do Produto</label>
                            <input
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 outline-none text-sm transition-all"
                            />
                        </div>

                        {/* SKU e Barcode - Lado a lado */}
                        <div className="col-span-1">
                            <label className="block text-[11px] font-black uppercase text-gray-400 mb-1.5 ml-1">SKU</label>
                            <input
                                required
                                value={formData.sku}
                                onChange={e => setFormData({ ...formData, sku: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 outline-none text-sm transition-all"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[11px] font-black uppercase text-gray-400 mb-1.5 ml-1">Cód. Barras</label>
                            <input
                                value={formData.barcode}
                                onChange={e => setFormData({ ...formData, barcode: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 outline-none text-sm transition-all"
                            />
                        </div>

                        {/* Categoria - Ocupa 2 colunas */}
                        <div className="col-span-2">
                            <label className="block text-[11px] font-black uppercase text-gray-400 mb-1.5 ml-1">Categoria</label>
                            <select
                                required
                                value={formData.category_id}
                                onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 outline-none text-sm transition-all"
                            >
                                <option value="">Selecione...</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Preços - SEMPRE na mesma linha (col-span-1 cada) */}
                        <div className="col-span-1">
                            <label className="block text-[11px] font-black uppercase text-gray-400 mb-1.5 ml-1">Custo (R$)</label>
                            <input
                                type="number" step="0.01" required
                                value={formData.cost_price}
                                onChange={e => setFormData({ ...formData, cost_price: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 outline-none text-sm transition-all"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-[11px] font-black uppercase text-gray-400 mb-1.5 ml-1">Venda (R$)</label>
                            <input
                                type="number" step="0.01" required
                                value={formData.sale_price}
                                onChange={e => setFormData({ ...formData, sale_price: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 outline-none text-sm transition-all"
                            />
                        </div>

                        {/* Descrição - Ocupa 2 colunas */}
                        <div className="col-span-2">
                            <label className="block text-[11px] font-black uppercase text-gray-400 mb-1.5 ml-1">Descrição</label>
                            <textarea
                                rows="2"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 outline-none text-sm resize-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-6">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-2xl font-bold text-xs hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button
                            type="submit" disabled={loading}
                            className="flex-[2] py-3 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <><Save size={16} /> {isEditing ? 'Salvar' : 'Criar'}</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
