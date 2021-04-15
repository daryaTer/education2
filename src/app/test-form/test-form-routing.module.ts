import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestFormComponent } from './test-form.component';

const appRoute: Routes = [{ path: '', component: TestFormComponent }];

@NgModule({
    imports: [RouterModule.forChild(appRoute)],
    exports: [RouterModule]
})
export class TestFormComponentRoutingModule { }