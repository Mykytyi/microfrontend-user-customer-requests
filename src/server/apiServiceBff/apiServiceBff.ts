/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */

import FormData from 'form-data';
import fetch, {
  Response,
  RequestInfo,
  RequestInit,
  BodyInit,
} from 'node-fetch';
import { zipkinNodeFetch } from '@a1/gucci-common-tracing/lib/node';
import logger from '../logger';
import BackendServiceError from '../utils/BackendServiceError';
import { IQueryParams } from '../type-definitions';

type ResponseType =
  | 'json'
  | 'text'
  | 'blob'
  | 'arraybuffer'
  | 'buffer'
  | 'originResponse'

interface IApiConfig extends RequestInit {
  responseType?: ResponseType;
  queryParams?: IQueryParams;
}

interface WrappedFetch {
  [key: string]: typeof fetch | null;
}

export class ApiServiceBff {
  static tracerUrl = '/gucci/zipkin/api/v2/spans';

  private static wrappedFetch: WrappedFetch = {};

  private wrappedFetch = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    const remoteServiceName = new URL((input as string)).hostname; // example: microservice-serviceName.namespace-dev
    const parsedRemoteService = remoteServiceName.split('.')[0]; // example: microservice-serviceName

    if (!ApiServiceBff.wrappedFetch[parsedRemoteService]) {
      const enableTracing = process.env.NODE_ENV === 'production'
        && ApiServiceBff.tracerUrl
        && (ApiServiceBff.tracerUrl.indexOf('/') === 0 || ApiServiceBff.tracerUrl.indexOf('http') === 0);

      const localServiceName = 'microfrontend-user-customer-requests';

      ApiServiceBff.wrappedFetch[parsedRemoteService] = enableTracing
        ? zipkinNodeFetch({
          tracerUrl: ApiServiceBff.tracerUrl,
          localServiceName,
          remoteServiceName: parsedRemoteService,
        }) : fetch;
    }

    return (ApiServiceBff.wrappedFetch[parsedRemoteService] as typeof fetch)(input, init);
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

  private getFullURL = (url: string, queryParams?: IQueryParams) => {
    return `${url}${this.queryParamsStringify(queryParams)}`;
  };

  private fetchHandler = (url: string, config: IApiConfig) => {
    const { responseType, queryParams, ...restConfig } = config;

    const fullUrl = this.getFullURL(url, queryParams);

    logger.debug('Server fetchHandler. Request to: %s, Config: %o', url, config);
    return this.wrappedFetch(fullUrl, restConfig)
      .then((response: Response) => {
        if (!response.ok) {
          logger.warn('Error while fetch url: %s, because response status: %s and statusText: %s', fullUrl, response.status, response.statusText);

          return response.text().then((text: string | undefined) => {
            // This regular expression is for removing unnecessary trailing commas in JSON strings
            const fixedText = text?.replace(/,(?!\s*?[{["\w])|(?<=[{[]\s*?),/g, '') || '';
            const errorObject = fixedText ? JSON.parse(fixedText) : undefined;
            if (errorObject?.error?.msg) {
              throw new BackendServiceError(response.status, response.statusText, errorObject.error.msg);
            }
            throw new BackendServiceError(response.status, response.statusText, text);
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
          case 'buffer':
            return response.buffer();
          case 'originResponse':
            return response;
          default:
            return response.text().then((textResponse) => {
              if (!textResponse.trim()) return null;
              return JSON.parse(textResponse);
            });
        }
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };

  public get = <R = any>(url: string, config?: IApiConfig): Promise<R> => {
    const headers: any = {};
    return this.fetchHandler(url, {
      method: 'GET',
      headers,
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
      headers,
      body,
      ...config,
    });
  };

  public patch = <T = any, R = any>(url: string, data?: T, config?: IApiConfig): Promise<R> => {
    const headers: any = {
      'Content-Type': 'application/json',
    };
    return this.fetchHandler(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
      ...config,
    });
  };

  public delete = <R = any>(url: string, config?: IApiConfig): Promise<R> => {
    const headers: any = {};
    return this.fetchHandler(url, {
      method: 'DELETE',
      headers,
      ...config,
    });
  };
}

export const apiServiceBff = new ApiServiceBff();
