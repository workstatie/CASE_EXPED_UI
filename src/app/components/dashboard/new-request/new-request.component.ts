import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemValuesService } from 'src/app/services/systemValues.service';
import { TruckTypeModel } from 'src/app/models/truckType.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/requests.service';
import { RequestsModel } from 'src/app/models/requests.model';
import { DatePipe } from '@angular/common';
import { StatusTypeModel } from 'src/app/models/statusType.model';

@Component({
  selector: 'new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {

  enterNewRequestForm: FormGroup;
  truckTypes: TruckTypeModel[];
  assignToCurrentUser: Boolean = true;
  dateNow = new Date();

  
  constructor(
    private systemService: SystemValuesService,
    private snackBar: MatSnackBar,
    private requestService: RequestService,
    public datepipe: DatePipe
    ) { }

  //@Output() newTicketCreated: EventEmitter<any> = new EventEmitter<any>();

  // @Input() ticket: RequestsModel;
  @ViewChild('picker') picker: any;

  ngOnInit(): void {

    this.truckTypes = this.systemService.getTruckTypes();

    this.enterNewRequestForm = new FormGroup({
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
  }



  onSubmit() {
    const validationTime = new Date();
    validationTime.setHours(validationTime.getHours() + 2);


    if (this.enterNewRequestForm.valid) {
   
      var solutionDate= new Date;
    solutionDate.setHours(solutionDate.getHours() +2);

    const postNewRequest = new RequestsModel(
      '000000',
      '1',
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
      '0',
      '1'
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
