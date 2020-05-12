import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsModel } from 'src/app/models/requests.model';
import { TruckTypeModel } from 'src/app/models/truckType.model';

import { SystemValuesService } from 'src/app/services/systemValues.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/requests.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'validate-data',
  templateUrl: './validate-data.component.html',
  styleUrls: ['./validate-data.component.scss']
})
export class ValidateDataComponent implements OnChanges {

  @Input() ticket:RequestsModel;

  constructor(private systemService: SystemValuesService,
    private snackBar: MatSnackBar,
    private requestService: RequestService,
    public datepipe: DatePipe
  ){}

  

  @ViewChild('picker') picker: any;

  validationForm: FormGroup;
  checkSafeFleet: Boolean= true;
  checkBursaTransport: Boolean= true;

  truckTypes: TruckTypeModel[];
  assignToCurrentUser: Boolean = true;
 // dateNow = new Date();
  truckTypeSelected : String;

  ngOnChanges(): void {
    this.truckTypes = this.systemService.getTruckTypes();
    this.truckTypeSelected = this.truckTypes[this.ticket.truck_type_id].name;
    this.truckTypeSelected = 'Truck Type 1';

    this.validationForm = new FormGroup({
      locationFrom: new FormControl(null, Validators.required),
      locationTo: new FormControl(null, Validators.required),
      postcodeTo: new FormControl(null, Validators.required),
      postcodeFrom: new FormControl(null, Validators.required),
      loadTime: new FormControl(null, Validators.required),
      unloadTime: new FormControl(null, Validators.required),
      goods_weight: new FormControl(null, Validators.required),
      goods_europallets: new FormControl(null, Validators.required),
      truckType: new FormControl(null, Validators.required),
      special_request: new FormControl(null, Validators.required),
      emailHtml :new FormControl(null, Validators.required),
    });

    this.validationForm.patchValue({
      locationFrom : this.ticket.from_address_city,
      locationTo: this.ticket.to_address_city,
      postcodeTo: this.ticket.to_address_postcode,
      postcodeFrom: this.ticket.from_address_postcode,
      loadTime: this.ticket.load_datetime,
      unloadTime: this.ticket.unload_datetime,
      goods_weight: this.ticket.goods_weight,
      goods_europallets: this.ticket.goods_europallets,

      special_request: this.ticket.special_requirments,
      emailHtml :this.ticket.email_html,
    })
  }

  onSubmit() {
     const validationTime = new Date();
    validationTime.setHours(validationTime.getHours() + 2);
    if (this.validationForm.valid) {
      var solutionDate = new Date;
      solutionDate.setHours(solutionDate.getHours() + 2);

      const postNewRequest = new RequestsModel(
        '000000',
        '1',
        this.validationForm.controls['locationFrom'].value,
        this.validationForm.controls['postcodeFrom'].value,
        this.validationForm.controls['locationTo'].value,
        this.validationForm.controls['postcodeTo'].value,
        this.datepipe.transform(this.validationForm.controls['loadTime'].value, 'yyyy-MM-dd HH:mm:ss'),
        this.datepipe.transform(this.validationForm.controls['unloadTime'].value, 'yyyy-MM-dd HH:mm:ss'),
       
        this.datepipe.transform(solutionDate, 'HH:mm:ss'),
        this.datepipe.transform(solutionDate, 'yyyy-MM-dd HH:mm:ss'),
        this.validationForm.controls['goods_weight'].value,
        this.validationForm.controls['goods_europallets'].value,
        this.truckTypes.findIndex(x => x.name === this.validationForm.controls['truckType'].value).toString(),
        '1',
        this.validationForm.controls['special_request'].value,
        'html',
        this.systemService.getUser().ID,
        '0',
        '1'
      );

      this.requestService.putRequestById(postNewRequest, this.ticket.id).subscribe(res => console.log(res));

      this.snackBar.open('Update made', 'close', {
        duration: 1500
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
