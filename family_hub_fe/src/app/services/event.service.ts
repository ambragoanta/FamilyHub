import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventModel } from "../models/event.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8080/events';

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  getAllEvents(): Observable<EventModel[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<EventModel[]>(this.baseUrl, { headers });
  }

  getFamilyEvents(): Observable<EventModel[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<EventModel[]>(`${this.baseUrl}/family-events`, { headers });
  }

  getEvent(id: number): Observable<EventModel> {
    const headers = this.authService.getAuthHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<EventModel>(url, { headers });
  }

  createEvent(event: EventModel): Observable<EventModel> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<EventModel>(this.baseUrl, event, { headers });
  }

  updateEvent(id: number, event: EventModel): Observable<EventModel> {
    const headers = this.authService.getAuthHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<EventModel>(url, event, { headers });
  }

  deleteEvent(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers });
  }
}
