/**
 * Converts centavos (integer) into a formatted string BRL
 * Ex: 15000 -> "R$ 150,00"
 */
export const formatCurrency = (value) => {
    if (!value && value !== 0) return "R$ 0,00";
    
    const cleanValue = value.toString().replace(/\D/g, "");
    
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(cleanValue / 100);
};

/**
 * Converts a formatted string from BRL to centavos (integer).
 * Ex: "R$ 150,00" -> 15000
 */
export const parseToCents = (formattedValue) => {
    if (!formattedValue) return 0;
    
    const cleanValue = formattedValue.toString().replace(/\D/g, "");
    
    return parseInt(cleanValue) || 0;
};
