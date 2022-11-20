import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';
import * as Storage from '../lib/storage';
import Exercise from '../models/Exercise';
import ExerciseType from '../models/ExerciseType';
import ExercisePayload from './payloads/ExercisePayload';
import UserEditPayload from './payloads/UserEditPayload';
import PasswordChangePayload from './payloads/PasswordChangePayload';

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
  };

  private handleUnauthorized = (error: any) => {
    if (error?.response?.status === StatusCodes.UNAUTHORIZED) {
      Storage.removeItem('access_token');
      Storage.removeItem('user');
      window.location.replace('/login');
      throw new axios.Cancel();
    } else {
      return Promise.reject(error);
    }
  };

  // User
  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.client.get<User>('/me', {
      headers: {
        access_token: Storage.getItem('access_token') || '',
      },
    });

    return response.data;
  }

  async finishExercise(
    userId: string,
    exerciseId: string,
    duration: string
  ): Promise<User> {
    const response: AxiosResponse<User> = await this.client.put<User>(
      `/users/${userId}/lastexercise`,
      {
        exerciseId,
        duration,
      },
      {
        headers: {
          access_token: Storage.getItem('access_token') || '',
        },
      }
    );

    return response.data;
  }

  async updateUser(userId: string, data: UserEditPayload): Promise<User> {
    const response: AxiosResponse<User> = await this.client.put(
      `/users/${userId}`,
      data,
      {
        headers: {
          access_token: Storage.getItem('access_token') || '',
        },
      }
    );

    return response.data;
  }

  async updateUserPassword(
    userId: string,
    data: PasswordChangePayload
  ): Promise<User> {
    const response: AxiosResponse<User> = await this.client.put(
      `/users/${userId}/password/update`,
      data,
      {
        headers: {
          access_token: Storage.getItem('access_token') || '',
        },
      }
    );

    return response.data;
  }

  async deleteUser(userId: string): Promise<User> {
    const response: AxiosResponse<User> = await this.client.delete(
      `/users/${userId}`,
      {
        headers: {
          access_token: Storage.getItem('access_token') || '',
        },
      }
    );

    return response.data;
  }

  // Exercise
  async getExercise(exerciseId: string): Promise<Exercise> {
    const response: AxiosResponse<Exercise> = await this.client.get<Exercise>(
      `/exercises/${exerciseId}`,
      {
        headers: {
          access_token: Storage.getItem('access_token') || '',
        },
      }
    );

    return response.data;
  }

  async editExercise(exerciseId: string, data: Exercise): Promise<Exercise> {
    const response: AxiosResponse<Exercise> = await this.client.put(
      `/exercises/${exerciseId}`,
      data,
      {
        headers: {
          access_token: Storage.getItem('access_token') || '',
        },
      }
    );

    return response.data;
  }

  async createExercise(data: ExercisePayload): Promise<Exercise> {
    const response: AxiosResponse<Exercise> = await this.client.post(
      `/exercises`,
      data,
      {
        headers: {
          access_token: Storage.getItem('access_token') || '',
        },
      }
    );

    return response.data;
  }

  async deleteExercise(exerciseId: string): Promise<Exercise> {
    const response: AxiosResponse<Exercise> = await this.client.delete(
      `/exercises/${exerciseId}`,
      {
        headers: {
          access_token: Storage.getItem('access_token') || '',
        },
      }
    );

    return response.data;
  }

  // Exercise type
  async deleteExerciseType(exerciseTypeId: string): Promise<ExerciseType> {
    const response: AxiosResponse = await this.client.delete<ExerciseType>(
      `/exercisetypes/${exerciseTypeId}`,
      {
        headers: {
          access_token: Storage.getItem('access_token') || '',
        },
      }
    );

    return response.data;
  }
}

export default ApiClient;
