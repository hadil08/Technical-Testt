import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';

import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../service/question.service';
import { Quiz } from 'src/app/FrontEnd/models/Quiz';
import { Question } from 'src/app/FrontEnd/models/Question';


@Component({
  selector: 'app-listquiz',
  templateUrl: './listquiz.component.html',
  styleUrls: ['./listquiz.component.css']
})
export class ListquizComponent implements OnInit {
  quizzes: Quiz[] = [];
  
  id: number | undefined;
  questions : Question[] = []; 
  constructor(private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
  private questionservice:QuestionService) { }

  ngOnInit(): void {
    console.log('on init ')
    this.id = Number(this.activatedRoute.snapshot.params["id"]);
    this.getAllQuizzesByCourseId(this.id);
  }
  
  getAllQuizzesByCourseId(courseId: number): void {
    this.quizService.getAllQuizzesByCourseId(courseId)
      .subscribe(
        (quizzes: Quiz[]) => {
          this.quizzes = quizzes;
        },
        (error) => {
          console.error('Erreur lors de la récupération des quizzes :', error);
        }
      );
  }
  getAllQuestionsByQuizId(quizId: number): void {
    this.questionservice.getAllQuestionsByQuizId(quizId)
      .subscribe(
        (questions: Question[]) => {
          this.questions = questions;
        },
        (error) => {
          console.error('Erreur lors de la récupération des quizzes :', error);
        }
      );
  }
  deleteQuiz(id: number): void {
    // Envoyer une demande de suppression du quiz et de ses questions
    this.quizService.deleteQuiz(id).subscribe(
      () => {
        // Supprimer le quiz de la liste
        this.quizzes = this.quizzes.filter(quiz => quiz.idQ !== id);
        // Supprimer également les questions associées au quiz
        this.questionservice.deleteQuestionsByQuizId(id).subscribe(
          () => {
            // Mettre à jour la liste de questions
            this.questions = this.questions.filter(question => question.quiz.idQ !== id);
          },
          (error) => {
            console.error('Erreur lors de la suppression des questions associées au quiz :', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la suppression du quiz :', error);
      }
    );
  }
}






