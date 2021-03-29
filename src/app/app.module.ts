import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServService } from 'src/serv.service';


import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component'
import { DateComponent } from './date/date.component';

import { ChartModule } from 'angular-highcharts';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    DateComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartModule
    
  ],
  providers: [ServService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] } // add as factory to your providers
  ],
  bootstrap: [AppComponent, FormsComponent, DateComponent]
})
export class AppModule {

  constructor() { }
}



