import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/serv.service';
import { ProtoInfo } from '../ProtoInfo';
import { Chart } from 'angular-highcharts';
import { FormsComponent } from '../forms/forms.component';


@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  constructor(private servService: ServService) { }


  ngOnInit(): void {

    this.dateClick(145);
  }

  loaderValue:number;
  loader:boolean;
  value1: any;
  value2: any;
  post: ProtoInfo;
  post1: ProtoInfo;
  currenceArray = [];
  dateArray = [];
  chart = new Chart();
  selectedRate = 'USD';
  rates = new Map([
    ['USD', 145],
    ['EUR', 292],
    ['RUB', 298],
    ['CNY', 304], //китайский юань
    ['GBP', 143], //фунт сткрлингов
    ['CAD', 23]  //канадский доллар
  ]);


  dateClick(rateCode = this.rates.get(this.selectedRate)) { //////////// по умолчанию выводит курс доллара за посл 90 дней
    this.currenceArray = ([]);
    this.dateArray = ([]);
    this.loaderValue=0;
    this.loader=true;

    ////////// если начало и конец периода не выбраны, то выводится инфа за последние 90 дней

    if (!this.value2) {
      var today = new Date();
      ///получение формата yyyy-MM-dd
      this.value2 = today.getFullYear().toString() + '-' + ((today.getMonth() < 9 ? '0' : '') + (today.getMonth() + 1)).toString() + '-' + today.getDate().toString();

    }

    if (!this.value1) {
      this.value1 = new Date((Date.parse(this.value2)) - 3 * 30 * 24 * 60 * 60 * 1000);
      this.value1 = this.value1.getFullYear().toString() + '-' + ((this.value1.getMonth() < 9 ? '0' : '') + (this.value1.getMonth() + 1)).toString() + '-' + this.value1.getDate().toString();
    }
    var start = (Date.parse(this.value1));
    var end = (Date.parse(this.value2));
    let daysCount = (end - start) / (24 * 60 * 60 * 1000) + 1;
    for (let i = start; i <= end; i += 24 * 60 * 60 * 1000) {
      var date = new Date(i).getFullYear().toString() + '-' + (new Date(i).getMonth() + 1).toString() + '-' + new Date(i).getDate().toString();
      this.dateArray.push(date);
      this.getDataWithDate(date, rateCode, daysCount);
      ///////////// flag для того, чтобы определить, что это последняя считываемая дата, 
      //////////////////и тогда можно будет выводит курс в консоль для проверки
      /////////////// rateCode - код валюты. 145 = usd, 292 = eur, 289 = rus
    }
  }



  getDataWithDate(date, rateCode, daysCount) {
    this.servService.getDataWithDate(date, rateCode).subscribe((res: ProtoInfo) => {
      this.post = res;
      this.loaderValue= this.loaderValue+ 100/daysCount;
      console.log(this.loaderValue + ' this.loaderValue');

      let rate = this.post.Cur_OfficialRate / this.post.Cur_Scale;
      this.currenceArray.push(rate);
      if (this.currenceArray.length == daysCount) {
        this.loader=!this.loader;
        this.callChart();
      }
    });
  }


  callChart() {
    this.chart = new Chart({
      chart: {
        type: 'line',
        zoomType: 'xy'
      },
      title: {
        text: 'Linechart'
      },
      xAxis: {
        categories: this.dateArray
      },
      credits: {
        enabled: true
      },
      series: [
        {
          name: this.selectedRate.toString(),
          type: 'line',
          data: this.currenceArray
        },
      ]
    });


  }


}

