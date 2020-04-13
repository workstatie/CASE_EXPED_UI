import { Injectable } from "@angular/core";
import { UiPathRobot } from '@uipath/robot';
import { MailModel } from '../models/mail.model';
import { ExtractedDataModel } from '../models/extractedData.model';
import { RequestsModel } from '../models/requests.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GetTicketsService {

    myRequests: RequestsModel[] = [];

    constructor(private http: HttpClient) { 
       this.myRequests= require("./mockTickets.json");
       console.log(this.myRequests)
    }


    getMyRequests() {
      
    }



    attended_getEmails() {
        let mails: MailModel[] = [];
        let extractedData: ExtractedDataModel[] = [];;
        let args = {
            'folderName': 'Demo',
        };
        let robot = UiPathRobot.init();
        robot.getProcesses().then(processes => {
            let proc = processes.find(p => p.name.includes('GetOutlookEmails'));
            proc.start(args).then(res => {
               mails = mails.concat(res['dtMails']);
                extractedData = extractedData.concat(res['dtExtractedData']);
            });
        });
    }


}