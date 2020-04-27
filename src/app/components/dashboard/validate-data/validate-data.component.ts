import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsModel } from 'src/app/models/requests.model';

@Component({
  selector: 'validate-data',
  templateUrl: './validate-data.component.html',
  styleUrls: ['./validate-data.component.scss']
})
export class ValidateDataComponent implements OnInit {

  @Input() ticket:RequestsModel;

  constructor() { }
  validationForm: FormGroup;
  checkSafeFleet: Boolean= true;
  checkBursaTransport: Boolean= true;

  ngOnInit(){
    console.log(this.ticket)
    this.validationForm = new FormGroup({
      body: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      sender: new FormControl(null, Validators.required),
      locationFrom: new FormControl(null, Validators.required),
      locationTo: new FormControl(null, Validators.required)
    });
  }

}
