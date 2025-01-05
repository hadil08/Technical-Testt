import { Component, EventEmitter, Output } from '@angular/core';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { UpdateOfferComponent } from '../UpdateOffer/update-offer/update-offer.component';
import { Offer } from 'src/app/FrontEnd/models/Offer';
import { User } from 'src/app/FrontEnd/Authentification/models/User';
import { UserService } from 'src/app/FrontEnd/Authentification/services/user.service';

@Component({
  selector: 'app-mesoffers',
  templateUrl: './mesoffers.component.html',
  styleUrls: ['./mesoffers.component.css']
})
export class MesoffersComponent {
  filteredOffers!: any[];
  userId: number | undefined;
  user: User | null = null;
  @Output() actionCompleted = new EventEmitter<string>();
  cours: any = [];
  page: number = 1;
  itemsPerPage: number = 3;
  constructor(private offerservice: ServiceService, private dialog: MatDialog, private sharedService: ServiceService,public userservice:UserService) { }
  offers: Offer = new Offer();
  offer: Offer[] = [];
  Offer: Offer = new Offer(); // Initialisez une instance de l'offre
  ngOnInit() {
    this.getUserData();
    if(this.userId)
    this.getAllcours(this.userId)

  }
  getUserData() {
    this.userservice.getUserById().subscribe(
      (user: User) => {
        this.user = user;
        this.userId = user.id;
      this.getAllcours(this.userId);

        console.log('User ID:', this.userId);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  getAllcours(userId:number) {
    this.offerservice.getoffrerByIduser(userId).subscribe((res) => {
      console.log(res);
      this.cours = res;

    })

  }
  


  deleteCour(id: any): void {
    Swal.fire({
      title: 'Es-tu sûr?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.offerservice.deleteCours(id).subscribe(() => {
          Swal.fire({
            title: 'Supprimé!',
            text: 'Votre fichier a été supprimé.',
            icon: 'success'
          }).then(() => {
          });
        });
        window.location.reload();
      }

    });
    this.actionCompleted.emit('une reservation  a été supprimé. ');
  }
  //Update 
  openUniversiteUpdate(universite: Offer): void {
    const dialogRef = this.dialog.open(UpdateOfferComponent, {
      width: '50%',
      height: '70%',
      position: {
        left: '30%',
      },
      data: {
        action: 'update',
        offer: universite // Données de l'université à mettre à jour
      }
     
      
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Fermeture du dialogue avec le résultat : ${result}`);
      if (result) {
        if (result.foyerToUpdate) {
          // Mettre à jour l'université

          this.offerservice.updateCours(result.foyerToUpdate).subscribe((foyerUpdated) => {
            console.log("Dernier foyer mis à jour :", foyerUpdated);

          });

        }

      }
    });
  }


 
}
