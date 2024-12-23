import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  withCredentials: true
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_URL = environment.gatewayUrl + "/auth";

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('accessToken') != null;
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post(
      this.AUTH_URL + '/login',
      {
        login,
        password,
      },
      httpOptions
    );
  }

  logout(): void {
    this.cookieService.delete('ACCESS-TOKEN');
  }
}
