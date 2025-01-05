import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tentative } from 'src/app/FrontEnd/models/Tentative';

@Injectable({
  providedIn: 'root'
})
export class TentativeService {
  private baseUrl = 'http://172.213.169.60:8081/SKyTeck/tentatives'
  constructor(private http: HttpClient) { }
  saveTentative(tentative: Tentative): Observable<Tentative> {
    return this.http.post<Tentative>(`${this.baseUrl}/save`, tentative);
  }
  getTentativesByUserIdAndQuizId(userId: number, quizId: number): Observable<Tentative[]> {
    return this.http.get<Tentative[]>(`${this.baseUrl}/${userId}/${quizId}`);
  }
  getTentatives(): Observable<Tentative[]> {
    return this.http.get<Tentative[]>(this.baseUrl);
  }

}
