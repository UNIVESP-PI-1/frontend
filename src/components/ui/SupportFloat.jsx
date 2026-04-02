import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function SupportFloat() {
    const [isOpen, setIsOpen] = useState(false);
    const [userMessage, setUserMessage] = useState('');

    const whatsappNumber = "5519971553715";

    const handleSendMessage = (e) => {
        if (e) e.preventDefault();
        if (!userMessage.trim()) return;

        const encodedMsg = encodeURIComponent(userMessage);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

        window.open(whatsappUrl, '_blank');
        setUserMessage('');
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage(e);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-72 overflow-hidden animate-in fade-in zoom-in slide-in-from-bottom-10 duration-200">
                    <div className="bg-[#25D366] p-4 text-white flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-sm">Suporte EclesiaSoft</h4>
                            <p className="text-[10px] opacity-90">Normalmente responde em instantes</p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 rounded-full p-1">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-4 bg-gray-50">
                        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm mb-4 border border-gray-100">
                            <p className="text-sm text-gray-700">Olá! Como posso ajudar você hoje? 👋</p>
                        </div>

                        <div className="relative">
                            <textarea
                                autoFocus
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Digite sua mensagem..."
                                className="w-full border border-gray-200 rounded-xl p-3 pr-10 text-sm focus:ring-2 focus:ring-[#25D366] focus:border-transparent outline-none resize-none h-24 shadow-inner"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!userMessage.trim()}
                                className="cursor-pointer absolute bottom-3 right-3 text-[#25D366] hover:scale-110 disabled:text-gray-300 disabled:scale-100 transition-all"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-row-reverse items-center gap-3 group">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`${isOpen ? 'cursor-pointer bg-gray-800 rotate-90' : 'bg-[#25D366]'} text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 active:scale-95 border-2 border-white/10`}
                >
                    {isOpen ? <X size={28} /> : <MessageCircle size={28} fill="currentColor" />}
                </button>

                {!isOpen && (
                    <span className="bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-gray-700 whitespace-nowrap pointer-events-none">
                        Posso ajudar?
                    </span>
                )}
            </div>
        </div>
    );
}
