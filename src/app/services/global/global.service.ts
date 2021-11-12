import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { RefreshInterceptor } from 'src/app/interceptors/refresh.interceptor';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  refreshInterceptor = new RefreshInterceptor();
  currentUserName: string = '';
  private _userLogged: boolean;
  private _userName: string = '';
  private _breadcrumb: string;
  // private _wookiee: boolean = false;

  authAxiosInstance = axios.create({
    baseURL: 'https://api.pote.dev',
    params: {
      withCredentials: true
    }
  });

  constructor(
    private router: Router,
    public dataSources: MatTableDataSource<any>,
  ) { }

  public get userLogged() {
    return this._userLogged;
  }

  public set userLogged(bool: boolean) {
    this._userLogged = bool;
  }

  public get userName() {
    return this._userName;
  }

  public set userName(userName: string) {
    this._userName = userName;
  }

  public set breadcrumb(bc: string) {
    // pour éviter l'erreur ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => (this._breadcrumb = bc));
  }

  public get breadcrumb() {
    return this._breadcrumb;
  }

  // public set wookiee(bool: boolean) {
  //   this._wookiee = bool;
  // }

  // public get wookiee() {
  //   return this._wookiee;
  // }

  // store toutes les données utilisateurs avec une map de paires clés/valeurs
  storeUserData(args: Map<string, string>) {
    for (const [key, value] of args) {
      localStorage.setItem(key, value);
    }
  }

  async fetchSwapi(category: string, id?: string, page?: number) {
    let data = [];
    let pageStr = '?page=' + page;
    let customUrl = `/${category}/${page ? pageStr : ''}${id ? id : ''}`;

    const axiosInstance = axios.create({
      baseURL: 'https://swapi.dev/api/'
    });

    // avant chaque fetch, vérifie si l'utilisateur est connecté et ses tokens toujours valides
    axios.interceptors.request.use(await this.refreshInterceptor.refreshToken(this.authAxiosInstance));

    // fetch les données de Swapi en fonction des paramètres
    const fetchData = await axiosInstance.get(customUrl);
    if (fetchData.data.results) { // si il y a plusieurs récultats (recherche globale)
      data.push(...fetchData.data.results)
    } else { // si il y a un seul résultat (recherche sur id)
      return fetchData.data
    }

    // si la réponse est décomposée en plusieurs pages, récupère toutes les données en récursif
    if (fetchData.data.next) {
      let pageNumber = fetchData.data.next.replace(/\D/g, '');
      const recursiveFetchData = await this.fetchSwapi(category, null, pageNumber);

      data.push(...recursiveFetchData)
    }

    return data;
  }

  // navigue sur une page détails en fonction de l'url
  async navDetails(link: string) {
    let nLink = link.split('/').slice(4);
    let category = nLink[0] === 'people' ? 'characters' : nLink[0];
    let id = nLink[1];
    this.router.navigate([`/${category}/${id}`]);
  }

  // définit une data source selon la catégorie choisie, dans l'array dataSources
  async setDataSource(category: string) {
    this.dataSources[category] = new MatTableDataSource(await this.fetchSwapi(category));
  }

  setCurrentUserName(userName: string) {
    this.currentUserName = userName;
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getXsrfToken() {
    return localStorage.getItem('xsrfToken');
  }


  readFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
