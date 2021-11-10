import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { RefreshInterceptor } from 'src/app/interceptors/refresh.interceptor';

import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  router = Router;
  refreshInterceptor = new RefreshInterceptor();

  axiosInstance = axios.create({
    baseURL: 'https://api.pote.dev',
    headers: {
      Authorization: 'Bearer ' + this.globalService.getAccessToken(),
      'x-xsrf-token': this.globalService.getXsrfToken(),
    },
    params: {
      withCredentials: true
    }
  });

  constructor(
    private globalService: GlobalService
  ) { }

  async getAllUsers() {
    axios.interceptors.request.use(await this.refreshInterceptor.refreshToken(this.axiosInstance));
    const res = await this.axiosInstance.get('/users/public');
    return res.data;
  }

  async getUserFromEmail(email) {
    axios.interceptors.request.use(await this.refreshInterceptor.refreshToken(this.axiosInstance));
    const res = await this.axiosInstance.get(`users/email/${email}`);
    return res.data;
  }
}
