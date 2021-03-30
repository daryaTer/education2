import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServService {
  // ServService: any;

  constructor(private http: HttpClient) { }

  getData(str: string) {
    // let url = "https://belarusbank.by/api/kursExchange";
    let url = "https://www.nbrb.by/api/exrates/currencies";
    url = "https://www.nbrb.by/api/exrates/rates/" + str + "?parammode=2";
    return this.http.get(url);
  }

  getDataWithDate(date, code){
    let url="https://www.nbrb.by/api/exrates/rates/" + code +"?ondate="+ date;
    return this.http.get(url);
  }
}
//// 145 usd
////298 rus
////292 eur