import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Login } from "../models/login.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private http: HttpClient,) { }

  private usersUrl = 'http://localhost:8080/users';

  storeCredentials(username: string, password?: string): void {
    localStorage.setItem('basicAuth', btoa(username + ':' + password));
  }

  getStoredCredentials(): string | null {
    return localStorage.getItem('basicAuth');
  }

  createBasicAuthToken(): string {
    const storedCredentials = this.getStoredCredentials();
    return storedCredentials ? 'Basic ' + storedCredentials : '';
  }

  getAuthHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': this.createBasicAuthToken(),
      'Content-Type': 'application/json'
    });
    return headers;
  }

  login(login: Login): Observable<boolean> {
    const url = `${this.usersUrl}/login`;
    return this.http.post<boolean>(url, login, {responseType: 'json'});
  }

  logout(): void {
    localStorage.removeItem('basicAuth');
    this.router.navigate(['/auth']);
  }

}
