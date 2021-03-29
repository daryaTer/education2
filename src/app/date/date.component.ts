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
  }

  value1: string;
  value2: string;
  post: ProtoInfo;
  currenceArray = [];
  dateArray = [];
  latestPeriodCurrence = [];
  latestPeriodCurrenceDate = [];
  chart = new Chart();
  chartLatestMonth = new Chart();

  dateClick() {
    this.currenceArray = ([]);
    this.dateArray = ([]);
    if (!this.value1 || !this.value2) {
      return alert("pick date range!");
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
      this.getDataWithDate(date, flag);
    }
  }

  getDataWithDate(date, bool) {
    this.servService.getDataWithDate(date).subscribe((res: ProtoInfo) => {
      this.post = res;
      let rate = this.post.Cur_OfficialRate;
      this.currenceArray.push(rate);
    });

    if (bool) {
      this.consoleFun();
    }
  }

  consoleFun() {
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
        type: 'line'
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
          name: 'Line 1',
          type: 'line',
          data: this.currenceArray
        }
      ]
    });

    this.getLatestMonthData(7);
  }

  getLatestMonthData(days: number) {
    days--;
    var day = new Date().toString();
    console.log(day + "   day");
    var dayMilSec = Date.parse(day);
    console.log(dayMilSec + " milSec");
    var daysMilSec = days * 24 * 60 * 60 * 1000;
    for (let i = dayMilSec - daysMilSec; i <= dayMilSec; i += 1000 * 60 * 60 * 24) {
      var date = new Date(i).getFullYear().toString() + '-' + (new Date(i).getMonth() + 1).toString() + '-' + new Date(i).getDate().toString();
      console.log(date + " date");
      // var currence = this.getDataWithDate(date, false);
      // this.latestPeriodCurrenceDate.push(date);
      // this..push(currence);
    }
  }

  callChartLatestMonth() {
    this.chartLatestMonth = new Chart({
      chart: {
        type: 'line'
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
          name: 'Line 1',
          type: 'line',
          data: this.currenceArray
        }
      ]
    });


  }

}

