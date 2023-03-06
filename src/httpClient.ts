import axios, { CancelToken } from "axios";
import merge from "deepmerge";

export interface ApiRequest {}
export interface ApiResponse {}

interface ApiParams {
  language?: string;
}

/** Request options */
type RequestOptions<P extends ApiParams> = {
  params?: P;
  cancelToken?: CancelToken;
};

function devMockApi() {
  const params = new URLSearchParams(window.location.search);
  return Array.from(params).find(([key, value]) => {
    return key === "dev:mockApi" && value;
  });
}

/**
 * Initialization authenticate
 * @returns
 */
function generateClient() {
  const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  const mock = devMockApi();

  if (mock) {
    const file = require(`./mocks/${mock[1]}`);
    const options: merge.Options = {  };
    options.arrayMerge = (destinationArray, sourceArray, options) => destinationArray

    instance.interceptors.response.use((response) => ({
      ...response,
      data: merge(response, file, options),
    }));
  }

  /**
   * GET method
   * @param {string} path - path after domain
   * @param {T} [request] - get parameters
   * @param {RequestOptions<P>} [options]  - http request options
   * @returns {Promise<R>} api response
   * @template T, R, P
   */
  async function get<
    T extends ApiRequest,
    R extends ApiResponse,
    P extends object = ApiParams
  >(path: string, request?: T, options?: RequestOptions<P>): Promise<R> {
    return instance
      .get(path, {
        params: {
          ...request,
          ...options?.params,
        },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  }

  /**
   * POST method
   * @param {string} path - path after domain
   * @param {T} request - request body
   * @param {RequestOptions<P>} [options] - http request options
   * @returns {Promise<R>} api response
   * @template T, R, P
   */
  async function post<
    T extends ApiRequest,
    R extends ApiResponse,
    P extends object = ApiParams
  >(path: string, request: T, options?: RequestOptions<P>): Promise<R> {
    return instance
      .post(path, request, {
        params: {
          ...options?.params,
        },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  }

  /**
   * PUT method
   * @param {string} path - path after domain
   * @param {T} request - request body
   * @param {RequestOptions<P>} [options] - http request options
   * @returns {Promise<R>} api response
   * @template T, R, P
   */
  async function put<
    T extends ApiRequest,
    R extends ApiResponse,
    P extends object = ApiParams
  >(path: string, request: T, options?: RequestOptions<P>): Promise<R> {
    return instance
      .put(path, request, {
        params: {
          ...options?.params,
        },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  }

  /**
   * DELETE method
   * @param {string} path - path after domain
   * @param {RequestOptions<P>} [options] - http request options
   * @returns {Promise<R>} api response
   * @template R, P
   */
  async function remove<R extends ApiResponse, P extends object = ApiParams>(
    path: string,
    options?: RequestOptions<P>
  ): Promise<R> {
    return instance
      .delete(path, {
        params: {
          ...options?.params,
        },
        cancelToken: options?.cancelToken,
      })
      .then((response) => response.data);
  }

  return {
    get,
    post,
    put,
    remove,
  };
}

export const httpClient = generateClient();
