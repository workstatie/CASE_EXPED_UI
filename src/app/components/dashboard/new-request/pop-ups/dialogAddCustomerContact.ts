import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { CustomerContactModel } from 'src/app/models/customercontact.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemValuesService } from 'src/app/services/systemValues.service';


@Component({
    selector: 'dialog-add-customer-contact',
    templateUrl: './dialogAddCustomerContact.html',
    styleUrls: ['./dialogAddCustomerContact.scss']
  })
  export class AddCustomerContactDialogComponent implements OnInit{
    [x: string]: any;
    customerContactForm: FormGroup;

    constructor(
      private systemService: SystemValuesService,
      public dialogRef: MatDialogRef<AddCustomerContactDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public CustomerContact: CustomerContactModel,
      @Inject(MAT_DIALOG_DATA) public data: any
     ) {}
  
     ngOnInit(){

     this.customerContactForm = new FormGroup({
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required,Validators.email]),
        phone: new FormControl(null, Validators.required),
        
        
     });

     
    
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }


    onSubmit() {
      if (this.customerContactForm.valid) {

        const postNewRequest = new CustomerContactModel(
          '1',
          this.customerContactForm.controls['firstname'].value,
          this.customerContactForm.controls['lastname'].value,  
          this.customerContactForm.controls['email'].value,
          this.customerContactForm.controls['phone'].value,
          this.data['custid'],
          this.customerContactForm.controls['firstname'].value +' '+this.customerContactForm.controls['lastname'].value   
          );

          this.systemService.postNewCustomerContact(postNewRequest).subscribe(res => console.log(res));
          this.dialogRef.close(this.customerContactForm.controls['firstname'].value +' '+this.customerContactForm.controls['lastname'].value );
      }

    }
  
  }