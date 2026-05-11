import React, { useState } from 'react';
import { Package, ScanBarcode, Trash2, ChevronRight, Loader2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Scanner from '../../../components/layouts/Scanner';
import { getProductByBarcode, updateProduct } from '../../../api/product';
import { useNotification } from '../../../context/NotificationContext';
import { formatCurrency } from '../../../utils/money';

export default function StockOut() {
    const [items, setItems] = useState([]);
    const [showScanner, setShowScanner] = useState(false);
    const [loading, setLoading] = useState(false);
    const { notify } = useNotification();

    const handleScan = async (barcode) => {
        setShowScanner(false);
        setLoading(true);
        try {
            const { data } = await getProductByBarcode(barcode);
            
            setItems(prev => {
                const exists = prev.find(p => p.id === data.id);
                if (exists) {
                    return prev.map(p => p.id === data.id 
                        ? { ...p, quantity_to_remove: p.quantity_to_remove + 1 } 
                        : p
                    );
                }
                return [...prev, { ...data, quantity_to_remove: 1 }];
            });
            
            notify(`${data.name} adicionado`, "success");
        } catch (error) {
            notify("Produto não encontrado", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOut = async () => {
        setLoading(true);
        try {
            // Enviar para o back...
            
            notify("Saída registrada com sucesso!", "success");
            setItems([]);
        } catch (error) {
            notify("Erro ao processar saída", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-gray-50 min-h-screen pb-24">
            <header className="mb-6">
                <h1 className="text-xl font-black text-slate-900">Saída de Estoque</h1>
                <p className="text-slate-500 text-sm">Escaneie os produtos para dar baixa</p>
            </header>

            <button 
                onClick={() => setShowScanner(true)}
                className="w-full py-8 bg-white border-2 border-dashed border-blue-200 rounded-3xl flex flex-col items-center gap-3 text-blue-600 hover:bg-blue-50 transition-all mb-6"
            >
                <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
                    <ScanBarcode size={32} />
                </div>
                <span className="font-bold">Escanear Código de Barras</span>
            </button>

            <div className="space-y-3">
                {items.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                <Package size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800">{item.name}</h4>
                                <p className="text-[10px] text-slate-400 font-mono">QTD ATUAL: {item.stock_quantity}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                                <button 
                                    className="px-2 font-bold text-blue-600"
                                    onClick={() => setItems(prev => prev.map(p => p.id === item.id ? {...p, quantity_to_remove: Math.max(1, p.quantity_to_remove - 1)} : p))}
                                >-</button>
                                <span className="px-3 font-black text-sm">{item.quantity_to_remove}</span>
                                <button 
                                    className="px-2 font-bold text-blue-600"
                                    onClick={() => setItems(prev => prev.map(p => p.id === item.id ? {...p, quantity_to_remove: p.quantity_to_remove + 1} : p))}
                                >+</button>
                            </div>
                            <button 
                                onClick={() => setItems(prev => prev.filter(p => p.id !== item.id))}
                                className="text-red-400 p-1"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {items.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                    <Button 
                        onClick={handleConfirmOut}
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Confirmar Saída ({items.length}) <ChevronRight size={18}/></>}
                    </Button>
                </div>
            )}

            {showScanner && (
                <Scanner onScan={handleScan} onClose={() => setShowScanner(false)} />
            )}
        </div>
    );
}
