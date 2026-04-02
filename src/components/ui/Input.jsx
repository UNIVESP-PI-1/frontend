import React from 'react';

/**
 * Reusable Generic Input
 * @param {string} label - Text from the label above the input
 * @param {LucideIcon} icon - Lucide-React icon (optional)
 * @param {string} error - Error message (optional)
 * @param {string} className - Extra classes for the container
 */
export default function Input({ label, loading, icon: Icon, error, className = '', ...props }) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}

        <input
          {...props}
          className={`
            w-full py-3 rounded-lg outline-none transition border text-gray-800
            placeholder:text-gray-400
            ${Icon ? 'pl-10' : 'pl-4'} 
            ${props.type === 'password' ? 'pr-10' : 'pr-4'}
            ${error 
              ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
              : 'border-gray-300 focus:ring-2 focus:ring-dark-2'}
            ${props.disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
          `}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 font-medium animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
