    import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correctly import jwtDecode

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

// Store and retrieve access token from local storage
const getAccessToken = () => localStorage.getItem('jwt');

// Function to refresh the access token using the current access token
export const refreshToken = async () => {
    const token = localStorage.getItem('jwt'); // Retrieve the token from localStorage

    console.log('Refreshing token... Current token:', token);

    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/refresh', { token: token });

        console.log('Response from API:', response);

        const newAccessToken = response.data.result.token; // Assuming the token is under `data.result.token`

        console.log('New access token:', newAccessToken);

        // Decode the new token to get the expiration time (`exp` field)
        const decodedToken = jwtDecode(newAccessToken);

        console.log('Decoded token:', decodedToken);

        // Store the new access token and its expiration time (from `exp`)
        localStorage.setItem('jwt', newAccessToken);
        localStorage.setItem('tokenExpiration', Date.now() + decodedToken.exp * 1000); // Convert `exp` to milliseconds

        return newAccessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

// Queue to store requests while the token is refreshing
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Request interceptor: Check token expiration and refresh if necessary
axiosInstance.interceptors.request.use(
    async (config) => {
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const currentTime = Date.now();

        if (tokenExpiration && currentTime >= tokenExpiration - 300000) {
            console.log('Token expired or about to expire. Refreshing token...');

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const newAccessToken = await refreshToken(); // Refresh the token
                    config.headers['Authorization'] = `Bearer ${newAccessToken}`; // Attach new token to request
                    processQueue(null, newAccessToken);
                } catch (error) {
                    processQueue(error, null);
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token) => {
                        config.headers['Authorization'] = `Bearer ${token}`;
                        resolve(config);
                    },
                    reject: (error) => {
                        reject(error);
                    }
                });
            });
        } else {
            const accessToken = getAccessToken();
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`; // Attach the existing token to the request
            }
        }

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor: Retry request after refreshing token on 401 error
axiosInstance.interceptors.response.use(
    response => response, // If the response is OK, just return it
    async (error) => {
        const originalRequest = error.config;

        // If the error response is 401, try refreshing the token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Avoid infinite retry loop

            try {
                console.log('happen here response')
                const newAccessToken = await refreshToken(); // Refresh the token
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // Set new token in the retry

                // Retry the original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Optionally: logout user or redirect to login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // If not 401, reject the error
    }
);

export default axiosInstance;
