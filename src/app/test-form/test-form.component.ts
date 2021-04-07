import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServService } from 'src/serv.service';
import { ProtoInfo } from '../ProtoInfo';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

  input1: FormControl;
  input2: FormControl;
  select: FormControl;
  MyForm: FormGroup;
  corporationObj = 'USD';
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

  constructor(private servService: ServService) { }



  ngOnInit() {

    this.MyForm = new FormGroup({
      input1: new FormControl(this.input1),
      input2: new FormControl(this.input2),
      select: new FormControl(this.select)
    });


    // this.MyForm.controls['select'].valueChanges.subscribe(value => {
    //   console.log(value + " RYFGCHBJDYFCGBHKNFGVJBHKNJH");
    //   this.MyForm.patchValue({
    //     select: this.corporationObj
    //   });
    //   this.Convert(this.corporationObj);
    //   this.MyForm.controls['input1'].valueChanges.subscribe(value => {
    //     this.MyForm.patchValue({
    //       input2: value * this.koef
    //     })
    //   });
    // });



    this.MyForm.controls['input1'].valueChanges.subscribe(value => {
      this.Convert(this.corporationObj);
        this.MyForm.patchValue({
          input2: value * this.koef
        });
   
    });

  }


  Convert(valueFrom) {
    this.servService.getData(valueFrom).subscribe((res: ProtoInfo) => {
      this.post = res;
      this.koef = this.post.Cur_OfficialRate / this.post.Cur_Scale;
    });

  }

}



