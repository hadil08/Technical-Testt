import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Validators} from "@angular/forms";
import {AssistanceRoomService} from "../assistance-room.service";

import {Observable} from "rxjs";

@Component({
  selector: 'app-postes-backend',
  templateUrl: './postes-backend.component.html',
  styleUrls: ['./postes-backend.component.css']
})
export class PostesBackendComponent {
  roomId: number=this.activateRoute.snapshot.params["roomId"];
  public postes: any[];
 constructor(private activateRoute: ActivatedRoute,private roomService : AssistanceRoomService) {

   this.activateRoute.params.subscribe(params => {  this.roomId = +params['roomId']; // Convert roomId to number
     console.log("roomId", this.roomId);})
   this.getPosteByRoom();

 }
  roomPostCount: Map<number, number>;


  getPosteByRoom(){
    this.roomService.getAllPosteForRoom(this.roomId).subscribe(
        (res: any[] )=>{
          this.postes=res ;

          console.log(res)
        }
    )
  }

}
