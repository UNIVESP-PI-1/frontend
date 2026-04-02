import React from 'react';

export default function Select({ label, loading, name, value, onChange, options, icon: Icon, className = "", disabled, placeholder, ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className} ${disabled ? 'opacity-60' : ''}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-primary ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {Icon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${disabled ? 'text-gray-300' : 'text-gray-400 group-focus-within:text-dark-2'}`}>
            <Icon size={18} />
          </div>
        )}
        
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full h-11 bg-white border border-gray-200 rounded-lg
            ${Icon ? 'pl-10' : 'pl-4'} pr-4
            ${disabled ? 'cursor-not-allowed bg-gray-50' : 'cursor-pointer'}
            text-gray-800 outline-none
            focus:border-dark-2 focus:ring-2 focus:ring-green-100
            transition-all appearance-none
          `}
          {...props}
        >
          <option value="" disabled>{placeholder || 'Selecione...'}</option>
          
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${disabled ? 'text-gray-200' : 'text-gray-400'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
