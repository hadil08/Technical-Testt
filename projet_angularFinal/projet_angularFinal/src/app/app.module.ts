
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AdminComponent } from './admin/admin.component';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
import {AngularFireModule} from '@angular/fire/compat';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { StatisticsComponentComponent } from './admin/statistics-component/statistics-component.component';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule } from 'angularx-social-login';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
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
import { FooterComponent } from './FrontEnd/footer/footer.component';
import { HeaderComponent } from './FrontEnd/header/header.component';
import { UserFrontComponent } from './FrontEnd/user-front/user-front.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatSortModule } from '@angular/material/sort';
import { ListcoursesComponent } from './FrontEnd/tuteur/Cours/listcourses/listcourses.component';
import { PopupContentComponent } from './FrontEnd/tuteur/Cours/listcourses/popup-content/popup-content.component';
import { QuizComponent } from './FrontEnd/tuteur/Cours/Quiz/quiz/quiz.component';
import { QuestionComponent } from './FrontEnd/tuteur/Cours/Quiz/question/question.component';
import { ListquizComponent } from './FrontEnd/tuteur/Cours/Quiz/listquiz/listquiz.component';
import { EtudcourComponent } from './FrontEnd/Etudiants/Cours/etudcour/etudcour.component';
import { ListquesComponent } from './FrontEnd/Etudiants/Cours/listques/listques.component';
import { MesoffersComponent } from './FrontEnd/tuteur/MesOffers/mesoffers/mesoffers.component';
import { AddofferComponent } from './FrontEnd/tuteur/MesOffers/AddOffer/addoffer/addoffer.component';
import { UpdateOfferComponent } from './FrontEnd/tuteur/MesOffers/UpdateOffer/update-offer/update-offer.component';
import { DemandeofferComponent } from './admin/demandeOffer/demandeoffer/demandeoffer.component';
import { ListeoffrepublieComponent } from './FrontEnd/tuteur/MesOffers/listeOffreAccepte/listeoffrepublie/listeoffrepublie.component';
import { ParticipationComponent } from './FrontEnd/tuteur/MesOffers/participation/participation.component';
import { DemmandeparticipationComponent } from './admin/demandeparticipation/demmandeparticipation/demmandeparticipation.component';
import { SafeUrlPipe } from './FrontEnd/tuteur/MesOffers/SafeUrlPipe';
import { ChatbotComponent } from './FrontEnd/tuteur/MesOffers/chatbot/chatbot.component';
import { PdfViewerModalComponent } from './FrontEnd/tuteur/MesOffers/pdf-viewer-modal/pdf-viewer-modal.component';
import { StatistiquesComponent } from './admin/statistiques/statistiques.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxExtendedPdfViewerServerModule } from 'ngx-extended-pdf-viewer';
import { StatcoursComponent } from './admin/statCours/statcours/statcours.component';
import { EventStatComponent } from './admin/event-stat/event-stat.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MenubarModule} from "primeng/menubar";
import {TagModule} from "primeng/tag";
import {FileUploadModule} from "primeng/fileupload";
import {SelectButtonModule} from "primeng/selectbutton";
import {EditorModule} from "primeng/editor";
import {MultiSelectModule} from "primeng/multiselect";
import {BadgeModule} from "primeng/badge";
import {AvatarModule} from "primeng/avatar";
import {AccordionModule} from "primeng/accordion";
import {ToastModule} from "primeng/toast";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TooltipModule} from "primeng/tooltip";
import {DropdownModule} from "primeng/dropdown";
import {MessageService} from "primeng/api";
import {AssistanceRoomComponent} from "./FrontEnd/assistance-room/showRooms/assistance-room.component";
import {CreateRoomComponent} from "./FrontEnd/assistance-room/create-room/create-room.component";
import {EditRoomComponent} from "./FrontEnd/assistance-room/edit-room/edit-room.component";
import {ShowPosteComponent} from "./FrontEnd/assistance-room/show-poste/show-poste.component";
import {CreatePosteComponent} from "./FrontEnd/assistance-room/create-poste/create-poste.component";
import {ARbackendComponent} from "./FrontEnd/assistance-room/arbackend/arbackend.component";
import {PostesBackendComponent} from "./FrontEnd/assistance-room/postes-backend/postes-backend.component";
import {ChatbotAIComponent} from "./FrontEnd/assistance-room/chatbot/chatbot.component";
import { ListUserComponent } from './admin/list-user/list-user.component';
import { AuthGuard } from './FrontEnd/Authentification/auth/auth.guard';
import { AuthInterceptor } from './FrontEnd/Authentification/auth/auth.interceptor';
import { UserService } from './FrontEnd/Authentification/services/user.service';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { CongratulationsDialogComponentComponent } from './FrontEnd/tuteur/MesOffers/pdf-viewer-modal/congratulations-dialog-component/congratulations-dialog-component.component';
import { environment } from './FrontEnd/tuteur/MesOffers/pdf-viewer-modal/env/environnement';










@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserFrontComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MyeventsComponent,
    ListpartComponent,
    SignupComponent,
    ForgetpasswordComponent,
    ChangepasswordComponent,
    ProfileComponent,
    SigninComponent,
    ActivateAccountComponent,
    StatisticsComponentComponent,
    CalenderComponent,
    EventPartComponent,
    ListcoursesComponent,
    PopupContentComponent,
    QuizComponent,
    QuestionComponent,
    ListquizComponent,
    EtudcourComponent,
    ListquesComponent,
    MesoffersComponent,
    AddofferComponent,
    UpdateOfferComponent,
    DemandeofferComponent,
    ListeoffrepublieComponent,
    ParticipationComponent,
    DemmandeparticipationComponent,
    StatistiquesComponent,
    PdfViewerModalComponent,
    SafeUrlPipe,
    ChatbotComponent,
    StatcoursComponent,EventStatComponent,  AssistanceRoomComponent, //eya start from here
    CreateRoomComponent,
    EditRoomComponent,
    ShowPosteComponent,
    CreatePosteComponent,
    ChatbotAIComponent,
    ARbackendComponent,
    PostesBackendComponent,
    ListUserComponent,
    SidebarComponent,
    CongratulationsDialogComponentComponent





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatSnackBarModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    NgxChartsModule,
    MonacoEditorModule.forRoot(),
    NgbModule,MatDatepickerModule,MatInputModule,MatNativeDateModule,
    MatCardModule, MatButtonModule,MatPaginatorModule,  FullCalendarModule , MatTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), MatSortModule,
    MatDialogModule,

    NgxPaginationModule,
    NgxExtendedPdfViewerServerModule,
    MonacoEditorModule.forRoot(), //eya start from here
    SocialLoginModule,
    MenubarModule,
    TagModule,
    FileUploadModule,
    SelectButtonModule,
    EditorModule,
    NgOptimizedImage,
    MultiSelectModule,
    BadgeModule,
    AvatarModule,
    AccordionModule,
    ToastModule,
    MatIconModule,

    MatProgressSpinnerModule,

   TooltipModule,DropdownModule,
   NgxChartsModule,






  ],
  providers: [MessageService,
    { provide: MAT_DIALOG_DATA, useValue: {}, } // Fournit une valeur par défaut pour MatMdcDialogData
 




],
  bootstrap: [AppComponent]
})
export class AppModule { }


