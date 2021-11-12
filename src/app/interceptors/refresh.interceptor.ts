import axios from 'axios';
import { AxiosRequestConfig } from 'axios'
import { AxiosInstance } from 'axios';
import { GlobalService } from '../services/global/global.service';

export class RefreshInterceptor {
  constructor(
  ) { }

  refreshToken = async (req: AxiosInstance) => {
    // console.log('refresh interceptor starts');
    const axiosInstance = axios.create({
      baseURL: 'https://api.pote.dev',
      params: {
        withCredentials: true
      }
    });
    const refresh_token = localStorage.getItem('refreshToken');
    const email = localStorage.getItem('email');

    if (refresh_token && email) {
      try {
        const res: any = await axiosInstance.post('/auth/token', { refresh_token, email });
        localStorage.setItem('xsrfToken', res.data.xsrfToken);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        // console.log('interceptor success');
      } catch (err) {
        console.error(err);
        localStorage.clear();
        window.location.href = '/login';
      }
    } else {
      // console.log('interceptor fail: no data from localStorage. Redirecting...');
      localStorage.clear();
      window.location.href = '/login';
    }

    return req;
  };
}


