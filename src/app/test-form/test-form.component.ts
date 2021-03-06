import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServService } from 'src/serv.service';
import { ProtoInfo } from '../ProtoInfo';
import { SharedService } from "../shared/shared.service";
import { of, from, fromEvent, interval, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';



@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  myForm = new FormGroup({
    input1: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(.,)/)]),
    input2: new FormControl(''),
    selectCurrency: new FormControl('USD'),
  });
  rateName: string;
  post: ProtoInfo;
  koef: number;

  rates = new Map([
    ['USD', '145'],
    ['EUR', '292'],
    ['RUB', '298'],
    ['CNY', '250'], //китайский юань
    ['GBP', '143'], //фунт сткрлингов
    ['CAD', '124']  //канадский доллар
  ]);

  public CurrenceRate;

  constructor(
    private servService: ServService,
    private sharedServ: SharedService) {
  }



  ngOnInit() {
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'USD');
      this.sharedServ.currency$.next(localStorage.getItem('currency'))
    }

    this.myForm.controls.selectCurrency.valueChanges.pipe(
      switchMap(
        value => {
          this.myForm.controls.input1.disable();
          if (value != this.sharedServ.currency$.value) {
            localStorage.setItem('currency', value);
            this.sharedServ.currency$.next(localStorage.getItem('currency'));

          }
          return this.servService.getData(value)
        }
      ))
      .subscribe((res: ProtoInfo) => {
        this.post = res;
        this.koef = this.post.Cur_OfficialRate / this.post.Cur_Scale;
        this.myForm.controls.input1.enable();

        if (!!this.myForm.controls.input1.value) {
          this.myForm.controls.input2.setValue(this.myForm.controls.input1.value * this.koef);
        }
      });

    // this.myForm.controls.selectCurrency.valueChanges.subscribe(value => {     
    //   this.myForm.controls.input1.disable();
    //   if(value !=this.sharedServ.currency$.value){
    //     this.sharedServ.currency$.next(value);
    //   }


    //   this.servService.getData(value).subscribe((res: ProtoInfo) => {
    //     this.post = res;
    //     this.koef = this.post.Cur_OfficialRate / this.post.Cur_Scale;
    //     this.myForm.controls.input1.enable();

    //     if (!!this.myForm.controls.input1.value) {
    //       this.myForm.controls.input2.setValue(this.myForm.controls.input1.value * this.koef);
    //     }
    //   });
    // });

    this.myForm.controls.input1.valueChanges.subscribe(value => {
      this.myForm.controls.input2.setValue(value * this.koef);
    });

    this.sharedServ.currency$.subscribe(value => {
      this.myForm.controls.selectCurrency.setValue(value);
    });
    this.myForm.controls.input1.setValue('1');

  }

  get _input1() {
    return this.myForm.get('input1')
  }


}


