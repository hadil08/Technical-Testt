import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/FrontEnd/models/Quiz';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = 'http://localhost:8081/SKyTeck/quiz'; // Assurez-vous de mettre à jour l'URL en fonction de votre environnement

  constructor(private http: HttpClient) { }
  

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.baseUrl}/addQuiz`, quiz);
  }

  
  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getAllQuizzesByCourseId(courseId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/byCourse/${courseId}`);
  }
  addQuestionToQuiz(quizId: number, questionId: number): Observable<any> {
    const url = `${this.baseUrl}/${quizId}/questions/${questionId}`;
    return this.http.post<any>(url, null);
  }
  calculateQuizAverages(): Observable<Quiz[]> {
    const url = `${this.baseUrl}/calculateAverages`;
    return this.http.get<Quiz[]>(url);
  }
  getQuizStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/moyennestatistics`);
  }

  
}