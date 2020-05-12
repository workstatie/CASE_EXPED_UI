import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { RequestsModel } from 'src/app/models/requests.model';
import { SolutionService } from 'src/app/services/solution.service';
import { SolutionModel } from 'src/app/models/solution.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { CountdownModule, CountdownComponent } from 'ngx-countdown';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'solution-by-req',
  templateUrl: './solution-by-req.component.html',
  styleUrls: ['./solution-by-req.component.scss']
})
export class SolutionByReqComponent implements OnChanges {

  @Input() ticket: RequestsModel;
  @ViewChild(CountdownComponent) counter: CountdownComponent;

  solutions: SolutionModel[] = [];
  displayedColumns: string[] = ['select', 'ID', 'Price', 'Transit Time', 'Details'];
  dataSource = new MatTableDataSource(this.solutions);
  selection = new SelectionModel<SolutionModel>(true, []);



  counterConfig = {
    leftTime: 9000,
    size: 'large',
    demand: true
  };

  constructor(
    private solutionService: SolutionService) { }


  ngOnChanges(): void {
    
    this.selection = new SelectionModel<SolutionModel>(false, []);
    this.solutionService.getSolutionForRequestId(this.ticket.id).subscribe(res => {
      this.solutions = res['recordsets'][0];
      this.dataSource = new MatTableDataSource(this.solutions);

      this.counter.begin();
      this.ticket.load_datetime = new Date(this.ticket.load_datetime).toLocaleString();
      this.ticket.unload_datetime = new Date(this.ticket.unload_datetime).toLocaleString();
    })

  }

  getRemainingTime(futureDate) {
    return new Date("2020-02-20T12:01:04.753Z").getTime() - new Date().getTime();
  }

  
  submitSolution(){
    console.log(this.selection.selected[0].id)

  }





}