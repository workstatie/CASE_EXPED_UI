import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';
import { ValidateDataComponent } from './components/dashboard/validate-data/validate-data.component';
import {  RequestService } from './services/requests.service';
import { MyTicketsComponent } from './components/dashboard/my-tickets/my-tickets.component';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SystemValuesService } from './services/systemValues.service';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NewRequestComponent } from './components/dashboard/new-request/new-request.component';
import {  NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SolutionService } from './services/solution.service';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

import {MatListModule} from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common'; 
import { MatDialogModule } from '@angular/material/dialog';
import { SolutionBottomSheet } from './components/dashboard/main/popUps/bottomSharedSolution';
import { SolutionByReqComponent } from './components/dashboard/solution-by-req/solution-by-req.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { CountdownModule } from 'ngx-countdown';
import { ChartsComponent } from './components/dashboard/charts/charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UnassignedReqComponent } from './components/dashboard/unassigned-req/unassigned-req.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { DialogComponent } from './components/dashboard/main/popUps/dialog';
import {environment} from '../environments/environment';

import {MatAutocompleteModule} from '@angular/material/autocomplete';


const oktaConfig = {
  issuer: 'https://dev-444034.okta.com/oauth2/default',
  clientId: environment.oktaClient,
  redirectUri: environment.oktaRedirect,
  pkce: true
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ValidateDataComponent,
    MyTicketsComponent,
    NewRequestComponent,
    SolutionBottomSheet,
    SolutionByReqComponent,
    ChartsComponent,
    UnassignedReqComponent
  ],
  imports: [
    OktaAuthModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatBadgeModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    NgxMatDatetimePickerModule, 
    NgxMatNativeDateModule, 
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatSliderModule,
    MatSelectModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatSortModule,
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule,
    MatNativeDateModule,
    CountdownModule,
    NgxChartsModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  providers: [
    RequestService,
    SystemValuesService,
    SolutionService,
    {provide : OKTA_CONFIG, useValue: oktaConfig},
    DatePipe
  ],
  entryComponents:[
    DialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
