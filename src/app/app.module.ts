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
import { OutlookInitComponent } from './components/dashboard/outlook-init/outlook-init.component';
import { SlackInitComponent } from './components/dashboard/slack-init/slack-init.component';
import { SkypeInitComponent } from './components/dashboard/skype-init/skype-init.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';
import { ValidateDataComponent } from './components/dashboard/validate-data/validate-data.component';
import { GetTicketsService } from './services/getTickets.service';
import { MyTicketsComponent } from './components/dashboard/my-tickets/my-tickets.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    OutlookInitComponent,
    SlackInitComponent,
    SkypeInitComponent,
    ValidateDataComponent,
    MyTicketsComponent,
  ],
  imports: [
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
  ],
  providers: [
    GetTicketsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
