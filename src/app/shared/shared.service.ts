import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

 


public currency$ = new BehaviorSubject(localStorage.getItem('currency'));
    

  constructor() { }


}
