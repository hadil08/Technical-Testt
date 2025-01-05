import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Room} from "../models/Room";
import {Comment} from "../models/Comment";
import {Poste} from "../models/Poste";
import {Reaction} from "../models/Reaction";


@Injectable({
  providedIn: 'root'
})
export class AssistanceRoomService  {
  private apiServerURL: any = 'http://localhost:8081/SKyTeck';
  comments : Comment[]= [];
  /******************Gemini***************************/
  private messageHistory : BehaviorSubject<any>= new BehaviorSubject<any>(null);


  private generativeAI : GoogleGenerativeAI
  constructor(private http: HttpClient) {
    this.generativeAI= new GoogleGenerativeAI('AIzaSyBzDv-ZqOJt2NPzB7yYhMmPIXaG2WdZ9M0')
  }

  /********************GRMINI**************************/

  async generativeText(prompt : string){
    const model = this.generativeAI.getGenerativeModel({model: 'gemini-pro'})
    this.messageHistory.next({
      from: 'user',
      message: prompt
    })
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    this.messageHistory.next({
      from: 'bot',
      message: text
    })

  }
  public  getMessageHistory(): Observable<any>{
    return  this.messageHistory.asObservable();
  }
  /********************Rooms***************************/
  public getRoom(roomId:number){
    return this.http.get<Room>(`${this.apiServerURL}/room/get/${roomId}`)

  }

  public getRooms(roomString : string): Observable<Room[]> {


    return this.http.get<Room[]>(`${this.apiServerURL}/room/${roomString}`)
  }
  public createRoom(formData:any,userid:number) {
    this.http.post<any>(`${this.apiServerURL}/room/saveRoom/${userid}`, formData).subscribe(
      response => {
        // Handle success
        console.log('Form submitted successfully:', response);

      },
      error => {
        // Handle error
        console.error('Error submitting form:', error);
      }
    );
  }

  public deleteRoom(numRoom:number){
    return this.http.delete<any>(`${this.apiServerURL}/room/delete/${numRoom}`)

  }
  public getAllrooms (){
    return this.http.get<Room[]>(`${this.apiServerURL}/room/allrooms`)

  }

  updateRoom(room: Room, roomId: number): Observable<Room> {
    const url = `${this.apiServerURL}/room/update/${roomId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Room>(url, room, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error); // For demo purposes only
    return throwError(error); // You can also transform the error message here
  }
  /*backend room*/

  public getRepoIssues(

  ): Observable<Room[]> {


    return this.http.get<Room[]>(`${this.apiServerURL}/room/allrooms`)
  }


  /********************Post***************************/





  // Inside your Angular service or component class
  addPost(data: any, roomId: number): void {


    // Send HTTP POST request with JSON data
    this.http.post<any>(
      `${this.apiServerURL}/poste/add/${roomId}`,
      data
    ).subscribe(
      response => {
        // Handle success
        console.log('Poste Form submitted successfully:', response);
      },
      error => {
        // Handle error
        console.error('poste Error submitting form:', error);
      }
    );
  }
  getAllPosteForRoom(roomId: number): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.apiServerURL}/poste/roomid/${roomId}`);
  }
  //******************************commentes*********************
  addComment(idpost,text){
    this.http.post<any>(`${this.apiServerURL}/comment/add/${idpost}`, text).subscribe(
      response => {
        // Handle success
        console.log('Form submitted successfully:', response);

      },
      error => {
        // Handle error
        console.error('Error submitting form:', error);
      }
    );
  }

  getCommentByposte(postid): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiServerURL}/comment/all/${postid}`);
  }

  /******************************reaction*************************/
  addreaction (postid ,reactiontype:Reaction) {
    return this.http.get<number>(`${this.apiServerURL}/poste/add-reaction/${reactiontype}/${postid}`);

  }
  removereaction (postid ,reactiontype:Reaction) {
    return this.http.get<number>(`${this.apiServerURL}/poste/remove-reaction/${reactiontype}/${postid}`);

  }
  reactthumbsdown (postid ,reactiontype:Reaction) {
    return this.http.get<number>(`${this.apiServerURL}/poste/add-reaction/${reactiontype}/${postid}`);

  }

  /*********************endreactions***************************************/






  /*********stat**************/
  getRoomPostCount() {
    return this.http.get<Map<number, number>>(`${this.apiServerURL}/room/stat`);
  }
}
