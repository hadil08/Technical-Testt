import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateRoomComponent} from "../create-room/create-room.component";
import {AssistanceRoomService} from "../assistance-room.service";


@Component({
  selector: 'app-create-poste',
  templateUrl: './create-poste.component.html',
  styleUrls: ['./create-poste.component.css']
})
export class CreatePosteComponent
  implements OnInit {
  text: string | undefined;
  form: FormGroup;
  selectedStatus: { name: string, code: string }[]; // Array of objects
  posteTypes: { name: string, code: string }[] = [
    { name: 'SOLVED', code: '' },
    { name: 'UNSOLVED', code: '❓' },
    { name: 'POPULAR', code: '' },
    { name: 'LATEST', code: '' }
  ];
  constructor(private roomService: AssistanceRoomService ,private dialogRef: MatDialogRef<CreateRoomComponent>,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {/*
    this.posteTypes=[
      { "name":TypePoste.SOLVED,code:"🎉"},
      { "name":TypePoste.UNSOLVED,code:"❓"},
      { "name":TypePoste.POPULAR,code:"🔥"},
      { "name":TypePoste.LATEST,code:"🕒"}]*/
    this.form = this.fb.group({
      postName: ['', Validators.required],
      description: [''],
      typePoste: [''],
      imageURL:['', Validators.required],

    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('postName', this.form.value.postName);
      formData.append('description', this.form.value.description);
      formData.append('imageURL', this.selectedFile);


      // Access selectedStatus from the form
      const selectedPosteType = this.form.value.typePoste;
      formData.append('typePoste', selectedPosteType);
      console.log('Selected type (from form):', selectedPosteType);
//      formData.append('typePoste',t);

      this.roomService.addPost(formData,this.data.roomId)
      console.log('Form submitted! look',formData);
      this.dialogRef.close();
      window.location.reload()
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  selectedFile: File;
}
