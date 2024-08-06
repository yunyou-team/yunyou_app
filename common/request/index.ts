import axios from 'axios';

const request = axios.create({
  baseURL: '',
  timeout: 10000, // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 可以在这里添加认证token等
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      // 请求已发出，但服务器响应了状态码不是2xx的范围
      console.error('Error response:', error.response);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('Error request:', error.request);
    } else {
      // 其他错误
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default request;
