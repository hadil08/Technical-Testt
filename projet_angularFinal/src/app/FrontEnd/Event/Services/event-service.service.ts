import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../Models/event';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  private apiUrl = 'http://localhost:8081/SKyTeck/event'
  constructor(private http: HttpClient) { }
  getEventsByUserId(userId: number): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteEvent(numEvent: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${numEvent}`);
  }
  createEvent(Id: number, event: Evenement): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${Id}`, event);
  }
  updateEvent(numEvent: number, event: Evenement): Observable<Evenement> {
    const updateUrl = `${this.apiUrl}/update/${numEvent}`;
    return this.http.put<Evenement>(updateUrl, event);
  }
}
