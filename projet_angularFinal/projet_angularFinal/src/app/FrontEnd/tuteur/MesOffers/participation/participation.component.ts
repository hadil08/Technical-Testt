import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.css']
})
export class ParticipationComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  message: string = this.data.message;
}
