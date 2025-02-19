import { BASE_URL } from '../constants';
import { FileRequestData } from '../types/api/profie';
function request<T>(url: string, config: RequestInit = {}): Promise<T> {
  return fetch(`${BASE_URL}/` + url, config)
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          if (data.reason) {
            throw data.reason;
          }

          return console.log('error', data);
        });
      }
      const contentType = response.headers.get('content-type');
      const isJson =
        contentType && contentType.indexOf('application/json') !== -1;
      const isText = contentType && contentType.indexOf('text/plain') !== -1;
      if (isJson) {
        return response.json();
      }
      if (isText) {
        return response.text();
      }
      return response;
    })
    .then(data => data);
}

export const API = {
  get: <T>(url: string): Promise<T> => {
    return request(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  getServiceId: <T, TResponse>(
    url: string,
    queriesData?: string
  ): Promise<TResponse> => {
    const urlWithQueries = queriesData ? `${url}?${queriesData}` : url;
    return request(urlWithQueries, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  },
  post: <TBody, TResponse>(url: string, body?: TBody): Promise<TResponse> =>
    request<TResponse>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }),
  put: <TBody, TResponse>(url: string, body?: TBody): Promise<TResponse> =>
    request<TResponse>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }),
  putFile: <TResponse>(
    url: string,
    data: FileRequestData
  ): Promise<TResponse> => {
    const formData = new FormData();
    formData.append(data.fileName, data.file);
    return request<TResponse>(url, {
      method: 'PUT',
      body: formData,
      credentials: 'include',
      headers: {
        accept: 'application/json'
      }
    });
  }
};
