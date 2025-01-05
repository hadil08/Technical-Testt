import { Component, Input, NgZone } from '@angular/core';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';
import { AngularFireStorage } from "@angular/fire/compat/storage"
import { Offer } from 'src/app/FrontEnd/models/Offer';
import { UserService } from 'src/app/FrontEnd/Authentification/services/user.service';
import { User } from 'src/app/FrontEnd/Authentification/models/User';

@Component({
  selector: 'app-addoffer',
  templateUrl: './addoffer.component.html',
  styleUrls: ['./addoffer.component.css']
})
export class AddofferComponent {
  userId: number | undefined;
  user: User | null = null;
  @Input() action? : string;
  validators : Validators[] = [];
  universiteForm?: NgForm;
  offer:Offer={ 
    offerId:0,
    titre:'',
    description:'',
    dateSoumission:undefined,
    statut:'Encours',
    imageUrl : '',
    pdfUrls: []=[]

    

  };
    
  offerId?:number;
  foyerToU?: Offer={
    offerId:this.offerId,
    titre:'',
    description:'',
    dateSoumission:undefined,
    statut:'Encours',
    imageUrl : '',
    pdfUrls: []=[]
  };


  dataToAdd : any;
  message: string = '';

  title = 'imageupload';
  constructor(private serviceReservation:ServiceService,  private router: Router,private fireStorage:AngularFireStorage,public userservice:UserService){}
  ngOnInit(): void {
    this.getUserData();
  }

  async onFileChange(event: any) {
    const files = event.target.files; // Récupérez tous les fichiers sélectionnés
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const path = `pdfs/${file.name}`;
        const uploadTask = await this.fireStorage.upload(path, file);
        const url = await uploadTask.ref.getDownloadURL();
       await this.offer.pdfUrls.push(url); // Ajoutez l'URL du fichier PDF à la liste des URL de l'objet Offer
      }
    }
  }
  getUserData() {
    this.userservice.getUserById().subscribe(
      (user: User) => {
        this.user = user;
        this.userId = user.id;
        console.log('User ID:', this.userId);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  
  async ajouterReservation(userId: number) {
    console.log("PDF URLs:", this.offer.pdfUrls); // Affichez les URL des fichiers PDF dans la console
    if (this.offer.pdfUrls.length > 1) { // Vérifiez s'il y a des fichiers PDF à ajouter
      console.log("checkkkkk",this.offer.pdfUrls)
      await this.serviceReservation.postCour(this.offer, userId).subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Offre ajoutée avec succès',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['offer']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding offre:', error);
        }
      );
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Wait Uploading File',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  
  add(){
    if (this.userId)
    this.ajouterReservation(this.userId)
  }
/* async onFileChange(event:any){
  const file = event.target.files[0]
  if(file){
    const path = `pdfs/${file.name}`
    const uploadTask =await this.fireStorage.upload(path,file)
    const url = await uploadTask.ref.getDownloadURL()
    console.log("photo",this.offer.imageUrl);
    // Une fois que l'URL de l'image est disponible, l'assigner à l'attribut 'image' de l'objet 'offer'
    this.offer.imageUrl = url;

    console.log( "rrrrr",this.offer.imageUrl);
  }
}
async ajouterReservation(userId: number) {
  console.log("cffffffffffff: ", this.offer);
  if (this.offer.imageUrl) {
      await  this.serviceReservation.postCour(this.offer,userId).subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Offre ajouter avec succées',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['offer']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding offre:', error);
        }
      );
  }else{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'wait uploading file',
      showConfirmButton: false,
      timer: 1500
    });
  }
  
    
   
    
  }
 */
}
