import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  createUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/auth`;
    return this.http.post<User>(url, user);
  }

  getMe(): Observable<string> {
    const url = `${this.usersUrl}/auth`;
    return this.http.get<string>(url);
  }
}
