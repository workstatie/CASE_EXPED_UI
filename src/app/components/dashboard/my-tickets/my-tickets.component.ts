import { RequestsModel } from 'src/app/models/requests.model';
import { Component, OnInit, Output, EventEmitter, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';

import { SystemValuesService } from 'src/app/services/systemValues.service';
import { StatusTypeModel } from 'src/app/models/statusType.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RequestService } from 'src/app/services/requests.service';
import { MatSort } from '@angular/material/sort';
import { UserModel } from 'src/app/models/user.model';
import {environment} from '../../../../environments/environment'

@Component({
  selector: 'my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {

  myTickets: RequestsModel[] = [];
  showSpinner: Boolean = false;
  myTicketsLoaded: Boolean = false;
  statusValues: StatusTypeModel[];
  displayedColumns: string[] = ['Route', 'Status'];

  
  dataSource = new MatTableDataSource(this.myTickets);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() onTicketPicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onNewRequest: EventEmitter<any> = new EventEmitter<any>();
  user: UserModel;
  interval: any;

  constructor(
    private requestService: RequestService,
    private systemService: SystemValuesService) { }

  async ngOnInit() {
 
    
    this.user=  this.systemService.getUser();
  
    this.getTicketsById(this.user.ID);
    this.requestService.myRequests$.subscribe( data => {
       this.myTickets = data;
    })
    this.interval = setInterval( () =>{
      this.getTicketsById(this.user.ID);
    }, environment.refreshRate);

  }

  ngAfterViewInit(): void {
    this.statusValues = this.systemService.getStatusTypes();
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
    this.dataSource = new MatTableDataSource(this.myTickets);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }


}
