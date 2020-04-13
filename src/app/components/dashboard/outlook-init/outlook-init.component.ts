import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiPathRobot } from '@uipath/robot';

import { MailModel } from 'src/app/models/mail.model';
import { Router } from '@angular/router';
import { ExtractedDataModel } from 'src/app/models/extractedData.model';

@Component({
  selector: 'outlook-init',
  templateUrl: './outlook-init.component.html',
  styleUrls: ['./outlook-init.component.scss']
})
export class OutlookInitComponent implements OnInit {
  showSpinner: Boolean = false;
  mails: MailModel[] = [];
  extractedData: ExtractedDataModel[] = [];;
  mailsLoaded: Boolean= false;
  constructor(private router: Router) { }

  @Output() onMailPicked: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {

  }

  mailClicked(mail){
    this.onMailPicked.emit(mail);
  }

  getEmails() {
    this.showSpinner=true;
    
    let args = {
      'folderName': 'Demo',
     };

    let robot = UiPathRobot.init();
    robot.getProcesses().then(processes => {
      let proc = processes.find(p => p.name.includes('GetOutlookEmails'));
      proc.start(args).then(res =>
        {
          this.showSpinner=false;
          console.log(res)
          this.mails=this.mails.concat(res['dtMails']);
          this.extractedData =this.extractedData.concat(res['dtExtractedData']);
          this.mailsLoaded=true;
        });
        
       
    });
  }
}
