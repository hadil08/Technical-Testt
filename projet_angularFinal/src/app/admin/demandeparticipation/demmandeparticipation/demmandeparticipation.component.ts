import { Component } from '@angular/core';
import { TwilioserviceService } from '../../demandeOffer/twilioservice.service';
import { ServiceService } from 'src/app/FrontEnd/tuteur/MesOffers/service.service';
import { Participation } from 'src/app/FrontEnd/models/Participation';

@Component({
  selector: 'app-demmandeparticipation',
  templateUrl: './demmandeparticipation.component.html',
  styleUrls: ['./demmandeparticipation.component.css']
})
export class DemmandeparticipationComponent {
  page: number = 1;
  itemsPerPage: number = 4;
  participation: any = [];
  statut?:'En cours';
  constructor(private twilioService: TwilioserviceService,private offerservice: ServiceService) { }
  participations: Participation[] = [];
  message: string ="";
  msgSMS : string ="**** Campus Living Spaces **** - Resulat de votre demande de reservation : -----";
  ngOnInit() {
    this.getAllParticipation();

  }

  getAllParticipation() {
    this.offerservice.getAllParticipation().subscribe((data) => {
      this.participations = data;
      console.log("Object partic ",this.participations);
      console.log(data);
      
      this.participation = data;

    })

  }

  accepterParticipate(id:any): void {
    console.log('tttttt')
      this.offerservice.accepterDemandeParticipation(id).subscribe((data: any) => {
        console.log('Réponse de l\'API :', data); 
        this.message= data['message'];
        if (data['statut']=='Acceptee'){
          console.log("sssssssss")
          this.participation.statut = 'Acceptee';
         this.msgSMS=this.msgSMS+ " Votre participation est accepté  " +data['accepted'] + "Vous pouvez consulter votre espace pour plus d'informations.";
        this.envoyerSMS(this.msgSMS);}
        
      });
      window.location.reload();
    }
    refuserParticipate(id:any): void {
      console.log('tttttt')
        this.offerservice.accepterDemandeParticipation(id).subscribe((data: any) => {
          console.log('Réponse de l\'API :', data);
          
        });
        this.getAllParticipation();
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
