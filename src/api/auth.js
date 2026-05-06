import { http } from "./http";

export const loginRequest = (email, password) => {
    return http.post('/auth/login', {
        email: email,
        password: password
    });
};
