import { Component, Input, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';

import { CoursService } from '../../service/cours.service';
import { QuestionService } from '../../service/question.service';
import { QuestionComponent } from '../question/question.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Question } from 'src/app/FrontEnd/models/Question';
import { Quiz } from 'src/app/FrontEnd/models/Quiz';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input() id: number = 0;
  ajoutReussi: boolean | undefined;
  newquestion: Question = {
    idques: 0,
    question: '',
    rep1: '',
    rep2: '',
    rep3: '',
    repCorrect: '',
    quiz: { idQ: 0 }
  };

  newquiz: Quiz = {
    idQ: 0,
    cours: { idC: 0 },
    title: '',
    questions: [],
    moyenneScores :0
  };

  correctAnswer: string = '';

  constructor(
    private quizService: QuizService,
    private coursService: CoursService,
    private modalService: NgbModal,
    private questionService: QuestionService,
    public activeModal: NgbActiveModal 
  ) {}

  ngOnInit(): void {
    if (this.id) {
      console.log("ID reçu dans le popup id cours :", this.id);
    }
  }

  submitForm(): void {
    this.newquestion.idques = new Date().getTime() + 1;
    this.newquiz.idQ = new Date().getTime() + 2;

    const formData = { ...this.newquestion };
    switch (this.correctAnswer) {
      case 'rep1':
        formData.repCorrect = formData.rep1;
        break;
      case 'rep2':
        formData.repCorrect = formData.rep2;
        break;
      case 'rep3':
        formData.repCorrect = formData.rep3;
        break;
      default:
        Swal.fire({
          title: 'Error',
          text: 'Please select a correct answer.',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK'
        });
        return;
    }
    this.newquestion = formData;
    this.newquestion.repCorrect=formData.repCorrect;
     console.log("this is repcorrect ",formData.repCorrect);
     console.log("this is data",formData);
     console.log("this newques",this.newquestion);
    this.questionService.addQuestion(this.newquestion).subscribe(
      (response) => {
        console.log('Nouvelle question ajoutée:', response);
        this.quizService.addQuiz(this.newquiz).subscribe(
          (response) => {
            console.log('Nouveau quiz ajouté:', response);
            if (this.id != 0) {
              this.affecterQuizAuCours(this.id, this.newquiz.idQ);
            }
            this.ajouterQuestionAuQuiz(this.newquiz.idQ, this.newquestion.idques);
            this.ajoutReussi= true ; 
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du quiz:', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la question:', error);
      }
    );
  }

  affecterQuizAuCours(coursId: number, quizId: number): void {
    this.coursService.affecterQuizAuCours(coursId, quizId).subscribe(
      (response) => {
        console.log('Quiz affecté au cours avec succès.',response);
      },
      (error) => {
        console.error('Erreur lors de l\'affectation du quiz au cours : ', error);
      }
    );
  }

  ajouterQuestionAuQuiz(quizId: number, questionId: number): void {
    this.quizService.addQuestionToQuiz(quizId, questionId).subscribe(
      response => {
        console.log('Question ajoutée au quiz avec succès !', response);
      },
      error => {
        console.error('Erreur lors de l\'ajout de la question au quiz :', error);
      }
    );
  }
  goaddquestion(id: number)
  {const modalRef = this.modalService.open(QuestionComponent);
    modalRef.componentInstance.id = this.newquiz.idQ;
    this.activeModal.close();
  }
  

}
