import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments/environment';
import { User } from './../login/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userAutenticate: boolean;
  showNotLogin = new EventEmitter<boolean>();
  public user: User = new User();

  @Input() token: string;
  @Output() tokenChange = new EventEmitter<string>();

  constructor(public router: Router, public http: HttpClient) {}

  check(): boolean {
    return localStorage.getItem('user') ? true : false;
  }
  login(credentials: {
    registration: string;
    password: string;
  }): Observable<boolean> {
    return this.http
      .post<any>(
        `${environment.api_url}/wp-json/jwt-auth/v1/token`,
        credentials
      )
      .do((data) => {
        this.token = data['token'];
        this.tokenChange.emit(this.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', btoa(JSON.stringify(data.user)));
        this.router.navigate(['posts-page']);
      });
  }
  logout(): void {
    localStorage.clear();
    this.token = '';
    this.router.navigate(['login']);
    this.userAutenticate = false;
  }
  getUser(): User {
    return localStorage.getItem('user')
      ? JSON.parse(atob(localStorage.getItem('user')))
      : null;
  }
  userAreAutenticate() {
    return this.userAutenticate;
  }
}
