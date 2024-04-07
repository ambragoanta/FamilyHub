import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../models/user.model";
import { Login } from "../models/login.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getAll(): Observable<User[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<User[]>(this.usersUrl, { headers });
  }

  createUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/auth`;
    return this.http.post<User>(url, user);
  }

  getMe(): Observable<User> {
    const url = `${this.usersUrl}/me`;
    const headers = this.authService.getAuthHeaders();
    return this.http.get<User>(url, { headers });
  }


}
