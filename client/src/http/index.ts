import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:8888/api/v1/";

// 1. Create instance of axious to be used in all res/req
const $api: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // to make cookies added to each request
});

// Create interceptor for request with injection of access token in Header
$api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Crerate interceptor for responce to check 401 responce and call refresh

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            try {
                const response = await axios.get(
                    `${API_URL}customers/refresh`,
                    {
                        withCredentials: true,
                    }
                );
                const newAccessToken = response.data.payload.accessToken;
                localStorage.setItem("accessToken", newAccessToken);

                // Retry the original request
                return $api.request(originalRequest);
            } catch (err) {
                // Handle the error
                console.error("not authorised");
            }
        }

        return Promise.reject(error);
    }
);

export default $api;

// api.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error) => {
//       const originalRequest = error.config;
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         // This is where you would handle refreshing the access token
//         // For example, assuming you have a route '/refresh-token' that returns a new access token:
//         const { accessToken } = await api.post('/refresh-token');
//         localStorage.setItem('accessToken', accessToken);
//         return api(originalRequest);
//       }
//       return Promise.reject(error);
//     }
//   );
