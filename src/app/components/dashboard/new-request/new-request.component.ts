import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemValuesService } from 'src/app/services/systemValues.service';
import { TruckTypeModel } from 'src/app/models/truckType.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/requests.service';
import { RequestsModel } from 'src/app/models/requests.model';
import { DatePipe } from '@angular/common';
import { StatusTypeModel } from 'src/app/models/statusType.model';
import { CustomerModel } from 'src/app/models/customer.model';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AddCustomerDialogComponent } from './pop-ups/dialogAddCustomer';
import { AddCustomerContactDialogComponent } from './pop-ups/dialogAddCustomerContact';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerContactModel } from 'src/app/models/customercontact.model';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';



@Component({
  selector: 'new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit, OnChanges {

  CountryOptions: string[] = ['One', 'Two', 'Three'];

  enterNewRequestForm: FormGroup;
  truckTypes: TruckTypeModel[];
  assignToCurrentUser: Boolean = true;
  dateNow = new Date();
  customers: CustomerModel[] = [];
  customerContacts: CustomerContactModel[];
  filteredCountryOptions: Observable<string[]>;
  filteredOptions: Observable<CustomerModel[]>;
  filteredContactOptions: Observable<CustomerContactModel[]>;
  newCustomerContactCreated: string;
  opencustomercontactfield: Boolean = false;

  
  constructor(
    private systemService: SystemValuesService,
    private snackBar: MatSnackBar,
    private requestService: RequestService,
    public datepipe: DatePipe,
    public dialog: MatDialog
    ) { }

  //@Output() newTicketCreated: EventEmitter<any> = new EventEmitter<any>();

  // @Input() ticket: RequestsModel;
  @ViewChild('picker') picker: any;

  ngOnInit(): void {

    console.log("New request initiated")
    this.customers = this.systemService.getAllCustomers();
       


    this.truckTypes = this.systemService.getTruckTypes();

    this.enterNewRequestForm = new FormGroup({
      customerSearch :new FormControl(null, Validators.required),
      customerContactSearch :new FormControl(null, Validators.required),
      locationFrom: new FormControl(null, Validators.required),
      locationTo: new FormControl(null, Validators.required),
      countryTo: new FormControl(null, Validators.required),
      countryFrom: new FormControl(null, Validators.required),
      postcodeTo: new FormControl(null, Validators.required),
      postcodeFrom: new FormControl(null, Validators.required),
      loadTime: new FormControl(null, Validators.required),
      unloadTime: new FormControl(null, Validators.required),
      goods_weight: new FormControl(null,),
      goods_europallets: new FormControl(null, Validators.required),
      truckType: new FormControl(null, Validators.required),
      special_request: new FormControl(null, Validators.required),
    });
    
    
    

    this.filteredOptions = this.enterNewRequestForm.controls["customerSearch"].valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.customers.slice())
      );

     
    this.filteredContactOptions = this.enterNewRequestForm.controls["customerContactSearch"].valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCustomerContact(name) : this.customerContacts.slice())
    )



    this.filteredCountryOptions = this.enterNewRequestForm.controls["countryFrom"].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountries(value))
      );
      
  }

  ngOnChanges(){

  }

  displayContactFn(customercontact: CustomerContactModel): string {
   console.log("contact")
    if(this.newCustomerContactCreated){
      console.log(this.newCustomerContactCreated)
     
      return this.newCustomerContactCreated;
    }
    
    return customercontact && customercontact.name ? customercontact.name : '';
  }

  displayFn(customer: CustomerModel): string {
    return customer && customer.name ? customer.name : '';
  }

  private _filter(name: string): CustomerModel[] {
    const filterValue = name.toLowerCase();
    
    return this.customers.filter(option =>
       option.name.toLowerCase().indexOf(filterValue) === 0 );
  }



  private _filterCustomerContact(name: string): CustomerContactModel[] {
  
    const filterValue = name.toLowerCase();
   
    return this.customerContacts.filter(option =>

      option.name.toLowerCase().indexOf(filterValue) === 0
     );
  }



  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
  //console.log(this.CountryOptions)
   //console.log(this.CountryOptions.filter(option => option.toLowerCase().includes(filterValue)))
    return this.CountryOptions.filter(option => option.toLowerCase().includes(filterValue));
  }




  onSubmit() {
    console.log(this.enterNewRequestForm.controls['customerSearch'].value)
    console.log(this.enterNewRequestForm.controls['customerContactSearch'].value)
    const validationTime = new Date();
    validationTime.setHours(validationTime.getHours() + 2);


    if (this.enterNewRequestForm.valid) {
   
    var solutionDate= new Date;
    solutionDate.setHours(solutionDate.getHours() +2);

    const postNewRequest = new RequestsModel(
      this.enterNewRequestForm.controls['customerSearch'].value,
      this.enterNewRequestForm.controls['locationFrom'].value,
      this.enterNewRequestForm.controls['countryFrom'].value,
      this.enterNewRequestForm.controls['postcodeFrom'].value,
      this.enterNewRequestForm.controls['locationTo'].value,
      this.enterNewRequestForm.controls['countryTo'].value,
      this.enterNewRequestForm.controls['postcodeTo'].value,
      this.formatDate(this.enterNewRequestForm.controls['loadTime'].value),
      this.formatDate(this.enterNewRequestForm.controls['unloadTime'].value),
      this.datepipe.transform(solutionDate, 'HH:mm:ss'),
      this.datepipe.transform(solutionDate, 'yyyy-MM-dd HH:mm:ss'),
      this.enterNewRequestForm.controls['goods_weight'].value,
      this.enterNewRequestForm.controls['goods_europallets'].value,
      this.truckTypes.findIndex(x => x.name === this.enterNewRequestForm.controls['truckType'].value).toString(),
      '1',
      this.enterNewRequestForm.controls['special_request'].value,
      'html',
      this.systemService.getUser().ID,
      '2'
    );
    
      this.requestService.postNewRequest(postNewRequest).subscribe(res => console.log(res));

      this.snackBar.open('Form Submitted', 'close', {
        duration: 1500
      })
      this.enterNewRequestForm.reset();

    } else {
      console.log('invalid form');
      this.snackBar.open('Invalid form', 'close', {
        duration: 1500
      })
    }
  }

  createNewClient(): void {
    
  

    var customername;
    

    if (this.enterNewRequestForm.controls["customerSearch"].value.name == null)
    {
      customername = this.enterNewRequestForm.controls["customerSearch"].value

      
    }
    else
    {
      customername = this.enterNewRequestForm.controls["customerSearch"].value.name
    }

   
     this.systemService.getCustomerByName(customername).subscribe(res=>{
      
      //console.log(res);

        if (res["recordset"].length >0) 
        {
        
          
          this.systemService.loadCustomerContacts(this.enterNewRequestForm.controls["customerSearch"].value.id).subscribe(res=>{
  
          this.customerContacts = res["recordset"]
          
          this.filteredContactOptions = this.enterNewRequestForm.controls["customerContactSearch"].valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterCustomerContact(name) : this.customerContacts.slice())
          )

          this.opencustomercontactfield = true;
          
          })
          
        }
        else
        {
          const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
            width: '500px',
            data: {
              custname: customername
            }
          });  
          
          dialogRef.afterClosed().subscribe(result => {

            
            this.opencustomercontactfield = true;
          });

        }
    
    })


  
  }

  createNewClientContact(): void {
    

          const dialogRef = this.dialog.open(AddCustomerContactDialogComponent, {
            width: '500px',
            data: {
              custid: this.enterNewRequestForm.controls["customerSearch"].value.id
            }
          });  
          
          dialogRef.afterClosed().subscribe(result => {
            console.log(result)
           // this.enterNewRequestForm.controls["customerContactSearch"].patchValue("result");
           this.systemService.loadCustomerContacts(this.enterNewRequestForm.controls["customerSearch"].value.id).subscribe(res=>{
  
            this.customerContacts = res["recordset"]
            
  
            this.filteredContactOptions = this.enterNewRequestForm.controls["customerContactSearch"].valueChanges.pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this._filterCustomerContact(name) : this.customerContacts.slice())
            )
  
            
            
            })
            console.log(this.customerContacts)
            // this.test= result;
            this.newCustomerContactCreated= result;
            this.enterNewRequestForm.patchValue({customerContactSearch : result})
            this.opencustomercontactfield = true;
            

          });

    }
    


  


  formatDate(date): string {
    return date.getFullYear()
      + '-' + this.leftpad(date.getMonth() + 1, 2)
      + '-' + this.leftpad(date.getDate(), 2)
      + ' ' + this.leftpad(date.getHours(), 2)
      + ':' + this.leftpad(date.getMinutes(), 2)
      + ':' + this.leftpad(date.getSeconds(), 2);
  }
  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }
}
