import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

trackedCurrency; 

  constructor() { }

  setMessage(data){
    this.trackedCurrency=data;
  }

  getMessage(){
    return this.trackedCurrency;
  }

}
