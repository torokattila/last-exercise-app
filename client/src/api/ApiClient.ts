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
    const user = Storage.getItem('user');
    let userId = '';

    if (user) {
      userId = JSON.parse(user ?? '')?.id;
    }

    const response: AxiosResponse<User> = await this.client.get<User>(
      `/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${Storage.getItem('access_token')}` || '',
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  async finishExercise(
    userId: number,
    exerciseId: number,
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
          Authorization: `Bearer ${Storage.getItem('access_token')}` || '',
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  async updateUser(userId: number, data: UserEditPayload): Promise<User> {
    const response: AxiosResponse<User> = await this.client.put(
      `/users/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Storage.getItem('access_token')}` || '',
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  async updateUserPassword(
    userId: number,
    data: PasswordChangePayload
  ): Promise<User> {
    const response: AxiosResponse<User> = await this.client.put(
      `/users/${userId}/password/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Storage.getItem('access_token')}` || '',
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  async deleteUser(userId: number): Promise<User> {
    const response: AxiosResponse<User> = await this.client.delete(
      `/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${Storage.getItem('access_token')}` || '',
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  // Exercise
  async getExercise(exerciseId: number): Promise<Exercise> {
    const response: AxiosResponse<Exercise> = await this.client.get<Exercise>(
      `/exercises/${exerciseId}`,
      {
        headers: {
          Authorization: `Bearer ${Storage.getItem('access_token')}` || '',
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  async editExercise(
    exerciseId: number,
    data: Partial<Exercise>
  ): Promise<Exercise> {
    delete data.id;
    const response: AxiosResponse<Exercise> = await this.client.put(
      `/exercises/${exerciseId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Storage.getItem('access_token')}` || '',
        },
        withCredentials: true,
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
          Authorization: `Bearer ${Storage.getItem('access_token')}` || '',
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  async deleteExercise(exerciseId: number): Promise<Exercise> {
    const response: AxiosResponse<Exercise> = await this.client.delete(
      `/exercises/${exerciseId}`,
      {
        headers: {
          Authorization: `Bearer ${Storage.getItem('access_token')}` || '',
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  // Exercise type
  async deleteExerciseType(exerciseTypeId: number): Promise<ExerciseType> {
    const response: AxiosResponse = await this.client.delete<ExerciseType>(
      `/exercisetypes/${exerciseTypeId}`,
      {
        headers: {
          Authorization: `Bearer ${Storage.getItem('access_token')}` || '',
        },
        withCredentials: true,
      }
    );

    return response.data;
  }
}

export default ApiClient;
