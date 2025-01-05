import { trigger, transition, animate } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { style } from 'd3-selection';

@Component({
  selector: 'app-congratulations-dialog-component',
  templateUrl: './congratulations-dialog-component.component.html',
  styleUrls: ['./congratulations-dialog-component.component.css']
  
})
export class CongratulationsDialogComponentComponent {
  showRibbons: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CongratulationsDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // Déclencher l'animation des rubans après un court délai
    setTimeout(() => {
      this.showRibbons = true;
    }, 500);
  }

}
