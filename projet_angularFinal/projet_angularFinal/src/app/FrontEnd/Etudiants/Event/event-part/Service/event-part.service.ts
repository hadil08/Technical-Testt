import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventPartService {
  private apiUrl = 'http://172.213.169.60:8081/SKyTeck/event'
  private baseUrl = 'http://172.213.169.60:8081/SKyTeck/part'
  constructor(private http: HttpClient) { }
  
  getAllEvents(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.apiUrl}/getevent`);
  }
  participate(userId: number, numEvent: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${numEvent}/${userId}`, {});
  }
  
  }
