import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../models/user.model";
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
  updateUser(updateProfileDto: User): Observable<User> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<User>(`${this.usersUrl}/update`, updateProfileDto, { headers });
  }

  getMe(): Observable<User> {
    const url = `${this.usersUrl}/me`;
    const headers = this.authService.getAuthHeaders();
    return this.http.get<User>(url, { headers });
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    var headers = this.authService.getAuthHeaders();
    headers = headers.delete('Content-Type');

    const url = `${this.usersUrl}/uploadProfilePicture`;

    return this.http.post(url, formData, { headers, reportProgress: true, observe: 'events' });
  }

  getProfilePicture(): Observable<Blob> {
    const headers = this.authService.getAuthHeaders();
    const url = `${this.usersUrl}/profilePicture`;

    return this.http.get(url, { headers, responseType: 'blob' });
  }

  getProfilePictureById(userId: number): Observable<Blob> {
    const headers = this.authService.getAuthHeaders();
    const url = `${this.usersUrl}/profilePicture/${userId}`;
    return this.http.get(url, { headers, responseType: 'blob' });
  }

}
