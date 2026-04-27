import http from "./http";

export const storeProduct = (data) => {
    return http.post('product/create', data)
}

export const getProducts = () => http.get('/product');
export const getProduct = (id) => http.get(`/product/${id}`);
export const updateProduct = (id, data) => http.put(`/product/${id}`, data);
export const deleteProduct = (id) => http.delete(`/product/${id}`);