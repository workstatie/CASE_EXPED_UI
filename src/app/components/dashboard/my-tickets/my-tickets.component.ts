import { RequestsModel } from 'src/app/models/requests.model';
import { Component, OnInit, Output, EventEmitter, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';

import { SystemValuesService } from 'src/app/services/systemValues.service';
import { StatusTypeModel } from 'src/app/models/statusType.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RequestService } from 'src/app/services/requests.service';
import { MatSort } from '@angular/material/sort';
import { UserModel } from 'src/app/models/user.model';
import { environment } from '../../../../environments/environment'
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {

  tickets: RequestsModel[] = [];
  myTickets: RequestsModel[] = [];
  showMine: Boolean =false;

  showSpinner: Boolean = false;
  myTicketsLoaded: Boolean = false;
  statusValues: StatusTypeModel[];
  displayedColumns: string[] = ['Route', 'Status'];

  dataSource = new MatTableDataSource(this.tickets);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() onTicketPicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onNewRequest: EventEmitter<any> = new EventEmitter<any>();
  user: UserModel;
  interval: any;

  constructor(
    private requestService: RequestService,
    private systemService: SystemValuesService,
    public oktaAuth: OktaAuthService) { }

  async ngOnInit() {

    await this.systemService.initToken();
    this.systemService.getUserFromDB(this.systemService.getOktaUser().email).subscribe( res  =>{
      this.user = res["recordset"][0];
      this.systemService.setUser(this.user);
      this.getTicketsById(this.user.ID);

    });

    this.requestService.myRequests$.subscribe(data => {
      this.tickets = data;
    });

    this.interval = setInterval(() => {
      this.getTicketsById(this.user.ID);
    }, environment.refreshRate);

    this.systemService.loadStatusTypes().subscribe(res => {
      this.statusValues = res['recordset']
    });

  }

  ticketClicked(mail) {

    this.onTicketPicked.emit(mail.id);
  }

  newRequestClicked() {
    this.onNewRequest.emit('newReq');
  }

   getTicketsById(id) {
    this.myTicketsLoaded = true;
    this.requestService.getMyRequests(id);
    if(this.showMine){
      this.myTickets = this.tickets.filter( t => t.id === this.user.ID)
      this.dataSource = new MatTableDataSource(this.myTickets);
    }else{
      this.dataSource = new MatTableDataSource(this.tickets);
    }
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  showAllTickets(){
    this.showMine = false;

  }

  showMyTickets(){
    this.showMine = true;
   

  }


}
