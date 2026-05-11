import React, { useEffect, useState } from 'react';
import { Package, Plus, Search, Edit, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';
import ConfirmModal from '../../../components/ui/ConfirmModal';
import ProductModal from './ProductModal'; 
import { getProducts, deleteProduct } from '../../../api/product';
import { useNotification } from '../../../context/NotificationContext';

export default function ProductIndex() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { notify } = useNotification();

    const [productModalOpen, setProductModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value / 100);
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await getProducts();
            setProducts(data || []);
        } catch (error) {
            notify("Erro ao carregar produtos", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setProductModalOpen(true);
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteProduct(selectedProduct.id);
            notify("Produto removido com sucesso", "success");
            setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
            setDeleteModalOpen(false);
        } catch (error) {
            notify("Erro ao excluir produto", "error");
        } finally {
            setIsDeleting(false);
            setSelectedProduct(null);
        }
    };

    const ProductCard = ({ product }) => (
        <div className={`bg-white p-5 border-b border-gray-100 last:border-0 flex flex-col gap-4 ${!product.status && 'opacity-60'}`}>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${!product.status ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-600'}`}>
                        <Package size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-900">{product.name}</h4>
                            {!product.status && <span className="text-[8px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-black uppercase">Inativo</span>}
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase">SKU: {product.sku}</span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-green-600">{formatCurrency(product.sale_price)}</p>
                    <div className="flex items-center gap-1 justify-end">
                        <span className={`text-[10px] font-bold ${product.stock_quantity <= product.min_stock ? 'text-red-500' : 'text-gray-400'}`}>
                            Qtd: {product.stock_quantity}
                        </span>
                        {product.stock_quantity <= product.min_stock && <AlertTriangle size={10} className="text-red-500" />}
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="flex-1 py-2 bg-amber-50 text-amber-600 rounded-xl flex justify-center items-center gap-2 text-xs font-bold hover:bg-amber-100">
                    <Edit size={16} /> Editar
                </button>
                <button onClick={() => handleDeleteClick(product)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );

    const columns = [
        {
            header: 'Status',
            width: '80px',
            render: (p) => (
                <div className={`w-2 h-2 rounded-full mx-auto ${p.status ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-gray-300'}`} />
            )
        },
        {
            header: 'Produto',
            render: (p) => (
                <div className={`flex items-center gap-3 ${!p.status && 'opacity-50'}`}>
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        <Package size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-800">{p.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono uppercase">SKU: {p.sku}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Estoque',
            render: (p) => (
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                        <span className={`font-bold ${p.stock_quantity <= p.min_stock ? 'text-red-600' : 'text-gray-700'}`}>
                            {p.stock_quantity}
                        </span>
                        {p.stock_quantity <= p.min_stock && <AlertTriangle size={14} className="text-red-500 animate-pulse" />}
                    </div>
                    <span className="text-[10px] text-gray-400">Min: {p.min_stock}</span>
                </div>
            )
        },
        {
            header: 'Preço Venda',
            render: (p) => <span className="font-semibold text-gray-700">{formatCurrency(p.sale_price)}</span>
        },
        {
            header: 'Ações',
            align: 'right',
            render: (p) => (
                <div className="flex justify-end gap-1">
                    <Button variant="outline" className="px-2 border-none text-amber-600 hover:bg-amber-50" icon={Edit} onClick={() => handleEdit(p)} />
                    <Button variant="outline" className="px-2 border-none text-red-600 hover:bg-red-50" icon={Trash2} onClick={() => handleDeleteClick(p)} />
                </div>
            )
        }
    ];

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl shadow-blue-100">
                        <Package size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Produtos</h1>
                        <p className="text-slate-500 text-sm">Gerencie seu inventário e preços</p>
                    </div>
                </div>
                <Button
                    variant="primary"
                    icon={Plus}
                    onClick={() => { setSelectedProduct(null); setProductModalOpen(true); }}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Novo Produto
                </Button>
            </div>

            <div className="bg-white p-4 rounded-t-[2rem] border border-slate-100 border-b-0">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou SKU..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-b-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <div className="md:hidden">
                    {loading ? (
                        <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-blue-600" /></div>
                    ) : (
                        filteredProducts.map(p => <ProductCard key={p.id} product={p} />)
                    )}
                </div>
                <div className="hidden md:block">
                    <DataTable columns={columns} data={filteredProducts} loading={loading} />
                </div>
            </div>

            <ProductModal
                isOpen={productModalOpen}
                onClose={() => setProductModalOpen(false)}
                onSuccess={fetchProducts}
                product={selectedProduct}
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                loading={isDeleting}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Excluir Produto"
                message={<span>Deseja excluir o produto <b>{selectedProduct?.name}</b>?</span>}
            />
        </div>
    );
}
