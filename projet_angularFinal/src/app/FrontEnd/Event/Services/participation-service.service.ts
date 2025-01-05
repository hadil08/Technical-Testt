import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participation } from '../Models/Participationevent';

@Injectable({
  providedIn: 'root'
})
export class ParticipationServiceService {
  private apiUrl = 'http://localhost:8081/SKyTeck/part'
  constructor(private http: HttpClient) { }

  getParticipationsByEventCreatorId(Id: number): Observable<Participation[]> {
    return this.http.get<Participation[]>(`${this.apiUrl}/eventcreator/${Id}`);
  }
  acceptParticipation(partId: number) {
    return this.http.put(`${this.apiUrl}/accept/${partId}`, {});
  }
  rejectParticipation(partId: number) {
    return this.http.delete(`${this.apiUrl}/reject/${partId}`);
  }
  archiveParticipation(partId: number) {
    return this.http.post(`${this.apiUrl}/${partId}/archive`, {});
  }
}
