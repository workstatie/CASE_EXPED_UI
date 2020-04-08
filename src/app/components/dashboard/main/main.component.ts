import { Component, OnInit } from '@angular/core';
import { MailModel } from 'src/app/models/mail.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  validateData=false;
  selectedMail: MailModel;
  constructor() { }
 
  ngOnInit() {

  
  }

  validateMail(mail: MailModel){
    this.validateData=true;
       this.selectedMail=mail;
  }

}
