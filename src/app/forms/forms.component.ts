import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ServService } from 'src/serv.service';
import { ProtoInfo } from 'src/app/ProtoInfo';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  [x: string]: any;


  post: ProtoInfo;
  input1: number;
  value2: number;
  corporationObj = 'USD';
  rateName: string;

  rates = new Map([
    ['USD', '145'],
    ['EUR', '292'],
    ['RUB', '298'],
    ['CNY', '250'], //китайский юань
    ['GBP', '143'], //фунт сткрлингов
    ['CAD', '124']  //канадский доллар
  ]);

public getSelectedRate(){
  return this.corporationObj;
}
  constructor(private servService: ServService) { }
  ngOnInit(): void {
  }

  Convert(valueFrom: string, str: string) {
    this.servService.getData(str).subscribe((res: ProtoInfo) => {
      this.post = res;
      console.log(this.post);
      this.rateName = this.post.Cur_Name;
    });
    setTimeout(() => {
      console.log(this.post.Cur_OfficialRate/this.post.Cur_Scale);
      console.log(this.post.Date);
      console.log(valueFrom);
      console.log(parseInt(valueFrom) * this.post.Cur_OfficialRate/this.post.Cur_Scale);
      this.value2 = (parseInt(valueFrom) * this.post.Cur_OfficialRate/this.post.Cur_Scale);
    }, 1000);

  }

}
