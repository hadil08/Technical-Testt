import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../../models/event';
import { Participation } from 'src/app/FrontEnd/Event/Models/Participationevent';

@Injectable({
  providedIn: 'root'
})
export class CalenderserviceService {
  private apiUrl = 'http://172.213.169.60:8081/SKyTeck/event'
  private baseUrl = 'http://172.213.169.60:8081/SKyTeck/part'
  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.apiUrl}/getevent`);
  }
  getParticipationByUserId(userId: number): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.baseUrl}/user/${userId}`);
  }
}
