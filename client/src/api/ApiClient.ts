import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import * as Storage from '../lib/storage';

export const ApiURL =
  config.api.port !== 80 && config.api.port !== 443
    ? `${config.api.protocol}://${config.api.baseUrl}:${config.api.port}`
    : `${config.api.protocol}://${config.api.baseUrl}`;

class ApiClient {
  protected readonly client: AxiosInstance;

  constructor() {
    axios.defaults.params = {};
    this.client = axios.create({ baseURL: ApiURL });
    this.client.interceptors.request.use(this.handleAuth);
    this.client.interceptors.response.use(
      (response) => response,
      this.handleUnauthorized
    );
  }

  private handleAuth = async (config: AxiosRequestConfig) => {
    const accessToken = Storage.getItem('access_token');

    if (accessToken) {
      return config;
    } else {
      window.location.replace('/login');
      return config;
    }
  }

  private handleUnauthorized = (error: any) => {
    if (error?.response?.status === StatusCodes.UNAUTHORIZED) {
      Storage.removeItem('access_token');
      Storage.removeItem('user');
      window.location.replace('/login');
      throw new axios.Cancel();
    } else {
      return Promise.reject(error);
    }
  }

  // User
  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.client.get<User>('/me', {
      headers: {
        access_token: Storage.getItem('access_token') || '',
      }
    });

    return response.data;
  }
}

export default ApiClient;