import { Component, Inject, Input } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Offer } from 'src/app/FrontEnd/models/Offer';

@Component({
  selector: 'app-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.css']
})
export class UpdateOfferComponent {

  Offer: Offer = new Offer(); // Initialisez une instance de l'offre



  @Input() action?: string;
  validators: Validators[] = [];
  universiteForm?: NgForm;
  offer: Offer = {
    
    offerId: 0,
    titre: '',
    description: '',
    dateSoumission: undefined,
    statut: 'Encours',
    pdfUrls: [],
    user:{ id: null },

    


  };
  newoffer: Offer = {
    
    offerId: 0,
    titre: '',
    description: '',
    dateSoumission: undefined,
    statut: 'Encours',
    pdfUrls: [],
    user:{ id: null },

    


  };
  foyerToU?: Offer = {
    offerId: this.offerId,
    titre: '',
    description: '',
    dateSoumission: undefined,
    statut: 'En cours',
    pdfUrls: [],
    user:{ id: null },


  };
  offers: Offer[] = [];
  message: string = '';
  dataToAdd: any;
  offerId?: number;
  constructor(private route: ActivatedRoute, private offerservice: ServiceService, private router: Router, public dialogRef: MatDialogRef<UpdateOfferComponent>, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { action: string, offer: Offer }) { }
  ngOnInit(): void {


    console.log("hello from update : ", this.data.offer);
    if (this.data.offer) {
      this.offer=this.newoffer;


      };
    }
  

 /* getofferid() {
    this.offerservice.getAllcour().subscribe((data: Offer[]) => {
      this.offers = data;
      console.log("getnull", this.offers);
    });

  }*/


  // bouton annuler 
  onAnnulerClick(): void {
    if (this.universiteForm) {
      this.universiteForm.resetForm();
    }
    this.dialogRef.close();
    //window.location.reload();
    this.router.navigate(['offer']);

  }


  //update
  onUpdate(offer: any): void {
    console.log("hello  from update",);
   
    console.log("offre : ", offer);

    this.offerservice.updateCours(this.newoffer).subscribe(
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'OFFRE  updated avec succées',
          showConfirmButton: false,
          timer: 1500
        });
        // this.router.navigate(['offer']);
      
        window.location.reload();
        
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding foyer:', error);
      }
    );
  }
}