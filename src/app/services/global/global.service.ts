import { Injectable } from '@angular/core';

interface User {
  userName: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  // currentUser: User = {
  //   userName: '',
  //   firstName: '',
  //   lastName: ''
  // };

  currentUserName: string = '';

  userLogged: boolean = false;

  constructor() { }

  toggleUserLog(): void {
    this.userLogged = !this.userLogged;
  }

  setCurrentUserName(userName: string) {
    this.currentUserName = userName;
  }

  storeUserData(args: Map<string, string>) {
    for (const [key, value] of args) {
      localStorage.setItem(key, value);
    }
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getXsrfToken() {
    return localStorage.getItem('xsrfToken');
  }

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
