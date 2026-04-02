import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({
    label = "Logotipo",
    preview,
    fileInputRef,
    onChange,
    onRemove,
    className = ""
}) {
    const [isDragging, setIsDragging] = useState(false);

    // Gerencia a entrada do arquivo arrastado
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    // Gerencia a saída do arquivo (quando o usuário desiste de soltar)
    const handleDragLeave = () => {
        setIsDragging(false);
    };

    // Gerencia o drop do arquivo
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            // Criamos um evento sintético para reutilizar sua lógica de handleLogoChange original
            const syntheticEvent = {
                target: { files }
            };
            onChange(syntheticEvent);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                    relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer min-h-[180px]
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-inner'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                    }
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={onChange}
                />

                {preview ? (
                    <div className="relative group/preview">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-36 h-36 object-contain rounded-lg shadow-sm bg-white p-2"
                        />
                        {onRemove && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove();
                                }}
                                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        )}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <span className="text-[10px] bg-white/90 px-2 py-1 rounded shadow text-gray-600 font-bold uppercase">Trocar Imagem</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center">
                        <div className={`
                            p-4 rounded-full shadow-sm mb-3 transition-transform duration-300
                            ${isDragging ? 'bg-blue-600 text-white scale-110' : 'bg-white text-gray-400'}
                        `}>
                            {isDragging ? <ImageIcon size={28} /> : <Upload size={28} />}
                        </div>

                        <p className="text-sm font-semibold text-gray-700">
                            {isDragging ? "Solte a imagem aqui" : "Clique ou arraste a imagem"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG ou GIF até 5MB
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
