import { useState, useCallback } from 'react';

export function useCity() {
    const [cities, setCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);

    const fetchCities = useCallback(async (uf) => {
        if (!uf) return;
        setLoadingCities(true);
        try {
            // API do IBGE para buscar cidades por UF
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`);
            const data = await response.json();
            
            setCities(data.map(city => ({
                value: city.nome,
                label: city.nome
            })));
        } catch (error) {
            console.error("Erro ao buscar cidades:", error);
        } finally {
            setLoadingCities(false);
        }
    }, []);

    return { cities, fetchCities, loadingCities };
}
