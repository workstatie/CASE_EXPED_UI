import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestsModel } from 'src/app/models/requests.model';

@Component({
  selector: 'view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {
  
  @Input() ticket: RequestsModel;
  validationForm: FormGroup;
  checkSafeFleet: Boolean= true;
  checkBursaTransport: Boolean= true;

  constructor() {   }

  ngOnInit(): void {
    this.validationForm = new FormGroup({
      body: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      sender: new FormControl(null, Validators.required),
      locationFrom: new FormControl(null, Validators.required),
      locationTo: new FormControl(null, Validators.required),
      postcodeTo: new FormControl(null, Validators.required),
      postcodeFrom: new FormControl(null, Validators.required),
      loadTime: new FormControl(null, Validators.required),
      unloadTime: new FormControl(null, Validators.required),
      solutionTime: new FormControl(null, Validators.required),
      validation_datetime: new FormControl(null, Validators.required),
      goods_weight: new FormControl(null, Validators.required),
      goods_europallets: new FormControl(null, Validators.required),
    });
  }

}
