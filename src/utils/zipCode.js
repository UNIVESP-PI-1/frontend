export const formatZipCode = (value) => {
    if (!value) return "";
        const cleanValue = value.toString().replace(/\D/g, "");
    
    return cleanValue
        .replace(/^(\d{5})(\d)/, "$1-$2")
        .substring(0, 9);
};

export const parseOnlyNumbers = (formattedValue) => {
    if (!formattedValue) return "";
    
    return formattedValue.toString().replace(/\D/g, "");
};
