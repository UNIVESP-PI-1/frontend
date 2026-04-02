import { http } from "./http";

export const loginRequest = (email, password) => {
    return http.post('/auth/login', {
        email: email,
        password: password
    });
};

/* Password Recovery */
export const requestCode = (email) => {
    return http.post('password-reset/request', {email});
}

export const validateCode = (email, code) => {
    return http.post('password-reset/validate', {email, code});
}

export const changePassword = (email, code, password) => {
    return http.post('password-reset/reset', {email, code, password})
}
