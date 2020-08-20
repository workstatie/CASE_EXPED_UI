import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { RequestsModel } from 'src/app/models/requests.model';
import { SystemValuesService } from 'src/app/services/systemValues.service';
import { SolutionService } from 'src/app/services/solution.service';
import { SolutionModel } from 'src/app/models/solution.model';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SolutionBottomSheet } from './popUps/bottomSharedSolution';
import { RequestService } from 'src/app/services/requests.service';
import { UserModel } from 'src/app/models/user.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './popUps/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  viewData = false;
  validateData = false;
  newRequest = true;
  solutionByReq = false;
  dashboardView = false;

  pendingSolutions: SolutionModel[];
  selectedTicket: RequestsModel;
  isAuthenticated: boolean;
  notificationsNumber = '0';
  user: UserModel;


  constructor(
    public solutionService: SolutionService,
    public systemService: SystemValuesService,
    private requestService: RequestService,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {

    await this.systemService.initToken();
    
    this.systemService.getUserFromDB(this.systemService.getOktaUser().email).subscribe( res  =>{
      this.user = res["recordset"][0];
    });

    this.solutionService.getSolutions().subscribe(res => {
      this.pendingSolutions = res['recordsets'][0];
      this.notificationsNumber = this.pendingSolutions.length.toString();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  logout() {
    this.systemService.logout();
  }

  openBottomSheet() {
    this._bottomSheet.open(SolutionBottomSheet, {
      data: this.pendingSolutions,
      panelClass: 'bottomSolution'
    }).afterDismissed().subscribe(res => {
      this.loadSolutionByReq(res)
    });
  }

  loadRequest(ticket: RequestsModel) {
    this.selectedTicket = ticket;
    this.validateData = false;
    this.dashboardView = false;
    this.solutionByReq = false;
    this.newRequest = false;
    this.viewData = true;
  }

  viewUnassignedRequest(ticket: RequestsModel) {
    this.selectedTicket = ticket;
    this.validateData = true;
    this.dashboardView = false;
    this.solutionByReq = false;
    this.newRequest = false;
    this.viewData = false;
  }

  // viewRequest(ticket: RequestsModel) {
  //   this.selectedTicket = ticket;
  //   this.validateData = false;
  //   this.dashboardView = false;
  //   this.solutionByReq = false;
  //   this.newRequest = false;
  //   this.viewData = true;
  // }

  loadSolutionByReq(reqId) {
    this.requestService.getRequestByID(reqId).subscribe(res => {
      this.selectedTicket = res['recordset'][0];
      this.validateData = false;
      this.dashboardView = false;
      this.newRequest = false;
      this.viewData = false;
      this.solutionByReq = true;
    });
  }

  goToDashboard() {
    this.dashboardView = true;
    this.validateData = false;
    this.solutionByReq = false;
    this.viewData = false;
    this.newRequest = false;
  }

  createNewReq(ticket) {
    this.dashboardView = false;
    this.validateData = false;
    this.solutionByReq = false;
    this.viewData = false;
    this.newRequest = true;
  }

}

