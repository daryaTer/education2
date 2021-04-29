import { Component, OnInit } from '@angular/core';
import { ServService } from 'src/serv.service';
import { ProtoInfo } from 'src/app/ProtoInfo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  form = new FormGroup({
    input: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(.,)/)]),
    selectCurrency: new FormControl('USD'),
    output: new FormControl(''),
  });




  [x: string]: any;
  post: ProtoInfo;;
  rateName: string;

  rates = new Map([
    ['USD', '145'],
    ['EUR', '292'],
    ['RUB', '298'],
    ['CNY', '250'],
    ['GBP', '143'],
    ['CAD', '124']
  ]);


  constructor(
    private servService: ServService,
    private sharedServ: SharedService) { }

  ngOnInit(): void {
    this.sharedServ.currency$.subscribe(value => {
      this.form.controls.selectCurrency.setValue(value);
    })

    

    this.form.controls.selectCurrency.valueChanges.subscribe(value => {
      if(value !=this.sharedServ.currency$.value){
        this.sharedServ.currency$.next(value);
      }
    })

  }

  Convert() {

    this.servService.getData(this.form.controls.selectCurrency.value).subscribe((res: ProtoInfo) => {
      this.form.controls.input.disable();
      this.form.controls.output.disable();

      this.post = res;
      console.log(this.post);
      this.rateName = this.post.Cur_Name + ' в Бел рубли';
      console.log(parseInt(this.form.controls.input.value) * this.post.Cur_OfficialRate / this.post.Cur_Scale);
      this.form.controls.input.enable();
      this.form.controls.output.enable();
      this.form.controls.output.patchValue((parseInt(this.form.controls.input.value) * this.post.Cur_OfficialRate / this.post.Cur_Scale) + ' BYN');

    });

  }

}
