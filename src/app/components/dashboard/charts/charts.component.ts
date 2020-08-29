import { Component, OnInit } from '@angular/core';
import { single } from './mockData/data';
import { cities } from './mockData/dataCities';
import { overview } from './mockData/requestsTreated';
import { sales } from './mockData/sales';
import { answerRate} from './mockData/answerRateApp';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  single: any[];
  cities: any[];
  sales: any[];
  answerRate: any[];
  overview: any[];
  view: any[] = [500, 200];

  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Wins';
  showYAxisLabel = true;
  yAxisLabel = 'EUR';

  colorScheme = {
    domain: ['#0B1C48', '#E66912', '#9E3A14']
  };

  colorScheme2 = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  view1: any[] = [700, 200];


  view2: any[] = [900, 400];
  view3: any[] = [900, 400];


  cardColor: string = '#232837';


  constructor() {
    Object.assign(this, { single });
    Object.assign(this, { cities });
    Object.assign(this, { overview });
    Object.assign(this, { answerRate });
    Object.assign(this, { sales });
  }

  onSelect(data): void {
  //    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
  //  console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }





  ngOnInit(){

  }
}
