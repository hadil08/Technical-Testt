import { Component, Input, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { CoursService } from '../../service/cours.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '../../service/question.service';
import { Question } from 'src/app/FrontEnd/models/Question';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
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
      console.log("ID reçu dans le popup id quiz  :", this.id);
    }
  }

  submitForm(): void {
    this.newquestion.idques = new Date().getTime() + 1;
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
    console.log("this is repcorrect ", formData.repCorrect);
    console.log("this is data", formData);
    console.log("this newques", this.newquestion);
    this.questionService.addQuestion(this.newquestion).subscribe(
      (response) => {
        console.log('Nouvelle question ajoutée:', response);
        this.ajouterQuestionAuQuiz(this.id, this.newquestion.idques);
        const modalRef = this.modalService.open(QuestionComponent);
        modalRef.componentInstance.id = this.id;
       this.activeModal.close();
       
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la question:', error);
      }
    );
  }

  ajouterQuestionAuQuiz(quizId: number, questionId: number): void {
    this.quizService.addQuestionToQuiz(quizId, questionId).subscribe(
      response => {
        console.log('Question ajoutée au quiz avec succès !', response);
        this.ajoutReussi=true ;
      },
      error => {
        console.error('Erreur lors de l\'ajout de la question au quiz :', error);
      }
    );
  }
  goaddquestion(id: number)
  {const modalRef = this.modalService.open(QuestionComponent);
    modalRef.componentInstance.id = this.id;
    this.activeModal.close();
  }
  termine(){
    this.activeModal.close();
  }

}
