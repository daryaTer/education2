import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';

const appRoute: Routes = [{ path: '', component: FormsComponent }];

@NgModule({
    imports: [RouterModule.forChild(appRoute)],
    exports: [RouterModule]
})
export class FormsRoutingModule { }