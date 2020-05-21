import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { CustomerModel } from 'src/app/models/customer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'dialog-add-customer',
    templateUrl: './dialogAddCustomer.html',
  })
  export class AddCustomerDialogComponent implements OnInit{
    customerForm: FormGroup;

    constructor(
      public dialogRef: MatDialogRef<AddCustomerDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public Customer: CustomerModel
     ) {}
  
    ngOnInit(){
     this.customerForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
        
     });

    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }