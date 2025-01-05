import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/FrontEnd/models/Question';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = 'http://localhost:8081/SKyTeck/question'; // Assurez-vous de mettre à jour l'URL en fonction de votre environnement

  constructor(private http: HttpClient) { }
  
  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}/addquestion`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletequestion/${id}`);
  }

  getAllQuestionsByQuizId(quizId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/byQuiz/${quizId}`);
  }
 
  deleteQuestionsByQuizId(quizId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteques/${quizId}`);
  }
}
