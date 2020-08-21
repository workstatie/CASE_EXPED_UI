import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SystemValuesService } from 'src/app/services/systemValues.service';
import { TruckTypeModel } from 'src/app/models/truckType.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/requests.service';
import { RequestsModel } from 'src/app/models/requests.model';
import { DatePipe } from '@angular/common';
import { StatusTypeModel } from 'src/app/models/statusType.model';
import { CustomerModel } from 'src/app/models/customer.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddCustomerDialogComponent } from './pop-ups/dialogAddCustomer';
import { AddCustomerContactDialogComponent } from './pop-ups/dialogAddCustomerContact';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerContactModel } from 'src/app/models/customercontact.model';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { CountryModel } from 'src/app/models/country.model';
import { OktaAuthService } from '@okta/okta-angular';
import { RequireMatch as RequireMatch } from '../../../helpers/requireMatch';


@Component({
  selector: 'new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit, OnChanges {

  //CountryOptions: string[] = ['One', 'Two', 'Three'];

  option3: string = ' ';
  enterNewRequestForm: FormGroup;
  truckTypes: TruckTypeModel[];
  assignToCurrentUser: Boolean = true;
  loadTime: any;
  unloadTime: any;
  customers: CustomerModel[] = [];
  countries: CountryModel[] = [];
  customerContacts: CustomerContactModel[];
  filteredCountryOptions: Observable<CountryModel[]>;
  filteredCountryOptions2: Observable<CountryModel[]>;
  filteredOptions: Observable<CustomerModel[]>;
  filteredContactOptions: Observable<CustomerContactModel[]>;
  newCustomerContactCreated: string;
  opencustomercontactfield: Boolean = false;
  tokenLoaded= false;
  constructor(
    private systemService: SystemValuesService,
    private snackBar: MatSnackBar,
    private requestService: RequestService,
    public datepipe: DatePipe,
    public dialog: MatDialog,
    public oktaAuth: OktaAuthService
  ) { }

  //@Output() newTicketCreated: EventEmitter<any> = new EventEmitter<any>();

  // @Input() ticket: RequestsModel;
  @ViewChild('picker') picker: any;

  async ngOnInit(){

    await this.systemService.initToken();    


    this.tokenLoaded= true;
    this.loadTime = new Date( new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),8,0,0);
    this.unloadTime = new Date( new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),16,0,0);


    this.systemService.loadCustomers().subscribe(res => {

      this.customers = res['recordset']
    });

    this.systemService.loadCountries().subscribe(res => {
      this.countries = res['recordset']

    });

    this.systemService.loadTruckTypes().subscribe(res => {
      this.truckTypes = res['recordset']
    });


    this.enterNewRequestForm = new FormGroup({
      customerSearch: new FormControl(null, Validators.required),
      customerContactSearch: new FormControl(null, Validators.required),
      solutiontime: new FormControl(null),
      cityFrom: new FormControl(null, Validators.required),
      cityTo: new FormControl(null, Validators.required),
      countryTo: new FormControl('', [Validators.required, RequireMatch]),
      countryFrom:new FormControl('', [Validators.required, RequireMatch]),
      postcodeTo: new FormControl(null, Validators.required),
      postcodeFrom: new FormControl(null, Validators.required),
      loadTime: new FormControl(null, Validators.required),
      loadTimeEnd: new FormControl(null, Validators.required),
      unloadTime: new FormControl(null, Validators.required),
      unloadTimeEnd: new FormControl(null, Validators.required),
      goods_weight: new FormControl(null, Validators.required),
      nrtrucks: new FormControl(null),
      truckType: new FormControl(null, Validators.required),
      special_request: new FormControl(null),
      adr: new FormControl(null),
      twodrivers: new FormControl(null),
      jumbo: new FormControl(null),
      frigo: new FormControl(null),
      intermodal: new FormControl(null),
    });

    this.enterNewRequestForm.controls['loadTime'].patchValue(this.loadTime)
    this.enterNewRequestForm.controls['unloadTime'].patchValue(this.loadTime)
    this.enterNewRequestForm.controls['loadTimeEnd'].patchValue(this.unloadTime)
    this.enterNewRequestForm.controls['unloadTimeEnd'].patchValue(this.unloadTime)




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
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCountries(name) : this.countries.slice())
    );

    this.filteredCountryOptions2 = this.enterNewRequestForm.controls["countryTo"].valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCountries(name) : this.countries.slice())
    );

  }

  ngOnChanges() {

  }

  displayContactFn(customercontact: CustomerContactModel): string {

    if (this.newCustomerContactCreated) {

      return this.newCustomerContactCreated;
    }

    return customercontact && customercontact.name ? customercontact.name : '';
  }

  displayFn(customer: CustomerModel): string {
    return customer && customer.name ? customer.name : '';
  }

  displayCountryFn(country: CountryModel): string {

    return country && country.name ? country.name : '';
  }


  private _filter(name: string): CustomerModel[] {
    const filterValue = name.toLowerCase();

    return this.customers.filter(option =>
      option.name.toLowerCase().indexOf(filterValue) === 0);
  }




  private _filterCustomerContact(name: string): CustomerContactModel[] {

    const filterValue = name.toLowerCase();

    return this.customerContacts.filter(option =>

      option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }



  private _filterCountries(name: string): CountryModel[] {

    const filterValue = name.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }




  onSubmit() {
   
    const validationTime = new Date();
    validationTime.setHours(validationTime.getHours() + 2);


    if (this.enterNewRequestForm.valid) {

      var solutionDate = new Date;
      solutionDate.setHours(solutionDate.getHours() + 2);

      var adr;
      var twodrivers;
      var jumbo;
      var frigo;
      var intermodal;

      if (this.enterNewRequestForm.controls['adr'].value) {
        adr = 1;
      }
      else {
        adr = 0;
      }

      if (this.enterNewRequestForm.controls['twodrivers'].value) {
        twodrivers = 1;
      }
      else {
        twodrivers = 0;
      }
      if (this.enterNewRequestForm.controls['jumbo'].value) {
        jumbo = 1;
      }
      else {
        jumbo = 0;
      }
      if (this.enterNewRequestForm.controls['frigo'].value) {
        frigo = 1;
      }
      else {
        frigo = 0;
      }
      if (this.enterNewRequestForm.controls['intermodal'].value) {
        intermodal = 1;
      }
      else {
        intermodal = 0;
      }

      const goods_weight_T=  parseInt(this.enterNewRequestForm.controls['goods_weight'].value)*1000;
      const truckID = this.truckTypes.findIndex(x => x.name === this.enterNewRequestForm.controls['truckType'].value[0])+1

      const postNewRequest = new RequestsModel(
        this.enterNewRequestForm.controls['customerSearch'].value.id,
        this.enterNewRequestForm.controls['customerContactSearch'].value.id,
        this.enterNewRequestForm.controls['cityFrom'].value,
        this.enterNewRequestForm.controls['countryFrom'].value.name,
        this.enterNewRequestForm.controls['postcodeFrom'].value,
        this.enterNewRequestForm.controls['cityTo'].value,
        this.enterNewRequestForm.controls['countryTo'].value.name,
        this.enterNewRequestForm.controls['postcodeTo'].value,
        this.formatDate(this.enterNewRequestForm.controls['loadTime'].value),
        this.formatDate(this.enterNewRequestForm.controls['loadTimeEnd'].value),
        this.formatDate(this.enterNewRequestForm.controls['unloadTime'].value),
        this.formatDate(this.enterNewRequestForm.controls['unloadTimeEnd'].value),
        "",
        this.enterNewRequestForm.controls['solutiontime'].value,
        "",
        goods_weight_T.toString(),
        truckID.toString(),
        this.enterNewRequestForm.controls['special_request'].value,
        "",
        this.systemService.getUser().ID,
        '2',
        '1',
        adr,
        twodrivers,
        jumbo,
        frigo,
        intermodal
      );


      this.requestService.postNewRequest(postNewRequest, ).subscribe(res => console.log(res));

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

  public findInvalidControlsRecursive(formToInvestigate: FormGroup | FormArray): string[] {
    var invalidControls: string[] = [];
    let recursiveFunc = (form: FormGroup | FormArray) => {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control.invalid) invalidControls.push(field);
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    }
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }


  createNewClient(): void {

    var customername;


    if (this.enterNewRequestForm.controls["customerSearch"].value.name == null) {
      customername = this.enterNewRequestForm.controls["customerSearch"].value


    }
    else {
      customername = this.enterNewRequestForm.controls["customerSearch"].value.name
    }
    
    this.systemService.getCustomerByName(customername).subscribe(res => {

      if (res["recordset"].length > 0) {

        this.systemService.loadCustomerContacts(this.enterNewRequestForm.controls["customerSearch"].value.id, ).subscribe(res => {

          this.customerContacts = res["recordset"]

          this.filteredContactOptions = this.enterNewRequestForm.controls["customerContactSearch"].valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterCustomerContact(name) : this.customerContacts.slice())
          )

          this.enterNewRequestForm.controls["solutiontime"].patchValue(this.enterNewRequestForm.controls["customerSearch"].value.agreed_solution_time);

          this.opencustomercontactfield = true;


        })

      }
      else {
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
      // this.enterNewRequestForm.controls["customerContactSearch"].patchValue("result");
      this.systemService.loadCustomerContacts(this.enterNewRequestForm.controls["customerSearch"].value.id ).subscribe(res => {

        this.customerContacts = res["recordset"]


        this.filteredContactOptions = this.enterNewRequestForm.controls["customerContactSearch"].valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filterCustomerContact(name) : this.customerContacts.slice())
        )



      })
      // this.test= result;
      this.newCustomerContactCreated = result;
      this.enterNewRequestForm.patchValue({ customerContactSearch: result })
      this.opencustomercontactfield = true;


    });

  }

  startDateModified(date){

    this.enterNewRequestForm.controls['unloadTime'].patchValue(date.value);
  }



  formatLabel(value: number) {
    if (value >= 60) {
      if (value % 60 > 0) { return Math.round(value / 60) + 'h' + value % 60; }
      else { return Math.round(value / 60) + 'h' }

    }

    return value + 'm';
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
