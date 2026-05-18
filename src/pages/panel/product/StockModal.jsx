import React, { useState, useEffect } from 'react';
import { X, ArrowLeftRight, Save, Loader2 } from 'lucide-react';
import { updateProduct } from '../../../api/product';
import { useNotification } from '../../../context/NotificationContext';

export default function StockModal({ isOpen, onClose, onSuccess, product }) {
    const { notify } = useNotification();
    const [loading, setLoading] = useState(false);
    const [stockQuantity, setStockQuantity] = useState(0);

    useEffect(() => {
        if (isOpen && product) {
            setStockQuantity(product.stock_quantity || 0);
        }
    }, [isOpen, product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name: product.name,
            description: product.description || '',
            category_id: parseInt(product.category_id),
            sku: product.sku,
            barcode: product.barcode || '',
            cost_price: parseInt(product.cost_price),
            sale_price: parseInt(product.sale_price),
            stock_quantity: parseInt(stockQuantity),
            min_stock: parseInt(product.min_stock),
            status: product.status ?? true
        };

        try {
            await updateProduct(product.id, payload);
            notify("Estoque updated com sucesso!", "success");
            onSuccess();
            onClose();
        } catch (error) {
            const msg = error.response?.data?.detail || "Erro ao atualizar estoque.";
            notify(msg, "error");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-[90vw] sm:w-[360px] max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col items-stretch">
                
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 w-full">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="p-2 bg-blue-600 rounded-lg text-white flex-shrink-0">
                            <ArrowLeftRight size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h2 className="font-bold text-gray-800 text-sm leading-tight">Ajustar Estoque</h2>
                            <p className="text-[11px] text-gray-400 truncate w-full">{product.name}</p>
                        </div>
                    </div>
                    <button onClick={onClose} type="button" className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 flex-shrink-0 ml-2">
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 w-full flex flex-col">
                    <div className="flex flex-col items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4 w-full">
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Estoque do Produto</span>
                        <div className="flex items-center gap-3 w-full max-w-[160px]">
                            <button 
                                type="button" 
                                onClick={() => setStockQuantity(prev => Math.max(0, prev - 1))}
                                className="w-10 h-10 bg-white border border-slate-200 font-bold rounded-xl flex items-center justify-center shadow-sm active:scale-95 text-slate-600 select-none flex-shrink-0"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                required
                                min="0"
                                value={stockQuantity}
                                onChange={e => setStockQuantity(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
                                className="flex-1 h-10 w-full text-center font-mono font-bold text-lg bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button 
                                type="button" 
                                onClick={() => setStockQuantity(prev => prev + 1)}
                                className="w-10 h-10 bg-white border border-slate-200 font-bold rounded-xl flex items-center justify-center shadow-sm active:scale-95 text-slate-600 select-none flex-shrink-0"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 transition-colors">
                            Cancelar
                        </button>
                        <button
                            type="submit" disabled={loading || stockQuantity === ''}
                            className="flex-[2] py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 shadow-md shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
                        >
                            {loading ? <Loader2 className="animate-spin" size={14} /> : <><Save size={14} /> Salvar</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
