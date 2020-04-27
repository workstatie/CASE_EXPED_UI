import { RequestsModel } from 'src/app/models/requests.model';
import { Component, OnInit, Output, EventEmitter, ViewChildren, ViewChild } from '@angular/core';

import { SystemValuesService } from 'src/app/services/systemValues.service';
import { StatusTypeModel } from 'src/app/models/statusType.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RequestService } from 'src/app/services/requests.service';

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
  displayedColumns: string[] = ['ID', 'Status'];

  dataSource = new MatTableDataSource(this.myTickets);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  @Output() onTicketPicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onNewRequest: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private ticketService: RequestService,
    private systemService: SystemValuesService) { }

  ngOnInit() {
    this.getTickets();
    this.statusValues = this.systemService.getStatusTypes();

  }

  ticketClicked(mail) {
    this.onTicketPicked.emit(mail);
  }

  newRequestClicked() {
    this.onNewRequest.emit('newReq');
  }

  getTickets() {
    // this.showSpinner=true;

    this.myTicketsLoaded = true;
    this.ticketService.getMyRequests('1').subscribe(res => {
      this.myTickets = res['recordset'];
      this.dataSource = new MatTableDataSource(this.myTickets);
      this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
    });

  }


}
