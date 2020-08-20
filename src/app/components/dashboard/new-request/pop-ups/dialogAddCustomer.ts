import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject, OnInit, AfterContentChecked, DoCheck} from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { CustomerModel } from 'src/app/models/customer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemValuesService } from 'src/app/services/systemValues.service';
import { OktaAuthService } from '@okta/okta-angular';


@Component({
    selector: 'dialog-add-customer',
    templateUrl: './dialogAddCustomer.html',
    styleUrls: ['./dialogAddCustomer.scss']
  })
  export class AddCustomerDialogComponent implements OnInit{
    [x: string]: any;
    customerForm: FormGroup;
    token = " ";

    constructor(
      private systemService: SystemValuesService,
      public oktaAuth: OktaAuthService,
      public dialogRef: MatDialogRef<AddCustomerDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public Customer: CustomerModel,
      @Inject(MAT_DIALOG_DATA) public data: any
     ) {}
  
     ngOnInit(){

     this.customerForm = new FormGroup({
        customername: new FormControl(null, Validators.required),
        solutiontime: new FormControl(null, Validators.required),
        
        
     });

     this.customerForm.setValue({
      customername: this.data['custname'],
      solutiontime: 60
     });
     
    }

    
    onNoClick(): void {
      this.dialogRef.close();
    }

    formatLabel(value: number) {
      if (value >= 60) {
        if (value%60 >0)
        {return Math.round(value / 60) + 'h'+ value%60;}
        else{return Math.round(value / 60) + 'h'}
        
      }
  
      return value+'m';
    }
    onSubmit() {
      if (this.customerForm.valid) {

        const postNewRequest = new CustomerModel(
          "1",
          this.customerForm.controls['customername'].value,
          "1",
          this.customerForm.controls['solutiontime'].value
          );

          this.systemService.postNewCustomer(postNewRequest).subscribe(res => console.log(res));
          this.dialogRef.close();
      }

    }
  
  }