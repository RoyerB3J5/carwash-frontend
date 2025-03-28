import { useAuth } from "../context/authContext";
interface RequestProps<TData = unknown> {
  url: string;
  method: string;
  data?: TData;
}

type ApiMethods = {
  get: <TResponse>(url: string) => Promise<TResponse>;
  post: <TData, TResponse>(url: string, data: TData) => Promise<TResponse>;
  put: <TData, TResponse>(url: string, data: TData) => Promise<TResponse>;
  patch: <TData, TResponse>(url: string, data: TData) => Promise<TResponse>;
  delete: <TResponse>(url: string) => Promise<TResponse>;
};
export const useApi = (): ApiMethods => {
  const { getToken } = useAuth();
  const makeRequest = async <TData, TResponse>({
    url,
    method,
    data,
  }: RequestProps<TData>): Promise<TResponse> => {
    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:5555/${url}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error en la solicitud");
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error en la solicitud:", error.message);
      } else {
        console.log("Error en la solicitud:", error);
      }
      throw error;
    }
  };
  return {
    get: <TResponse>(url: string) =>
      makeRequest<undefined, TResponse>({
        url,
        method: "GET",
      }),
    post: <TData, TResponse>(url: string, data: TData) =>
      makeRequest<TData, TResponse>({ url, method: "POST", data }),
    put: <TData, TResponse>(url: string, data: TData) =>
      makeRequest<TData, TResponse>({ url, method: "PUT", data }),
    patch: <TData, TResponse>(url: string, data?: TData) =>
      makeRequest<TData, TResponse>({
        url,
        method: "PATCH",
        data: data as TData,
      }),
    delete: <TResponse>(url: string) =>
      makeRequest<undefined, TResponse>({ url, method: "DELETE" }),
  };
};
