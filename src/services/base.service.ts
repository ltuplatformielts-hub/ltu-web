import axios from "axios";
import Cookie from "js-cookie";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) throw new Error("Can not connect to the database.");

const baseApiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

baseApiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookie.get("access_token");

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error),
);

baseApiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._entry) {
      originalRequest._entry = true;
      const refreshToken = Cookie.get("refresh_token");

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${baseURL}/auth/me`,
            { refreshToken },
            { withCredentials: true },
          );

          if (res.status === 201 || res.status === 200) {
            const newAccessToken = Cookie.get("access_token");

            if (newAccessToken) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return baseApiClient(originalRequest);
            }
          }
        } catch (error) {
          Cookie.remove("access_token");
          Cookie.remove("refresh_token");
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default baseApiClient;
