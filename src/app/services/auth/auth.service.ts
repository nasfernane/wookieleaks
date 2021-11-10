import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { RefreshInterceptor } from './../../interceptors/refresh.interceptor'
import { GlobalService } from '../global/global.service'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  refreshInterceptor = new RefreshInterceptor();

  axiosInstance = axios.create({
    baseURL: 'https://api.pote.dev',
    params: {
      withCredentials: true
    }
  });

  constructor(
    private router: Router,
    private globalService: GlobalService
  ) { }

  async register(firstName, lastName, userName, email, password, passwordConfirm) {
    if (password === passwordConfirm) {
      const res = await axios({
        url: 'https://api.pote.dev/users',
        method: 'post',
        data: {
          firstname: firstName,
          lastname: lastName,
          password,
          username: userName,
          email
        },
        params: {
          withCredentials: true
        }
      });
      console.log(res);
      return res.status === 200 ? true : false;
    }
  }

  async login(email, password) {
    localStorage.clear();
    const res = await this.axiosInstance.post('/auth/login', { email, password });

    if (res.status === 200) {
      const data: any = res.data;
      const dataUser: any = res.config.data;

      this.globalService.storeUserData(new Map([
        ['accessToken', data.accessToken],
        ['xsrfToken', data.xsrfToken],
        ['refreshToken', data.refreshToken],
        ['email', dataUser.split(`"`)[3]],
      ]));

      const currentUser: any = await this.getCurrentUser();
      this.globalService.storeUserData(new Map([['userName', currentUser.username]]));
    }
  }

  async getCurrentUser() {
    const instance = axios.create({
      baseURL: 'https://api.pote.dev',
      headers: {
        Authorization: 'Bearer ' + this.globalService.getAccessToken(),
        'x-xsrf-token': this.globalService.getXsrfToken(),
      },
      params: {
        withCredentials: true
      }
    });

    axios.interceptors.request.use(await this.refreshInterceptor.refreshToken(instance));

    const res = await instance.get('/auth/me');

    return res.data;
  }

  isLogged() {
    const xsrfToken = localStorage.getItem('xsrfToken');
    const accessToken = localStorage.getItem('xsrfToken');
    const userName = localStorage.getItem('userName');

    return xsrfToken && accessToken && userName ? true : false;
  }

  async refreshToken() {
    const refresh_token = localStorage.getItem('refreshToken');
    const email = localStorage.getItem('email');

    if (refresh_token && email) {
      const res: any = await this.axiosInstance.post('/auth/token', { refresh_token, email });
      if (res.status === 201) {
        this.globalService.storeUserData(new Map([['xsrfToken', res.data.xsrfToken], ['accessToken', res.data.accessToken], ['refreshToken', res.data.refreshToken]]));
        return true;
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  async lostPw(email) {
    const res = await this.axiosInstance.post('/auth/forgot_password', { email });
    return res.status === 200 ? true : false;
  }

  async resetPw(token, password, passwordConfirm) {
    const res = await this.axiosInstance.post('/auth/reset_password', { token, password, password_copy: passwordConfirm });

    return res.status === 200 ? true : false;
  }


  logout() {
    localStorage.clear();
    this.globalService.toggleUserLog();
    this.router.navigate(['/login']);
  }
}
