import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button Component
 * @param {LucideIcon} icon - Lucide-React icon (optional)
 * @param {boolean} loading - Shows spinner and disables button
 * @param {string} variant - 'primary' (green) or 'outline' (white/gray)
 */
export default function Button({ 
  children, 
  icon: Icon, 
  loading = false, 
  variant = 'primary', 
  className = '', 
  disabled, 
  ...props 
}) {
  
  const variants = {
    primary: 'bg-dark-2 hover:bg-dark text-white shadow-sm border-transparent',
    outline: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm',
    secondary: 'bg-secondary hover:bg-primary text-white shadow-sm border-transparent',
};

  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`
        flex items-center justify-center gap-2 
        px-6 py-2.5 rounded-lg font-medium 
        transition-all active:scale-[0.98]
        disabled:opacity-60 disabled:cursor-not-allowed
        border cursor-pointer
        ${variants[variant]}
        ${className}
      `}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        Icon && <Icon size={20} />
      )}
      
      {children}
    </button>
  );
}
