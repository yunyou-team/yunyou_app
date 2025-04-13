import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { domain } from '../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config: AxiosRequestConfig = {
    baseURL: `${domain}/rest`,
    validateStatus: (status) => status >= 200 && status < 300,
    timeout: 1e4,
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true,
};

const requestNormalInterceptor = async (config: any) => {
    // 携带 token
    const token = (await AsyncStorage.getItem('token')) || '';

    config.headers['Authorization'] = token;
    return config;
};
const requestErrorInterceptor = (error: any) => {
    return Promise.reject(error);
};

const responseNormalInterceptor = async (response: any) => {
    if (response.status === 200) {
        return response;
    } else {
        // 401 清除 token 信息
        if (response.status === 401) {
            await AsyncStorage.removeItem('token');
            return Promise.reject(response);
        }
        return Promise.reject(response);
    }
};
const responseErrorInterceptor = (error: any) => {
    return Promise.reject(error);
};

function getAxiosInstance(): AxiosInstance {
    const instance: AxiosInstance = axios.create(config);

    instance.interceptors.request.use(
        requestNormalInterceptor,
        requestErrorInterceptor
    );

    instance.interceptors.response.use(
        responseNormalInterceptor,
        responseErrorInterceptor
    );

    return instance;
}

export interface AjaxResponse<T> {
    result: number;
    data: T;
    message?: string;
}

export default {
    post: async function <T>(
        url: string,
        data: object = {},
        config: AxiosRequestConfig = {}
    ): Promise<AjaxResponse<T>> {
        const instance: AxiosInstance = getAxiosInstance();
        return new Promise((resolve, reject) => {
            instance
                .request<AjaxResponse<T>>({
                    ...config,
                    method: 'POST',
                    url,
                    data,
                })
                .then((data: AxiosResponse<AjaxResponse<T>>) => {
                    resolve(data.data);
                }, reject);
        });
    },
};
