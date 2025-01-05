import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Participation } from '../../models/Participation';
import { Offer } from '../../models/Offer';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private apiURL = 'http://172.213.169.60:8081/SKyTeck/';

  constructor(private http: HttpClient) {
   }

   postCour(cours: any,userId:number): Observable<any> {
    return this.http.post(this.apiURL + `OfferController/AddOffer/${userId}`, cours)
  }

  Participer(participation:any ,offerId:number): Observable<any> {
    return this.http.post(this.apiURL + `ParticipationController/participerOffre/${offerId}`,participation)
  }


  sendmail(participation:any): Observable<any> {
    return this.http.post<any>(this.apiURL + `ParticipationController/sendmailtofinich/test`,participation)
  }
  getAllcour(): Observable<any> {
    return this.http.get<any>(this.apiURL + "OfferController/AllOffer")
  }

  getAllParticipationmail(): Observable<Participation[]> {
    return this.http.get<Participation[]>(this.apiURL + "ParticipationController/GetAllParticipation");
  }

  getAllParticipation(): Observable<any> {
    return this.http.get(this.apiURL + "ParticipationController/GetAllParticipation")
  }

  getCourById(id: any): Observable<any> {
    return this.http.get(this.apiURL + `OfferController/getByofferId/${id}`)
  }


  getOfferAcceptee(): Observable<any> {
    return this.http.get(this.apiURL + "OfferController/getOfferByStatut")
  }

  updateCours(cours: Offer): Observable<Offer> {
    return this.http.put<Offer>(
      this.apiURL + 'OfferController/updateOffer',
      cours,
      this.httpOptions
    );
  }

  deleteCours(offerId: number): Observable<any> {
    return this.http.delete(this.apiURL + "OfferController/DeleteOffer/" + offerId,
      this.httpOptions)
  }

  getoffrerByIduser(userId: number): Observable<any> {
    return this.http.get(this.apiURL + "OfferController/GetOfferByUserId/" +userId)
  }
  showToast(): void {
    Swal.fire({
      icon: 'success',
      title: 'Opération réussie',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  // Accepter une demande de cours
  accepterDemandeCours(offerId: number): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiURL}OfferController/AccepterOffer/${offerId}`, {});
  }

  // Refuser une demande de cours
  refuserDemandeCours(id: number): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiURL}OfferController/RefuserOffer/${id}`, {});
  }
   // Accepter une demande de cours
   accepterDemandeParticipation(offerId: number): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiURL}ParticipationController/AccepterParticipation/${offerId}`, {});
  }

  // Refuser une demande de cours
  refuserDemandeParticipation(id: number): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiURL}ParticipationController/RefuserParticipation/${id}`, {});
  }
  
  obtenirStatistiquesParticipations(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}ParticipationController/statistiques`);
  }


  envoyerEmail(participation: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}emailController/certif`, participation);
  }
  generateCertification(offerId: number): Observable<Blob> {
    return this.http.get(`${this.apiURL}GenererCertif/generatecertifpng/${offerId}`, { responseType: 'blob' });
  }
  
  
  
}