import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Cours } from 'src/app/FrontEnd/models/cours';


@Injectable({
  providedIn: 'root'
})
export class CoursService {

  
    private baseUrl = 'http://172.213.169.60:8081/SKyTeck/cours/';


  constructor(private http: HttpClient) { }

  retrieveAllCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.baseUrl + 'retrieveAllCours');
  }

  addCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(this.baseUrl + 'addCours', cours);
  }

  updateCours(cours: Cours): Observable<Cours> {
    return this.http.put<Cours>(this.baseUrl + 'updateCours', cours);
  }

  retrieveCoursById(id: number): Observable<Cours> {
    return this.http.get<Cours>(this.baseUrl + 'getcoursbyid/' + id);
  }

  deleteCours(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'deleteCours/' + id);
  }
  retrieveAllCoursByUserId(userId: number): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.baseUrl + 'getCoursByUserId/' + userId);
  }
  affecterQuizAuCours(coursId: number, quizId: number) {
    const url = `http://localhost:8081/SKyTeck/cours/cours/${coursId}/quiz/${quizId}`;
    return this.http.post(url, {}, {observe: 'response'})
      .pipe(
        catchError((error) => {
          console.error('Request failed with error:', error);
          return throwError(error);
        })
      );
  }
  getCoursWithQuizCount(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl +'coursWithQuizCount');
  }

  addRating(coursId: number, rating: number): Observable<any> {
    return this.http.post<any>(this.baseUrl + coursId + '/' + rating, {}, {observe: 'response'});
  }

  getAverageRating(coursId: number): Observable<number> {
    return this.http.get<number>(this.baseUrl + coursId + '/averageRating');
  }
  getCoursWithAverageRatingAndTotalRatings(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.baseUrl}averageRatingAndTotalRatings`);
  }

}


