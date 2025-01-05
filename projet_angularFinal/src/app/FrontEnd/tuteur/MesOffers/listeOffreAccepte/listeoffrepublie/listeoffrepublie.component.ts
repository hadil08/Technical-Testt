import { Component } from '@angular/core';
import { ServiceService } from '../../service.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Participation } from 'src/app/FrontEnd/models/Participation';
import { Offer } from 'src/app/FrontEnd/models/Offer';
import { User } from 'src/app/FrontEnd/Authentification/models/User';



@Component({
  selector: 'app-listeoffrepublie',
  templateUrl: './listeoffrepublie.component.html',
  styleUrls: ['./listeoffrepublie.component.css']
})
export class ListeoffrepublieComponent {
  pdfDoc: any;
  currentPage = 1;
  totalPages = 0;
  nombreOffresVisualisees: number = 0;


  participation:Participation={ 
    participationId:0,
    titreoffer:'',
    descriptionoffer:'',
    statut:'EnAttente'
    
  };
    
  offers?: Offer[];
  offerId?: any;
  tuteurs?:User[];
  demandeEnvoyee: boolean = false;
  message: string = 'Votre demande de participation est envoyée';
  constructor(private offreService: ServiceService,public dialog: MatDialog,private router :Router) { }

  ngOnInit(): void {
    this.offreService.getOfferAcceptee().subscribe(offres => {
      this.offers = offres;
      console.log("offres : " , this.offers  );
      
    });
  }


  
  participerOffre(offreId: any): void {
  
    this.offreService.Participer(this.participation, offreId).subscribe(
      (offer:any) => {
        
        Swal.fire({
          title: 'Message',
          text: this.message,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            // Une fois que l'utilisateur a cliqué sur OK, désactivez le bouton , { queryParams: { url: offer.imageUrl } }
            this.demandeEnvoyee = true;
           
       
         
          }})
      },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          Swal.fire({
            title: 'Erreur',
            text: 'Pas de place disponible pour cette offre.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          console.error('Error adding participation:', error);
        }
      }
    );
   
  }
 
  
  startCours(offerId: any) {
      
        this.router.navigate(['/pdf-viewer', offerId]);
    }
    
  


  
  }