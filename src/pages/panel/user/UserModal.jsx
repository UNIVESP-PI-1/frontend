import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Save, Loader2 } from 'lucide-react';
import { storeUser, updateUser } from '../../../api/user';
import { useNotification } from '../../../context/NotificationContext';

export default function UserModal({ isOpen, onClose, onSuccess, user }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { notify } = useNotification();

    const isEditing = !!user;

    useEffect(() => {
        if (isOpen) {
            setName(user?.name || '');
            setEmail(user?.email || '');
            setPassword('');
        }
    }, [isOpen, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = { name, email };
        if (password) payload.password = password;

        try {
            if (isEditing) {
                await updateUser(user.id, payload);
                notify("Usuário atualizado com sucesso!", "success");
            } else {
                await storeUser(payload);
                notify("Usuário criado com sucesso!", "success");
            }
            onSuccess();
            onClose();
        } catch (error) {
            notify("Erro ao salvar usuário.", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-lg text-white">
                            <User size={20} />
                        </div>
                        <h2 className="font-bold text-gray-800 text-lg">
                            {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-400">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-[11px] font-black uppercase text-gray-400 mb-2 ml-1">Nome Completo</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input
                                type="text" required value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-black uppercase text-gray-400 mb-2 ml-1">E-mail</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input
                                type="email" required value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-black uppercase text-gray-400 mb-2 ml-1">
                            {isEditing ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input
                                type="password"
                                required={!isEditing}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-2xl font-bold text-sm">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading} className="flex-[2] py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> {isEditing ? 'Salvar' : 'Criar'}</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}