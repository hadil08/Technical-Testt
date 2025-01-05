import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, catchError, map, of } from 'rxjs';
import { Question } from 'src/app/FrontEnd/models/Question';
import { Quiz } from 'src/app/FrontEnd/models/Quiz';
import { Tentative } from 'src/app/FrontEnd/models/Tentative';
import { QuestionService } from 'src/app/FrontEnd/tuteur/Cours/service/question.service';
import { QuizService } from 'src/app/FrontEnd/tuteur/Cours/service/quiz.service';
import { TentativeService } from 'src/app/FrontEnd/tuteur/Cours/service/tentative.service';
import { jsPDF } from 'jspdf';
import { UserService } from 'src/app/FrontEnd/Authentification/services/user.service';
import { User } from 'src/app/FrontEnd/Authentification/models/User';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listques',
  templateUrl: './listques.component.html',
  styleUrls: ['./listques.component.css']
})
export class ListquesComponent {
  @Input() id: number;
  @Input() userId: number; 
  user: User | null = null;
  timerActive: boolean = false;
  quizzes: Quiz[] = []
  message: string = '';
  quizpasser:boolean=false
  questions : Question[] = []
  nouvelleTentative: Tentative = {
    idT: 0,
    nb: 0,
    note :0,
    user: {id: null },
    quiz: { idQ: 0 }
  }
 
  minute : any;
  tempsRestant: number;
  constructor(private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    public userService: UserService,
    public activeModal: NgbActiveModal ,
  private questionservice:QuestionService,
  private tentativeService:TentativeService
) { this.tempsRestant = 0;  }

ngOnInit(): void {
  console.log('on init ');
  console.log(this.id);
    console.log(this.userId);


    this.getTentativesByUserIdAndQuizId(this.userId, this.id).subscribe((quizPassed: boolean) => {
      if (quizPassed) {
        Swal.fire({
          title: 'Quiz Completed',
          html: "vouz pouvez pas repeter le quiz vous aves un seul tentative",
          icon: 'error',
          showCancelButton: true,
          cancelButtonText: 'Fermer',})
          this.activeModal.close() 
        
      } else {
        this.getAllQuestionsByQuizId(this.id);
      }
    }, (error) => {
      console.error('Erreur lors de la récupération des tentatives :', error);
      this.message = 'Erreur lors de la récupération des tentatives.';
    });
  
}

  

  getAllQuestionsByQuizId(quizId: number): void {
    this.questionservice.getAllQuestionsByQuizId(quizId)
      .subscribe(
        (questions: Question[]) => {
          this.questions = questions;
          
          this.timer(this.questions.length);
        },
        (error) => {
          console.error('Erreur lors de la récupération des quizzes :', error);
        }
      );
  }
  getTentativesByUserIdAndQuizId(userId: number, id: number): Observable<boolean> {
    return this.tentativeService.getTentativesByUserIdAndQuizId(userId, id)
      .pipe(
        map((tentatives: Tentative[]) => {
          // Vérification si une tentative avec nb === 1 existe
          const quizPassed = tentatives.some(tentative => tentative.nb === 1);
          // Si une tentative a été trouvée avec nb === 1, on met à jour la variable quizpasser
          if (quizPassed) {
            this.quizpasser = true;
          }
          return quizPassed; // Retourne true si une tentative avec nb === 1 existe, sinon false
        }),
        catchError((error) => {
          console.error('Erreur lors de la récupération des tentatives :', error);
          // Retourner une valeur par défaut en cas d'erreur
          return of(false);
        })
      );
  }

 
  terminerQuiz(): void{
    let score = 0;

    for (const question of this.questions) {
      const selectedAnswer = this.getSelectedAnswer(question.idques);
      if (selectedAnswer === question.repCorrect) {
        score++;
      }
    }

    this.nouvelleTentative.note = score ;
    this.nouvelleTentative.quiz.idQ = this.id ;
    this.nouvelleTentative.user.id = this.userId ;
    console.log(this.nouvelleTentative.user.id)
    this.sauvegarderTentative();
    console.log('Note totale :', score, '/', this.questions.length)
    const message = `Vous avez terminé le quiz. Votre note est : ${score}/${this.questions.length}\n\nTélécharger le quiz ?`;

    
    Swal.fire({
      title: 'Quiz Terminé',
      html: message,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Télécharger le quiz',
      cancelButtonText: 'Fermer',
    }).then((result) => {
      // If the user clicks on "Télécharger le quiz"
      if (result.isConfirmed) {
        this.generatePDF();
      }
    });
    
  }

  // Méthode pour récupérer la réponse sélectionnée par l'étudiant pour une question donnée
  getSelectedAnswer(questionId: number): string | undefined {
    const selectedAnswer = document.querySelector(`input[name="answer${questionId}"]:checked`);
    return selectedAnswer ? (selectedAnswer as HTMLInputElement).value : undefined;
  }
  sauvegarderTentative() {
    this.nouvelleTentative.idT=new Date().getTime()+4;
    this.nouvelleTentative.nb=1;
    this.tentativeService.saveTentative(this.nouvelleTentative)
      .subscribe(
        (resultat) => {
          console.log('Tentative sauvegardée avec succès:', resultat);
        },
        (erreur) => {
          console.error('Erreur lors de la sauvegarde de la tentative:', erreur);
        }
      );
  }
  
  stop() {
    
    this.terminerQuiz()
  }
  display: any;
  public timerInterval: any;
  timer(minute:number ) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.terminerQuiz()
      }
    }, 1000);
  }
  speak(text: string): void {
    if ('speechSynthesis' in window) {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    } else {
        console.error('La synthèse vocale n\'est pas prise en charge dans ce navigateur.');
    }
}
generatePDF(): void {
  const doc = new jsPDF();
  let y = 5

  // Title section

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(0,0,255); // White color for the title text

  const titleText = 'Skytech Quiz';
  const titleWidth = doc.getStringUnitWidth(titleText) * 20 / doc.internal.scaleFactor;
  const titleY = y + 30;
  doc.text(titleText, (doc.internal.pageSize.getWidth() - titleWidth) / 2, titleY, { align: 'center' }); // Centered title text

  y += 10; // Vertical spacing after the title section

  // Question sections
  this.questions.forEach((question, index) => {
    doc.setFillColor(240, 240, 240); // Light gray color for the question background
    doc.setDrawColor(0, 0, 0); // Black color for the question border
    doc.roundedRect(10, y, 190, 60, 3, 3, 'FD'); // Question background rectangle

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black color for the question text
    doc.text(`${index + 1}. ${question.question}`, 15, y + 20); // Question text

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`1. ${question.rep1}`, 15, y + 35); // Answer 1
    doc.text(`2. ${question.rep2}`, 15, y + 45); // Answer 2
    doc.text(`3. ${question.rep3}`, 15, y + 55); // Answer 3

    y += 70; // Vertical spacing after each question section
  });

  doc.save('quiz_questions.pdf');
}
}





