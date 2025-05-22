export const baseURL = import.meta.env.VITE_API_BASE_URL;


export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const setAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
}

export const removeToken = () => {
    return localStorage.removeItem("accessToken");
}

