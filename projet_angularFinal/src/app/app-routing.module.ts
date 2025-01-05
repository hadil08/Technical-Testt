

import { AdminComponent } from './admin/admin.component';

import { StatisticsComponentComponent } from './admin/statistics-component/statistics-component.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './FrontEnd/Authentification/auth/auth.guard';
import { ActivateAccountComponent } from './FrontEnd/Authentification/activate-account/activate-account.component';
import { ChangepasswordComponent } from './FrontEnd/Authentification/changepassword/changepassword.component';
import { ForgetpasswordComponent } from './FrontEnd/Authentification/forgetpassword/forgetpassword.component';
import { LoginComponent } from './FrontEnd/Authentification/login/login.component';
import { ProfileComponent } from './FrontEnd/Authentification/profile/profile.component';
import { SignupComponent } from './FrontEnd/Authentification/register/signup/signup.component';
import { SigninComponent } from './FrontEnd/Authentification/signin/signin.component';
import { CalenderComponent } from './FrontEnd/Etudiants/Event/calender/calender.component';
import { EventPartComponent } from './FrontEnd/Etudiants/Event/event-part/event-part.component';
import { ListpartComponent } from './FrontEnd/Event/listpart/listpart.component';
import { MyeventsComponent } from './FrontEnd/Event/myevents/myevents.component';
import { UserFrontComponent } from './FrontEnd/user-front/user-front.component';
import { ListcoursesComponent } from './FrontEnd/tuteur/Cours/listcourses/listcourses.component';
import { ListquizComponent } from './FrontEnd/tuteur/Cours/Quiz/listquiz/listquiz.component';
import { EtudcourComponent } from './FrontEnd/Etudiants/Cours/etudcour/etudcour.component';
import { AddofferComponent } from './FrontEnd/tuteur/MesOffers/AddOffer/addoffer/addoffer.component';
import { UpdateOfferComponent } from './FrontEnd/tuteur/MesOffers/UpdateOffer/update-offer/update-offer.component';
import { ListeoffrepublieComponent } from './FrontEnd/tuteur/MesOffers/listeOffreAccepte/listeoffrepublie/listeoffrepublie.component';
import { MesoffersComponent } from './FrontEnd/tuteur/MesOffers/mesoffers/mesoffers.component';
import { PdfViewerModalComponent } from './FrontEnd/tuteur/MesOffers/pdf-viewer-modal/pdf-viewer-modal.component';
import { DemandeofferComponent } from './admin/demandeOffer/demandeoffer/demandeoffer.component';
import { DemmandeparticipationComponent } from './admin/demandeparticipation/demmandeparticipation/demmandeparticipation.component';
import { StatistiquesComponent } from './admin/statistiques/statistiques.component';
import { StatcoursComponent } from './admin/statCours/statcours/statcours.component';
import { EventStatComponent } from './admin/event-stat/event-stat.component';
import {AssistanceRoomComponent} from "./FrontEnd/assistance-room/showRooms/assistance-room.component";
import {CreateRoomComponent} from "./FrontEnd/assistance-room/create-room/create-room.component";
import {ShowPosteComponent} from "./FrontEnd/assistance-room/show-poste/show-poste.component";
import {ARbackendComponent} from "./FrontEnd/assistance-room/arbackend/arbackend.component";
import {PostesBackendComponent} from "./FrontEnd/assistance-room/postes-backend/postes-backend.component";
import {EditRoomComponent} from "./FrontEnd/assistance-room/edit-room/edit-room.component";
import {ChatbotComponent} from "./FrontEnd/tuteur/MesOffers/chatbot/chatbot.component";
import { ListUserComponent } from './admin/list-user/list-user.component';


const routes: Routes = [
  { path: 'dashboard', component: AdminComponent , canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'home', component: UserFrontComponent  },
  { path: 'login', component : LoginComponent},
  { path: 'signup', component : SignupComponent},
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard], data: { roles: ['User', 'Tutor'] }},
  { path: 'signin', component: SigninComponent },
  { path: 'activate', component: ActivateAccountComponent },
  { path: 'statistcs', component: StatisticsComponentComponent },
  { path: 'myevents', component : MyeventsComponent , canActivate: [AuthGuard], data: { roles: ['Tutor'] } },
  { path: 'listpart', component : ListpartComponent , canActivate: [AuthGuard], data: { roles: [ 'Tutor'] }},
  { path: 'listQuiz/:id', component : ListquizComponent },
  { path: 'event', component : EventPartComponent , canActivate: [AuthGuard], data: { roles: ['User'] }},
  { path: 'calander', component : CalenderComponent , canActivate: [AuthGuard], data: { roles: ['User'] }},
  { path: 'Listcourses', component : ListcoursesComponent , canActivate: [AuthGuard], data: { roles: ['Tutor'] }},
  { path: 'etudcours', component : EtudcourComponent },
  { path: 'statcours', component: StatcoursComponent , canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'offer', component : MesoffersComponent ,canActivate:[AuthGuard], data:{roles:['Tutor']}},
  { path: 'Addoffer', component : AddofferComponent,canActivate:[AuthGuard], data:{roles:['Tutor']} },
  { path: 'updateOffer', component : UpdateOfferComponent,canActivate:[AuthGuard], data:{roles:['Tutor']}},
  { path: 'demandeoffer', component : DemandeofferComponent,canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'offrepublie', component : ListeoffrepublieComponent,canActivate: [AuthGuard], data: { roles: ['User', 'Tutor'] }},
  { path: 'demandeparticipation', component : DemmandeparticipationComponent ,canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  { path: 'statistiques', component : StatistiquesComponent ,canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  { path: 'pdf', component : PdfViewerModalComponent},
  { path: 'pdf-viewer/:offerId', component: PdfViewerModalComponent },
  { path: 'eventstat', component: EventStatComponent ,canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  { path: 'assistanceRoom', component : AssistanceRoomComponent}, //eya start from here
  { path: 'createRoom', component : CreateRoomComponent},
  { path: 'showposts/:roomId', component : ShowPosteComponent},
  { path: 'chatBot', component : ChatbotComponent ,  canActivate: [AuthGuard], data: { roles: ['User', 'Tutor'] }},
  { path: 'backRoom', component : ARbackendComponent},
  { path: 'backposte/:roomId', component : PostesBackendComponent},
  { path: 'editRoom', component : EditRoomComponent},
  { path: 'ListUser', component: ListUserComponent ,canActivate: [AuthGuard], data: { roles: ['Admin'] } }





  //{ path: '' , component:UserfrontComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
