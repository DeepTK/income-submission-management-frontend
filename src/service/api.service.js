import axios from "axios";
import { API_URL } from "../utils/constants";

export const apiRequest = axios.create({
  baseURL: API_URL || "http://localhost:8080",
});

const api = async ({ route, method = "GET", data = {} }) => {
  try {
    let headers = {};
    let finalData = data;

    const token = localStorage.getItem("token");

    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    } else {
      headers = { "Content-Type": "application/json" };
    }

    const url = new URL(route, API_URL);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    const file = Object.values(data).find((value) => value instanceof File);

    if (file) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      finalData = formData;
      headers = {};
    }

    const response = await apiRequest.request({
      url: url.pathname + url.search,
      method,
      headers,
      params: queryParams,
      data: finalData,
    });

    return response;
  } catch (error) {
    return error;
  }
};

api.get = (route, data) => api({ route, method: "GET", data });
api.post = (route, data) => api({ route, method: "POST", data });
api.put = (route, data) => api({ route, method: "PUT", data });
api.delete = (route, data) => api({ route, method: "DELETE", data });

export default api;
