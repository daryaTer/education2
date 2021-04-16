import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServService } from 'src/serv.service';


import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component'
import { DateComponent } from './date/date.component';

import { ChartModule } from 'angular-highcharts';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { TestFormComponent } from './test-form/test-form.component';
import {AppRoutingModule} from 'src/app/app-routing.module'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    DateComponent,
    TestFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    BrowserAnimationsModule
  ],
  providers: [ServService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] } // add as factory to your providers
  ],
  
  bootstrap: [AppComponent ]
})
export class AppModule {

  constructor() { }  
}



