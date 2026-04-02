import http from "./http";

export const storeCategory = (data) => {
    return http.post('category/create', data)
}

export const getCategories = () => http.get('/category');
export const getcategory = (id) => http.get(`/category/${id}`);
export const updateCategory = (id, data) => http.put(`/category/${id}`, data);
export const deleteCategory = (id) => http.delete(`/category/${id}`);