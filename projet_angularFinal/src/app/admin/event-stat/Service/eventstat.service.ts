import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventstatService {
  
  private apiUrl = 'http://localhost:8081/SKyTeck/event'
  constructor(private http: HttpClient) { }

  getEventParticipationStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/participation-statistics`);
  }
  getNumberOfEventsPerMonth(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/events/numberOfEventsPerMonth`);
  }

}
