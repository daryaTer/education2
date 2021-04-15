import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DateComponent } from './date.component';

const appRoute: Routes = [{ path: '', component: DateComponent }];

@NgModule({
    imports: [RouterModule.forChild(appRoute)],
    exports: [RouterModule]
})
export class DateRoutingModule { }