/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */

import { browserTracingFetch } from '@a1/gucci-common-tracing/lib/browser';
import { IQueryParams } from '../type-definitions';

type ResponseType =
  | 'json'
  | 'text'
  | 'blob'
  | 'arraybuffer'
  | 'originResponse'

interface IApiConfig extends RequestInit {
  responseType?: ResponseType;
  queryParams?: IQueryParams;
}

export class ApiService {
  static baseURL = 'http://localhost:9010/api';

  static tracerUrl = '';

  static wrappedFetch: typeof fetch | null = null;

  static setBaseUrl = (url?: string): void => {
    console.info('Set base URL: ', url);
    if (url) this.baseURL = url;
  };

  static setTracerUrl = (url?: string): void => {
    console.info('Set tracer URL: ', url);
    if (url) this.tracerUrl = url;
  };

  private wrappedFetch = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    if (!ApiService.wrappedFetch) {
      const enableTracing = process.env.NODE_ENV === 'production'
        && ApiService.tracerUrl
        && (ApiService.tracerUrl.indexOf('/') === 0 || ApiService.tracerUrl.indexOf('http') === 0);

      console.info('Enable tracing: ', enableTracing);

      const localServiceName = 'microfrontend-user-customer-requests-client';
      const remoteServiceName = 'microfrontend-user-customer-requests';

      ApiService.wrappedFetch = enableTracing
        ? browserTracingFetch({
          tracerUrl: ApiService.tracerUrl,
          localServiceName,
          remoteServiceName,
        }) : fetch.bind(window);
    }

    return ApiService.wrappedFetch(input, init);
  };

  public queryParamsStringify = (params?: IQueryParams): string => {
    if (!params) {
      return '';
    }

    const query = Object.keys(params)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');

    return `?${query}`;
  };

  private getFullURL = (baseUrl: string, url: string, queryParams?: IQueryParams) => {
    return `${baseUrl}${url}${this.queryParamsStringify(queryParams)}`;
  };

  private fetchHandler = (url: string, config: IApiConfig) => {
    const { responseType, queryParams, ...restConfig } = config;

    const fullUrl = this.getFullURL(ApiService.baseURL, url, queryParams);

    return this.wrappedFetch(fullUrl, restConfig)
      .then((response) => {
        if (!response.ok) {
          console.error('Error while fetch url: %s, because response status: %s and statusText: %s', fullUrl, response.status, response.statusText);
          return response.text().then((text) => {
            throw new Error(text);
          });
        }

        switch (responseType) {
          case 'json':
            return response.json();
          case 'text':
            return response.text();
          case 'blob':
            return response.blob();
          case 'arraybuffer':
            return response.arrayBuffer();
          case 'originResponse':
            return response;
          default:
            return response.json();
        }
      })
      .then((data) => {
        console.debug('FetchResult: ', url, data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };

  public get = <R = any>(url: string, config?: IApiConfig): Promise<R> => {
    return this.fetchHandler(url, {
      method: 'GET',
      credentials: 'same-origin',
      ...config,
    });
  };

  public post = <T = any, R = any>(url: string, data?: T, config?: IApiConfig): Promise<R> => {
    let body: BodyInit;
    let headers: HeadersInit = {};

    if (data instanceof FormData) {
      body = data;
    } else {
      body = JSON.stringify(data);
      headers = {
        'Content-Type': 'application/json',
      };
    }

    return this.fetchHandler(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers,
      body,
      ...config,
    });
  };

  public put = <T = any, R = any>(url: string, data?: T, config?: IApiConfig): Promise<R> => {
    let body: BodyInit;
    let headers: HeadersInit = {};

    if (data instanceof FormData) {
      body = data;
    } else {
      body = JSON.stringify(data);
      headers = {
        'Content-Type': 'application/json',
      };
    }

    return this.fetchHandler(url, {
      method: 'PUT',
      credentials: 'same-origin',
      headers,
      body,
      ...config,
    });
  };

  public patch = <T = any, R = any>(url: string, data?: T, config?: IApiConfig): Promise<R> => {
    return this.fetchHandler(url, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...config,
    });
  };

  public delete = <R = any>(url: string, config?: IApiConfig): Promise<R> => {
    return this.fetchHandler(url, {
      method: 'DELETE',
      credentials: 'same-origin',
      ...config,
    });
  };
}

export const apiService = new ApiService();
