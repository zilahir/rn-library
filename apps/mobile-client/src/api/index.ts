import axios from "axios";

import { ApiEndpoint, apiEndpoints } from "./apiEndpoints";

type Method = "POST" | "GET" | "PATCH" | "DELETE";

type Envriontment = "development" | "production";

const currentEnv: Envriontment = "development";

const baseUrl: Record<Envriontment, string> = {
  development: "http://localhost:3003",
  production: "https://lorem.ipsum",
};

const apiClient = axios.create({
  baseURL: baseUrl[currentEnv],
});

export default apiClient;

interface IApi<K extends keyof typeof apiEndpoints> {
  path: (typeof apiEndpoints)[K][any];
  data?: {
    [key: string]: any;
  };
  method: Method;
}

/**
 * ActionRequest
 * @memberof Api
 * @param {object} root0 An object containing the API endpoint, method and data
 * @param {string} root0.path The path to the API endpoint
 * @param {Method} root0.method HTTP method to be used
 * @param {object} root0.data Optional data to be sent to the server
 * @returns {Promise} A function which returns a Promise of type T containing the response data
 */
export async function Api<T>({
  path,
  method,
  data,
}: IApi<ApiEndpoint>): Promise<T> {
  if (method === "GET") {
    const apiResponse = await apiClient.get<T>(path);
    return apiResponse.data;
  } else if (method === "POST") {
    const apiResponse = await apiClient.post<T>(path, data);
    return apiResponse.data;
  }
  return true as T;
}
