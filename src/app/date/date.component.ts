import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/serv.service';
import { ProtoInfo } from '../ProtoInfo';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  constructor(private servService: ServService) { }

  ngOnInit(): void {
    this.dateClick(145);
  }

  value1;
  value2;
  post: ProtoInfo;
  post1: ProtoInfo;
  currenceArray = [];
  dateArray = [];
  latestPeriodCurrence = [];
  latestPeriodCurrenceDate = [];
  chart = new Chart();
  chartLatestMonth = new Chart();

  dateClick(rateCode=145) { //////////// по умолчанию выводит курс доллара
    this.currenceArray = ([]);
    this.dateArray = ([]);

////////// если начало и конец периода не выбраны, то выводится инфа за последние 30 дней

    if(!this.value2){
      var today = new Date();

      this.value2= today.getFullYear().toString() + '-' + ((today.getMonth() < 9 ? '0' : '') + (today.getMonth()+1)).toString() + '-' + today.getDate().toString();
  
    }

    if(!this.value1){
      this.value1= today.getFullYear().toString() + '-' + ((today.getMonth() < 9 ? '0' : '') + (today.getMonth()+1)).toString() + '-' + today.getDate().toString();
      this.value1=(Date.parse(this.value1)) - 3*30*24*60*60*1000;
      this.value1=new Date(this.value1);
      this.value1= this.value1.getFullYear().toString() + '-' + ((this.value1.getMonth() < 9 ? '0' : '') + (this.value1.getMonth()+1)).toString() + '-' + this.value1.getDate().toString();
    }
    var s = (Date.parse(this.value1));
    var e = (Date.parse(this.value2));
    var a = e - s;

    for (let i = s; i <= e; i += 24 * 60 * 60 * 1000) {
      var flag = false;
      if (i == e) {
        flag = true;
      }
      var date = new Date(i).getFullYear().toString() + '-' + (new Date(i).getMonth() + 1).toString() + '-' + new Date(i).getDate().toString();
      this.dateArray.push(date);
      this.getDataWithDate(date, flag, rateCode); 
    ///////////// flag для того, чтобы определить, что это последняя считываемая дата, 
    //////////////////и тогда можно будет выводит курс в консоль для проверки
    /////////////// rateCode - код валюты. 145 = usd, 292 = eur, 289 = rus
    }
  }

  getDataWithDate(date, bool,rateCode) {
    this.servService.getDataWithDate(date, rateCode).subscribe((res: ProtoInfo) => {
      this.post = res;
      let rate = this.post.Cur_OfficialRate;
      this.currenceArray.push(rate);
    });

    if (bool) {
      this.consoleFunc();
    }
  }

  consoleFunc() {
    setTimeout(() => {
      for (let i = 0; i < this.dateArray.length; i++) {
        console.log(this.dateArray[i] + " " + this.currenceArray[i])
      }
      this.callChart();
    }, 1000);

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
          name: 'USD',
          type: 'line',
          data: this.currenceArray
        },
      ]
    });


  }

  getLatestDate(date) {
    this.servService.getDataWithDate(date, 145
      ).subscribe((res: ProtoInfo) => {
      this.post1 = res;
      var rate = this.post1.Cur_OfficialRate;
      this.latestPeriodCurrence.push(rate);
      this.latestPeriodCurrenceDate.push(date);
      console.log(rate + ' i ' + date);

    });
  }

  getLatestMonthData(days: number) {
    days--;
    var day = new Date().toString();
    console.log(day + "   day");
    var dayMilSec = Date.parse(day);
    var daysMilSec = days * 24 * 60 * 60 * 1000;
    var t=0;
    for (let i = dayMilSec - daysMilSec; i <= dayMilSec; i += 1000 * 60 * 60 * 24) {
      var date = new Date(i).getFullYear().toString() + '-' + (new Date(i).getMonth() + 1).toString() + '-' + new Date(i).getDate().toString();
      t++;
      this.getLatestDate(date);
     
    }
  }

  callChartLatestMonth() {
    this.getLatestMonthData(7);
    this.chartLatestMonth = new Chart({
      chart: {
        type: 'column',
        zoomType: 'x'
      },
      title: {
        text: 'Latest Data'
      },
      xAxis: {
        categories: this.latestPeriodCurrenceDate
      },
      credits: {
        enabled: true
      },
      series: [
        {
          name: 'Line 2',
          type: 'line',
          data: this.latestPeriodCurrence
        }
      ]
    });
  }

  Some(){}

}

