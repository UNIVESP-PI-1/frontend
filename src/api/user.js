import { http } from "./http";

export const storeUser = (payload) => http.post('/auth/create_acount', payload);

export const getUsers = () => http.get('/auth');

export const deleteUser = (id) => http.delete(`/auth/${id}`);

export const updateUser = (id, payload) => http.put(`/auth/${id}`, payload);