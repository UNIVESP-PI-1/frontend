import React, { useEffect, useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, Loader2, Mail } from 'lucide-react';
import Button from '../../../components/ui/Button';
import DataTable from '../../../components/ui/DataTable';
import ConfirmModal from '../../../components/ui/ConfirmModal';
import UserModal from './UserModal';
import { getUsers, deleteUser } from '../../../api/user';
import { useNotification } from '../../../context/NotificationContext';

export default function UserIndex() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { notify } = useNotification();

    const [userModalOpen, setUserModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await getUsers();
            setUsers(data || []);
        } catch (error) {
            notify("Erro ao carregar usuários", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteUser(selectedUser.id);
            notify("Usuário removido com sucesso", "success");
            setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
            setDeleteModalOpen(false);
        } catch (error) {
            notify("Erro ao excluir usuário", "error");
        } finally {
            setIsDeleting(false);
            setSelectedUser(null);
        }
    };

    const columns = [
        {
            header: 'Usuário',
            render: (user) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        <Users size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-800">{user.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">ID: #{user.id}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'E-mail',
            render: (user) => (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={14} className="text-gray-400" />
                    {user.email}
                </div>
            )
        },
        {
            header: 'Ações',
            align: 'right',
            render: (user) => (
                <div className="flex justify-end gap-1">
                    <Button variant="outline" className="px-2 border-none text-amber-600 hover:bg-amber-50" icon={Edit} onClick={() => { setSelectedUser(user); setUserModalOpen(true); }} />
                    <Button variant="outline" className="px-2 border-none text-red-600 hover:bg-red-50" icon={Trash2} onClick={() => { setSelectedUser(user); setDeleteModalOpen(true); }} />
                </div>
            )
        }
    ];

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-indigo-100">
                        <Users size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Usuários</h1>
                        <p className="text-slate-500 text-sm">Gerencie o acesso ao sistema</p>
                    </div>
                </div>
                <Button
                    variant="primary" icon={Plus}
                    onClick={() => { setSelectedUser(null); setUserModalOpen(true); }}
                    className="bg-indigo-600 hover:bg-indigo-700"
                >
                    Novo Usuário
                </Button>
            </div>

            <div className="bg-white p-4 rounded-t-[2rem] border border-slate-100 border-b-0">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-b-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <DataTable columns={columns} data={filteredUsers} loading={loading} />
            </div>

            <UserModal 
                isOpen={userModalOpen} 
                onClose={() => setUserModalOpen(false)} 
                onSuccess={fetchUsers} 
                user={selectedUser} 
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                loading={isDeleting}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Excluir Usuário"
                message={<span>Deseja remover o usuário <b>{selectedUser?.name}</b>?</span>}
            />
        </div>
    );
}