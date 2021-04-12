import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from 'src/app/forms/forms.component'
import { DateComponent } from 'src/app/date/date.component';
import { TestFormComponent } from 'src/app/test-form/test-form.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    {
        path: '',
        component: TestFormComponent
    },

    {
        path: 'converter2',
        component: FormsComponent
    },

    {
        path: 'chart',
        component: DateComponent
    }
];

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    bootstrap: [
        AppComponent,
        FormsComponent,
        DateComponent,
        TestFormComponent],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
