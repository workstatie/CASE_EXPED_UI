import { RequestsModel } from 'src/app/models/requests.model';
import { Component, OnInit, Output, EventEmitter, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';

import { SystemValuesService } from 'src/app/services/systemValues.service';
import { StatusTypeModel } from 'src/app/models/statusType.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RequestService } from 'src/app/services/requests.service';
import { MatSort } from '@angular/material/sort';
import {environment} from '../../../../environments/environment'
import { CustomerModel } from 'src/app/models/customer.model';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'unassigned-req',
  templateUrl: './unassigned-req.component.html',
  styleUrls: ['./unassigned-req.component.scss']
})
export class UnassignedReqComponent implements OnInit {
  myTickets: RequestsModel[] = [];
  showSpinner: Boolean = false;
  myTicketsLoaded: Boolean = false;
  statusValues: StatusTypeModel[];

  token;

  displayedColumns: string[] = ['Client',  'CreationDate'];
  dataSource = new MatTableDataSource(this.myTickets);
  interval : any;
  customers : CustomerModel[];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() onTicketPicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private requestService: RequestService,
    private systemService: SystemValuesService,
    public oktaAuth: OktaAuthService) { }

  async ngOnInit() {
    console.log("Unassigned loading")

    this.token = await this.oktaAuth.getAccessToken();
    this.requestService.getUnassignedRequests(this.token);

  }

  async ngAfterViewInit() {
    this.token = await this.oktaAuth.getAccessToken();

    this.getUnassignedTickets();
    
   
    this.requestService.unassignedRequests$.subscribe( data => {
       this.myTickets = data;
    });
  


    this.interval = setInterval( () =>{
      this.getUnassignedTickets();
    }, environment.refreshRate);

    this.systemService.loadStatusTypes(this.token).subscribe(res => {
      this.statusValues=res['recordset']
  });
    
  }

  ticketClicked(mail) {
    this.onTicketPicked.emit(mail);
  }


  
  getUnassignedTickets() {
    this.myTicketsLoaded = true;
    this.dataSource = new MatTableDataSource(this.myTickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  // getTickets() {
  //   // this.showSpinner=true;

    

  //   this.myTicketsLoaded = true;
  //   this.requestService.getMyRequests('NULL').subscribe(res => {
  //     this.myTickets = res['recordset'];
  //     this.dataSource = new MatTableDataSource(this.myTickets);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });

  // }


}
