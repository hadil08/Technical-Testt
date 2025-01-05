
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ListquesComponent } from '../listques/listques.component';
import { Cours } from 'src/app/FrontEnd/models/cours';
import { Question } from 'src/app/FrontEnd/models/Question';
import { Quiz } from 'src/app/FrontEnd/models/Quiz';
import { CoursService } from 'src/app/FrontEnd/tuteur/Cours/service/cours.service';
import { QuizService } from 'src/app/FrontEnd/tuteur/Cours/service/quiz.service';
import { QuestionService } from 'src/app/FrontEnd/tuteur/Cours/service/question.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-etudcour',
  templateUrl: './etudcour.component.html',
  styleUrls: ['./etudcour.component.css']
})
export class EtudcourComponent implements OnInit{
  @ViewChild('quizDialog') quizDialog!: TemplateRef<any>;
  @ViewChild('qquestionsDiag') questionsDiag!: TemplateRef<any>;
  coursList: Cours[] = [];
  closeResult: string | undefined;
  quizzes: Quiz[] = [];
  questions: Question[] =[];
  Quiz: Quiz = {
    idQ: 0,
    cours: { idC: 0 },
    title: '',
    questions: [],
    moyenneScores :0
 
  };
 
  quiz: Quiz={
    idQ: 0,
    title: '',
    cours: {
      idC: null
    },
    questions: [],
    moyenneScores :0
  }
  

  constructor(private coursService: CoursService,
    private modalService: NgbModal,
    private quizService:QuizService,
    private questionservice: QuestionService,

    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.loadCours(); // Load courses when the component initializes
  } 
  loadCours() {
    this.coursService.retrieveAllCours().subscribe(
      (cours: Cours[]) => { // Assuming the response is an array of Cours objects
        this.coursList = cours;
       
      },
      (error) => {
        console.error('Error fetching cours:', error);
      }
    );
  }
  openPopup(idC: number): void {
    this.quizService.getAllQuizzesByCourseId(idC)
      .subscribe(
        (quizzes: Quiz[]) => {
          const dialogRef = this.modalService.open(this.quizDialog, { ariaLabelledBy: 'modal-basic-title' });
          this.quizzes = quizzes;
          dialogRef.result.then(
            (result) => {
              this.closeResult = `Closed with: ${result}`;
            },
            (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération des quizzes :', error);
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openquestions(idQ: number) {
    
    const modalRef = this.modalService.open(ListquesComponent);
    modalRef.componentInstance.id =idQ;
  }
  

/// partie addRating
Finalrating:any;
  addRating(coursId: number, rating: number): void {
    this.coursService.addRating(coursId, rating).subscribe(
      response => {
        console.log('Rating added successfully');
        // Traitez la réponse ou effectuez d'autres actions en cas de succès
      },
      error => {
        console.error('Error adding rating:', error);
        // Traitez l'erreur ou affichez un message d'erreur à l'utilisateur
      }
    );
  }

  getAverageRating(coursId: number): void {
    this.coursService.getAverageRating(coursId).subscribe(
      averageRating => {
        console.log('Average rating:', averageRating);
        this.Finalrating = averageRating;
        // Utilisez la note moyenne récupérée comme nécessaire dans votre composant
      },
      error => {
        console.error('Error getting average rating:', error);
        // Traitez l'erreur ou affichez un message d'erreur à l'utilisateur
      }
    );
  }
  ratingcontrol=new FormControl(0);
  GetRating(idE: number): void {
    const rating: number = this.ratingcontrol.value|| 0; // Obtenez la valeur du FormControl
    console.log("ID:", idE, "Rating:", rating); // Affichez la valeur pour le débogage
    this.addRating(idE, rating);
   this.getAverageRating(idE)
  }

}
