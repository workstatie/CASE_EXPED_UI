import { Component, OnInit } from '@angular/core';
import { RequestsModel } from 'src/app/models/requests.model';
import { GetTicketsService } from 'src/app/services/getTickets.service';

@Component({
  selector: 'my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {

  myTickets: RequestsModel[] = [];

  constructor(private ticketService: GetTicketsService) { }

  
  ngOnInit(){

  }

}
