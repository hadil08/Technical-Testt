import { Component, OnInit } from '@angular/core';
import { CoursService } from '../service/cours.service';

import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
import { PopupContentComponent } from './popup-content/popup-content.component';
import { QuizComponent } from '../Quiz/quiz/quiz.component';
import { Cours } from 'src/app/FrontEnd/models/cours';
import { UserService } from 'src/app/FrontEnd/Authentification/services/user.service';
import { User } from 'src/app/FrontEnd/Authentification/models/User';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-listcourses',
  templateUrl: './listcourses.component.html',
  styleUrls: ['./listcourses.component.css'],
  providers:[CoursService]
})
export class ListcoursesComponent implements OnInit {
  
  
  showCoursByUserId: boolean = false;
  ajoutReussi: boolean | undefined;
  coursListByUserId: any[] = [];
  coursList: any[] = []; // Tableau pour stocker la liste des cours
  userId: number | undefined;
  user: User | null = null;
  contentmodif: any;
  editForm: FormGroup | undefined ;
  closeResult: string | undefined;
  messages: string[] = [];
  Cours: Cours = {
    idC: 0,
    title: '',
    path: null,
    user: { id: null },
    averageRating:0 , 
    totalRatings:0
  };
  
  newCours: Cours = {
    idC: 0,
    title: '',
    path: null,
    user:  { id: null },
    averageRating:0 , 
    totalRatings:0
  };
  file: File | undefined;
  coursToEdit: Cours = {
    idC: 0,
    title: '',
    path: '',
    user:  { id: null  },
    averageRating:0 , 
    totalRatings:0
  };
  Iduser: any;
  pageIndex: number = 0;
    pageSize: number = 2; // Par exemple, initialiser à 10 pour afficher 10 éléments par page
    pageSizeOptions: number[] = [2, 4, 15, 100]; 
  
   constructor(private fireStorage: AngularFireStorage,
    private modalService: NgbModal,
    public userService: UserService  ,
    private coursService: CoursService,
    private router: Router,
    private fb: FormBuilder) {
      this.editForm = this.fb.group({
        title: ['', Validators.required],
        userid: ['', Validators.required],
        path: ['']
      });
    }
       

  ngOnInit(): void {
    this.getUserData();
    console.log('on init ')
    
   
  }
  loadCours() {
    this.coursService.retrieveAllCours().subscribe(
      (cours) => {
        this.coursList = cours;
      },
      (error) => {
        console.error('Error fetching cours:', error);
      }
    );

}
getUserData() {
  this.userService.getUserById().subscribe(
    (user: User) => {
      this.user = user;
      this.userId = user.id;
      this.loadCoursByUserId(this.userId);
      console.log('User ID:', this.userId);
    },
    (error) => {
      console.error('Error fetching user data:', error);
    }
  );
}
deleteCours(idC: number) {
  this.coursService.deleteCours(idC).subscribe(
    () => {
      // Once the course is successfully deleted, reload the list of courses
      this.loadCours();
      Swal.fire({
        title: 'Course Deleted',
        html: "The course has been deleted successfully.",
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
    },
    (error) => {
      console.error('Error deleting the course:', error);
    }
  );
}


 // Méthode pour mettre à jour un cours
 updateCours(cours: any) {
  this.coursService.updateCours(cours).subscribe(
    (data: any) => {
      // Une fois le cours mis à jour avec succès, rechargez la liste des cours
      this.loadCours();
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du cours:', error);
    }
  );
}


loadCoursByUserId(Iduser: number) {
  // Convert user ID to a number if necessary
  const userIdNumeric = Number(Iduser);
  console.log(userIdNumeric);
  if (isNaN(userIdNumeric)) {
    console.error('Invalid user ID');
    return;
  }

  // Call the method to load courses by user ID
  this.coursService.retrieveAllCoursByUserId(userIdNumeric).subscribe(
    (cours) => {
      this.coursList = cours;
    },
    (error) => {
      console.error('Error fetching courses by user ID:', error);
    }
  );
} 

open(content: any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
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
async onSubmit() {
  console.log('User ID in submit:', this.userId);
  // Check if a file is selected in the form
  if (!this.file) {
    Swal.fire({
      title: 'Error',
      html: "Please select a file before submitting the form.",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'OK',
    });
    return; // Stop the execution of the method if no file is selected
  }

  if (this.userId) {
    try {
      const path = `yt/${this.file.name}`;
      const uploadTask = await this.fireStorage.upload(path, this.file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);

      this.newCours.path = url;
      this.newCours.user.id = this.userId;

      this.newCours.idC = new Date().getTime();

      this.coursService.addCours(this.newCours).subscribe(
        (result: any) => {
          console.log('Course added successfully:', result);
          Swal.fire({
            title: 'Course Added',
            html: "Course added successfully.",
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.modalService.dismissAll();
              window.location.reload();
            }
          });
        },
        (error: any) => {
          console.error('Error adding the course:', error);
          Swal.fire({
            title: 'Error',
            html: "An error occurred while adding the course. Please try again.",
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'OK',
          });
        }
      );
    } catch (error) {
      console.error('Error uploading the file:', error);
      Swal.fire({
        title: 'Error',
        html: "An error occurred while uploading the file. Please try again.",
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'OK',
      });
    }
  }
}





title = 'imageupload';

onFileChange(event: any) {
  this.file = event.target.files[0];
}
// modification 
openEditModal(targetModal: any, cours: Cours) {
  // Ouvrir le modal avec les paramètres spécifiés
  const modalRef = this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });

  // Afficher les détails du cours dans les champs de formulaire du modal
  modalRef.componentInstance.coursToEdit = cours;
}
openPopup(id: number) {
  const modalRef = this.modalService.open(PopupContentComponent);

  // Accédez à l'instance du composant de popup pour transmettre l'ID
  modalRef.componentInstance.id = id;

}
goaddquiz(id: number) {
  const modalRef = this.modalService.open(QuizComponent);

  // Accédez à l'instance du composant de popup pour transmettre l'ID
  modalRef.componentInstance.id = id;
  
}
golistquiz(idC: number )
{
  this.router.navigate(['/listQuiz', idC]);
}
onPageChange(event: any) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
}



}




