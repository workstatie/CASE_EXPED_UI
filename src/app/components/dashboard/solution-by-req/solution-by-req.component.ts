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
import { CarrierModel } from 'src/app/models/carrier.model';
import { CarrierDialogComponent } from './pop-ups/dialog';
import { MatDialog } from '@angular/material/dialog';
import { OktaAuthService } from '@okta/okta-angular';


@Component({
  selector: 'solution-by-req',
  templateUrl: './solution-by-req.component.html',
  styleUrls: ['./solution-by-req.component.scss']
})
export class SolutionByReqComponent implements OnChanges {

  @Input() request: RequestsModel;
  @ViewChild(CountdownComponent) counter: CountdownComponent;

  solutions: SolutionModel[] = [];
  displayedColumns: string[] = ['select', 'Email', 'Price', 'Delay', 'Transit Time', 'Details'];
  dataSource = new MatTableDataSource(this.solutions);
  selection = new SelectionModel<SolutionModel>(true, []);
  statusValues: StatusTypeModel[];
  solutionTime: any;
  counterConfig: any;
  carriers: CarrierModel[];


  constructor(
    private solutionService: SolutionService,
    private requestService: RequestService,
    private systemService: SystemValuesService,
    private dialog: MatDialog,
    public oktaAuth: OktaAuthService
  ) { }


  async ngOnChanges() {

    await this.systemService.initToken();

    this.systemService.loadCarrier().subscribe(res => {
      this.carriers = res['recordset']
    });

    this.systemService.loadStatusTypes().subscribe(res => {
      this.statusValues = res['recordset']
    });

    this.selection = new SelectionModel<SolutionModel>(false, []);
    this.solutionService.getSolutionForRequestId(this.request.id).subscribe(res => {
      this.solutions = res['recordset'];
      for (let solution of this.solutions) {
        let idx = this.carriers.findIndex(carrier => carrier.id = solution.carrier_id)
        solution.carrier_id = this.carriers[idx].name;
      }

      this.dataSource = new MatTableDataSource(this.solutions);
      this.request.load_datetime = new Date(this.request.load_datetime).toLocaleString();
      this.request.unload_datetime = new Date(this.request.unload_datetime).toLocaleString();

      this.solutionTime = new Date(this.request.datetime_created);

      //DE MODIFICAT


      this.solutionTime.setHours((this.solutionTime.getHours() - 3) + this.request.solution_deadline)


      console.log(this.solutionTime)
      var remainingTime = (this.solutionTime.getTime() - new Date().getTime());


      var diffMins = Math.round((remainingTime) / 1000);
      // diffMins /=60;

      console.log(diffMins)
      this.counterConfig = {
        leftTime: diffMins,
        size: 'large',
        demand: false
      };

      this.counter.begin();

    })


  }

  ngAfterViewInit(): void {
  }

  // getRemainingTime(futureDate) {

  //   return new Date("2020-02-20T12:01:04.753Z").getTime() - new Date().getTime();
  // }


  submitSolution() {

    // console.log(this.selection.selected[0].id)
    this.requestService.updateStatusReqById(this.request.id, 4).subscribe(res => {
      console.log('solution sent')
    })


  }

  viewCarrier(id) {
    console.log(id)
    const dialogRef = this.dialog.open(CarrierDialogComponent, {
      width: '500px',
      data: {
        inputData: this.carriers[id - 1]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }
}
