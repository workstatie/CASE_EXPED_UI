import { RequestsModel } from 'src/app/models/requests.model';
import { Component, OnInit, Output, EventEmitter, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';

import { SystemValuesService } from 'src/app/services/systemValues.service';
import { StatusTypeModel } from 'src/app/models/statusType.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RequestService } from 'src/app/services/requests.service';
import { MatSort } from '@angular/material/sort';

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

  displayedColumns: string[] = ['ID', 'Status'];
  dataSource = new MatTableDataSource(this.myTickets);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() onTicketPicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private ticketService: RequestService,
    private systemService: SystemValuesService) { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.getTickets();
    this.statusValues = this.systemService.getStatusTypes();
  }

  ticketClicked(mail) {
    this.onTicketPicked.emit(mail);
  }


  getTickets() {
    // this.showSpinner=true;

    this.myTicketsLoaded = true;
    this.ticketService.getMyRequests('NULL').subscribe(res => {
      this.myTickets = res['recordset'];
      this.dataSource = new MatTableDataSource(this.myTickets);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }


}
