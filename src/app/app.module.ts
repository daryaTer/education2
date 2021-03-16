import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServService } from 'src/serv.service';


import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component'
@NgModule({
  declarations: [
    AppComponent,
    FormsComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ServService],
  bootstrap: [AppComponent, FormsComponent]
})
export class AppModule {

  constructor() { }
}



