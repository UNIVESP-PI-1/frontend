import { useState } from 'react';

export function useCep(onSuccess) {
    const [loadingCep, setLoadingCep] = useState(false);
    const [cepError, setCepError] = useState(null);

    const fetchFromBrasilApi = async (cep) => {
        const response = await fetch(
            `https://brasilapi.com.br/api/cep/v1/${cep}`
        );

        if (!response.ok) {
            throw new Error('BrasilAPI falhou');
        }

        const data = await response.json();

        return {
            street: data.street,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state
        };
    };

    const fetchFromViaCep = async (cep) => {
        const response = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!response.ok) {
            throw new Error('ViaCEP falhou');
        }

        const data = await response.json();

        if (data.erro) {
            throw new Error('CEP não encontrado');
        }

        return {
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
        };
    };

    const fetchCep = async (cep) => {
        const cleanCep = cep.replace(/\D/g, '');

        if (cleanCep.length !== 8) return;

        setLoadingCep(true);
        setCepError(null);

        try {
            // 1️⃣ tenta BrasilAPI
            let address;

            try {
                address = await fetchFromBrasilApi(cleanCep);
            } catch (error) {
                console.warn('BrasilAPI falhou, tentando ViaCEP...');
                address = await fetchFromViaCep(cleanCep);
            }

            if (onSuccess) {
                onSuccess(address);
            }

        } catch (error) {
            setCepError("Não foi possível buscar o CEP.");
        } finally {
            setLoadingCep(false);
        }
    };

    return { fetchCep, loadingCep, cepError };
}
