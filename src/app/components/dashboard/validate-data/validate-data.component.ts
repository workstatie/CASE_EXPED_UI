import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsModel } from 'src/app/models/requests.model';
import { TruckTypeModel } from 'src/app/models/truckType.model';

import { SystemValuesService } from 'src/app/services/systemValues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/requests.service';
import { DatePipe } from '@angular/common';
import { SolutionService } from 'src/app/services/solution.service';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'validate-data',
  templateUrl: './validate-data.component.html',
  styleUrls: ['./validate-data.component.scss']
})
export class ValidateDataComponent implements OnChanges {

  @Input() ticket: RequestsModel;

  constructor(private systemService: SystemValuesService,
    private snackBar: MatSnackBar,
    private requestService: RequestService,
    private solutionService: SolutionService,
    public datepipe: DatePipe,
    public oktaAuth: OktaAuthService
  ) { }



  @ViewChild('picker') picker: any;

  validationForm: FormGroup;
  checkSafeFleet: Boolean = true;
  checkBursaTransport: Boolean = true;

  truckTypes: TruckTypeModel[];
  assignToCurrentUser: Boolean = true;
  truckTypeSelected: String = "prelata";

  async ngOnChanges(): Promise<void> {
    await this.systemService.initToken();
    this.systemService.loadTruckTypes().subscribe(res => {
      this.truckTypes = res['recordset'];

      this.truckTypeSelected = this.truckTypes[this.ticket.truck_type_id].name;
      console.log(this.truckTypeSelected)
      this.validationForm.patchValue({
        locationFrom: this.ticket.from_address_city,
        locationTo: this.ticket.to_address_city,
        countryTo: this.ticket.to_address_country,
        countryFrom: this.ticket.to_address_country,
        postcodeTo: this.ticket.to_address_postcode,
        postcodeFrom: this.ticket.from_address_postcode,
        loadTime: this.ticket.load_datetime,
        unloadTime: this.ticket.unload_datetime,
        goods_weight: this.ticket.goods_weight,
        truckType: this.truckTypeSelected,
        special_request: this.ticket.special_requirments,
        emailHtml: this.ticket.email_html,
      })
    });

    

    this.validationForm = new FormGroup({
      locationFrom: new FormControl(null, Validators.required),
      locationTo: new FormControl(null, Validators.required),
      postcodeTo: new FormControl(null, Validators.required),
      postcodeFrom: new FormControl(null, Validators.required),
      countryFrom: new FormControl(null, Validators.required),
      countryTo: new FormControl(null, Validators.required),

      loadTime: new FormControl(null, Validators.required),
      unloadTime: new FormControl(null, Validators.required),
      goods_weight: new FormControl(null, Validators.required),
      truckType: new FormControl(null, Validators.required),
      special_request: new FormControl(null),
      emailHtml: new FormControl(null),
    });


    
  }

  onSubmit() {
    const validationTime = new Date();
    validationTime.setHours(validationTime.getHours() + 2);
    if (this.validationForm.valid) {
      var solutionDate = new Date;
      solutionDate.setHours(solutionDate.getHours() + 2);

      var postNewRequest: RequestsModel;

      postNewRequest.customer_id = this.ticket.customer_id;
      postNewRequest.from_address_city = this.validationForm.controls['cityFrom'].value;
      postNewRequest.from_address_country = this.validationForm.controls['countryFrom'].value;
      postNewRequest.from_address_postcode = this.validationForm.controls['postcodeFrom'].value;
      postNewRequest.to_address_city = this.validationForm.controls['cityTo'].value;
      postNewRequest.to_address_country = this.validationForm.controls['countryTo'].value;
      postNewRequest.to_address_postcode = this.validationForm.controls['postcodeTo'].value
      postNewRequest.load_datetime = this.datepipe.transform(this.validationForm.controls['loadTime'].value, 'yyyy-MM-dd HH:mm:ss');
      postNewRequest.unload_datetime = this.datepipe.transform(this.validationForm.controls['unloadTime'].value, 'yyyy-MM-dd HH:mm:ss')
      postNewRequest.solution_deadline = this.datepipe.transform(solutionDate, 'HH:mm:ss')
      postNewRequest.validation_datetime = this.datepipe.transform(solutionDate, 'HH:mm:ss');
      postNewRequest.goods_weight = this.validationForm.controls['goods_weight'].value
      postNewRequest.truck_type_id = this.truckTypes.findIndex(x => x.name === this.validationForm.controls['truckType'].value).toString(),
        postNewRequest.request_status_type_id = '2'
      postNewRequest.special_requirments = this.validationForm.controls['special_request'].value;
      postNewRequest.customer_id = this.systemService.getUser().ID
      //postNewRequest

      this.requestService.putRequestById(postNewRequest, this.ticket.id).subscribe(res => console.log(res));

      this.snackBar.open('Update made', 'close', {
        duration: 1500
      });

      this.solutionService.robotSendRequests("False").subscribe(res => {
        console.log(res);
      })

    } else {
      console.log('invalid form');
      this.snackBar.open('Invalid form', 'close', {
        duration: 1500
      })
    }
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
