import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { RequestsModel } from 'src/app/models/requests.model';
import { SolutionService } from 'src/app/services/solution.service';
import { SolutionModel } from 'src/app/models/solution.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { CountdownModule, CountdownComponent } from 'ngx-countdown';
import { SelectionModel } from '@angular/cdk/collections';
import { RequestService } from 'src/app/services/requests.service';
import { StatusTypeModel } from 'src/app/models/statusType.model';
import { SystemValuesService } from 'src/app/services/systemValues.service';


@Component({
  selector: 'solution-by-req',
  templateUrl: './solution-by-req.component.html',
  styleUrls: ['./solution-by-req.component.scss']
})
export class SolutionByReqComponent implements OnChanges {

  @Input() request: RequestsModel;
  @ViewChild(CountdownComponent) counter: CountdownComponent;

  solutions: SolutionModel[] = [];
  displayedColumns: string[] = ['select', 'Price','Delay', 'Transit Time', 'Details'];
  dataSource = new MatTableDataSource(this.solutions);
  selection = new SelectionModel<SolutionModel>(true, []);
  statusValues : StatusTypeModel[];

  counterConfig = {
    leftTime: 9000,
    size: 'large',
    demand: true
  };

  constructor(
    private solutionService: SolutionService,
    private requestService: RequestService,
    private systemService: SystemValuesService,

    ) { }


  ngOnChanges(): void {
    // console.log(new Date(this.request.datetime_created).setHours(new Date(this.request.datetime_created).getHours() +2))

    
    
    //  const creationDate = new Date(this.request.datetime_created).getHours()*60 + new Date(this.request.datetime_created).getMinutes()
    //  console.log(creationDate)


    this.statusValues = this.systemService.getStatusTypes();
    this.selection = new SelectionModel<SolutionModel>(false, []);
    this.solutionService.getSolutionForRequestId(this.request.id).subscribe(res => {
      this.solutions = res['recordsets'][0];
      this.dataSource = new MatTableDataSource(this.solutions);

      this.counter.begin();
      this.request.load_datetime = new Date(this.request.load_datetime).toLocaleString();
      this.request.unload_datetime = new Date(this.request.unload_datetime).toLocaleString();
    })

  }

  ngAfterViewInit(): void {
  }

  getRemainingTime(futureDate) {
    
    return new Date("2020-02-20T12:01:04.753Z").getTime() - new Date().getTime();
  }

  
  submitSolution(){

   // console.log(this.selection.selected[0].id)
    this.requestService.updateStatusReqById(this.request.id,4).subscribe(res =>{
      console.log('solution sent')
    })

   
  }





}
