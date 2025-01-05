import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AssistanceRoomService} from "../assistance-room.service";
import {HttpClient} from "@angular/common/http";

import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {TypeRoom} from "../../models/TypeRoom";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {
  myForm: FormGroup;
  stateOptions: any[] = [{ label: 'private', value: TypeRoom.PRIVATE },{ label: 'public', value: TypeRoom.PUBLIC }];

  valueRoom: string = 'off';
  idUser : number =1 ;

  constructor(private dialogRef: MatDialogRef<CreateRoomComponent>,private router: Router,private fb: FormBuilder,private roomService : AssistanceRoomService,private http: HttpClient) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image:['', Validators.required],
      typeRoom:[],
      capacity:['', Validators.required]

    });
  }



  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  selectedFile: File;


  onSubmit(): void {

    console.log(this.myForm.value);
    if (this.myForm.invalid) {
      console.log("wronnnng")
      return;
    }
    const formData = new FormData();
    formData.append('name', this.myForm.value.name);
    formData.append('description', this.myForm.value.description);
    formData.append('image', this.selectedFile);
    formData.append('capacity', this.myForm.value.capacity);
    formData.append('typeRoom',this.valueRoom);
    //the use iss here
    this.roomService.createRoom(formData,this.idUser);
    this.dialogRef.close();
    window.location.reload();


  }
}
