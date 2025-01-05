import { Component, EventEmitter, Output } from '@angular/core';

import { TwilioserviceService } from '../twilioservice.service';
import { ServiceService } from 'src/app/FrontEnd/tuteur/MesOffers/service.service';
import { Offer } from 'src/app/FrontEnd/models/Offer';

@Component({
  selector: 'app-demandeoffer',
  templateUrl: './demandeoffer.component.html',
  styleUrls: ['./demandeoffer.component.css']
})
export class DemandeofferComponent {
  @Output() actionCompleted = new EventEmitter<string>();
  page: number = 1;
  itemsPerPage: number = 4;
  cours: any = [];
  statut?:'En cours';
  constructor(private twilioService: TwilioserviceService,private offerservice: ServiceService) { }
  offers: Offer[] = [];
  message: string ="";
  msgSMS : string ="**** Campus Living Spaces **** - Resulat de votre demande de reservation : -----";
  ngOnInit() {
    this.getAllcours();

  }

  getAllcours() {
    this.offerservice.getAllcour().subscribe((data) => {
      this.offers = data;
      console.log("Object reservation ",this.offers);
      console.log(data);
      this.cours = data;

    })

  }
  accepterOffre(id:any): void {
    console.log('tttttt')
      this.offerservice.accepterDemandeCours(id).subscribe((data: any) => {
        console.log('Réponse de l\'API :', data); 
        this.message= data['message'];
        if (data['statut']=='Acceptee'){
          console.log("sssssssss")
         this.msgSMS=this.msgSMS+ " Votre cours est accepté  " +data['accepted'] + "Vous pouvez consulter votre espace pour plus d'informations.";
        this.envoyerSMS(this.msgSMS);}
        
      });
      window.location.reload();
    }
    refuserOffre(id:any): void {
      console.log('tttttt')
        this.offerservice.refuserDemandeCours(id).subscribe((data: any) => {
          console.log('Réponse de l\'API :', data);
          
        });
        this.getAllcours();
        window.location.reload();
      }
      
  envoyerSMS(msgSMS:any) {
    const numeroDestinataire = '+21650214550'; // Remplacez par le numéro réel

    this.twilioService.sendSMS(numeroDestinataire, msgSMS).subscribe(
      (response) => {
        console.log('SMS envoyé avec succès', response);
      },
      (error) => {
        console.error('Erreur lors de l\'envoi du SMS', error);
      }
    );

  }
  
}
