import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrierModel } from 'src/app/models/carrier.model';


@Component({
    selector: 'dialog-user',
    styleUrls: ['./dialog.scss'],
    templateUrl: './dialog.html',
  })
  export class CarrierDialogComponent implements OnInit{
     carrier: CarrierModel;

    constructor(
      public dialogRef: MatDialogRef<CarrierDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public inputData: any) {}
  
    ngOnInit(){
      
      this.carrier = this.inputData.inputData
  
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }