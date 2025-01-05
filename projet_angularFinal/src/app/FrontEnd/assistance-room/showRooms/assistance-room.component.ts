import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AssistanceRoomService} from "../assistance-room.service";

import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {CreateRoomComponent} from "../create-room/create-room.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Room} from "../../models/Room";

@Component({
  selector: 'app-assistance-room',
  templateUrl: './assistance-room.component.html',
  styleUrls: ['./assistance-room.component.css']
})
export class AssistanceRoomComponent implements OnInit {
  items: MenuItem[];
  public  privaterooms : Room[];
  public  publicrooms : Room[];
  showPrivate: boolean = false;
  showPublic: boolean = true;
/*
  showinitial: boolean = true;
*/

  // Sample data
  privateList: Room[] ;
  publicList: string[] ;

  constructor(private assistanceRoom: AssistanceRoomService, private dialog: MatDialog,private sanitizer: DomSanitizer) {}

  visible: boolean = false;
  convertedImageUrls: SafeUrl[] = []; // Ensure it is initialized as an empty array


  OpenModel(){
    const modeDiv = document.getElementById('myModal');
    if(modeDiv != null){
      modeDiv.style.display='block';
    }
  }

  CloseModel(){
    const modeDiv = document.getElementById('myModal');
    if(modeDiv != null){
      modeDiv.style.display='none';
    }
  }
  ngOnInit() {
    this.privateList =this.getRooms();



  }

  public getRooms(): any {
    this.assistanceRoom.getRooms("publicRoom").subscribe(
      (response: Room[]) => {

        this.publicrooms = response
        response.forEach(room => {

          const convertedImageUrl = this.convertAndSetImage(room.imageUrl);
          this.convertedImageUrls.push(convertedImageUrl);

        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )

    this.assistanceRoom.getRooms("privateRoom").subscribe(
        (response: Room[]) => {

          this.privaterooms = response
          response.forEach(room => {

            const convertedImageUrl = this.convertAndSetImage(room.imageUrl);
            this.convertedImageUrls.push(convertedImageUrl);

          });
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
    )
  }


  openDialog() {
    this.dialog.open(CreateRoomComponent , {

      // Add other MatDialog configurations here
    });

    this.dialog.afterAllClosed.subscribe(result => {
      console.log('The dialog was closed');
    });}

  convertBase64ToImage(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  imageUrl: SafeUrl;

  convertAndSetImage(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }


  onChange(optionValue: any) {
    this.showPrivate = optionValue === '2'; // Toggle showPrivate based on the selected option
    this.showPublic = optionValue === '1'; // Toggle showPrivate based on the selected option
  }
}
