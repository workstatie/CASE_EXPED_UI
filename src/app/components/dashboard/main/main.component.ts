import { Component, OnInit } from '@angular/core';
import { MailModel } from 'src/app/models/mail.model';
import { AuthService } from 'src/app/services/auth.service';
import { RequestsModel } from 'src/app/models/requests.model';
import { SystemValuesService } from 'src/app/services/systemValues.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  viewData = false;
  validateData = false;
  newRequest = false;
  dashboardView=true;

  selectedTicket: RequestsModel;
  isAuthenticated: boolean;
  notificationsNumber = '2';


  constructor(
    public authService: AuthService,
    public systemValuesService: SystemValuesService) {
      this.authService.isAuthenticated.subscribe(
        (isAuthenticated: boolean) => {
          this.isAuthenticated = isAuthenticated
        }
      );
  
  }

  ngOnInit() {

  }

  loadRequest(ticket: RequestsModel) {

    this.selectedTicket = ticket;
    this.validateData = false;
    this.dashboardView = false;
    this.newRequest=false;
    this.viewData = true;
  }

  createNewReq(ticket){
    this.dashboardView = false;
    this.validateData = false;
    this.viewData = false;
    this.newRequest=true;
  }

  logout() {
    console.log('log out..')
    this.authService.logout('..');
  }


}
