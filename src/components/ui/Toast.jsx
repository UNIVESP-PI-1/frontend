import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const types = {

    success: { 
        icon: CheckCircle, 
        color: 'bg-dark-2 text-white border-green-700' 
    },
    error: { 
        icon: XCircle, 
        color: 'bg-red-600 text-white border-red-700' 
    },
    info: { 
        icon: Info, 
        color: 'bg-blue-600 text-white border-blue-700' 
    },
    warning: { 
        icon: AlertTriangle, 
        color: 'bg-amber-500 text-white border-amber-600' 
    },
};

export default function Toast({ message, type = 'success', onClose }) {
    const { icon: Icon, color } = types[type];

    return (
        <div className={`fixed bottom-5 z-[100] right-5 flex items-center gap-3 p-4 rounded-lg border shadow-lg animate-in fade-in slide-in-from-right-5 ${color}`}>
            
            <Icon size={28} className="shrink-0 mt-0.5 text-white" />

            <div className="flex-1">
                <p className="text-md font-semibold leading-tight text-white">{message}</p>
            </div>

            <button 
                onClick={onClose} 
                className="hover:bg-white/20 transition-colors p-1 rounded-md text-white"
            >
                <X size={22} />
            </button>
        </div>
    );
}