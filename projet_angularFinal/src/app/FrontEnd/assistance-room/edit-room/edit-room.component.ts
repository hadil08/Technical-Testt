import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AssistanceRoomService} from "../assistance-room.service";

import {ActivatedRoute, Router} from "@angular/router";
import {Room} from "../../models/Room";

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit{
  private roomId: number;
  room: Room;

  constructor(private dialogRef: MatDialogRef<EditRoomComponent>,  @Inject(MAT_DIALOG_DATA) public data: { roomId: number },private roomService : AssistanceRoomService,    private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.roomId = this.data.roomId;
    console.log("roomiddialog"+this.roomId)
    this.roomService.getRoom(this.roomId).subscribe(room => {
      console.log(room.name+"je vois")
      this.room = room;
    });
  }


  saveChanges() {
    this.roomService.updateRoom( this.room,this.roomId).subscribe(() => {
      //this.router.navigate(['/backRoom']);
      window.location.reload()

    });
  }
}
