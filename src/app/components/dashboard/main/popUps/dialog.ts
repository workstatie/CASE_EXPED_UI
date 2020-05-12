import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import { UserModel } from 'src/app/models/user.model';


@Component({
    selector: 'dialog-user',
    templateUrl: './dialog.html',
  })
  export class DialogComponent implements OnInit{
  
    constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public user: UserModel) {}
  
    ngOnInit(){
      console.log(this.user)
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }