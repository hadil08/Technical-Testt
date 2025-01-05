import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursService } from '../../service/cours.service';
import { Cours } from 'src/app/FrontEnd/models/cours';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.css']
})
export class PopupContentComponent implements OnInit {
  @Input() id: number | undefined;
  newCours: Cours = {
    idC: 0,
    title: '', 
    path: '',
    user: { id: null },
    averageRating:0 , 
    totalRatings:0
  }; // Nouveau cours à ajouter
  ajoutReussi: boolean | undefined;
  coursToEdit: Cours = {
    idC: 0,
    title: '',
    path: '',
    user: { id: null },
    averageRating:0 , 
    totalRatings:0
  }; // Initialisation avec un cours vide
  file: File | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private fireStorage: AngularFireStorage, 
              private coursService: CoursService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.id) {
      console.log("ID reçu dans le popup :", this.id);
      this.retrieveCoursById(this.id);
    }
    
  }

  retrieveCoursById(id: number) {
    this.coursService.retrieveCoursById(id).subscribe(
      (cours: Cours) => {
        this.coursToEdit = cours;
      },
      (error) => {
        console.error('Error fetching cours:', error);
      }
    );
  }

  async onSubmit() {
    if (this.file) {
      const path = `yt/${this.file.name}`;
      const uploadTask = await this.fireStorage.upload(path, this.file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);
      this.coursToEdit.path = url; // Mise à jour du chemin du fichier
    }
    console.log(this.coursToEdit);
    this.coursService.updateCours(this.coursToEdit).subscribe(
      (resultat) => {
        console.log('Cours mis à jour avec succès :', resultat);
        alert("Ceci est un message dans une petite fenêtre.");
        this.ajoutReussi = true;
        this.router.navigate(['Listcourses']);
        // Réinitialisez le formulaire ou effectuez d'autres actions après la mise à jour réussie
      },
      (erreur) => {
        console.error('Erreur lors de la mise à jour du cours :', erreur);
        // Gérez l'erreur ici
      }
    );
  }
  
  onFileChange(event: any) {
    this.file = event.target.files[0];
  }
 
}


