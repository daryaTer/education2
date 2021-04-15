import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { FormsComponent } from './forms/forms.component'
// import { DateComponent } from './date/date.component';
// import { TestFormComponent } from './test-form/test-form.component';
// import { AppComponent } from './app.component';

// const appRoutes: Routes = [
//     {
//         path: 'converter1',
//         component: TestFormComponent
//     },

//     {
//         path: 'converter2',
//         component: FormsComponent
//     },

//     {
//         path: 'chart',
//         component: DateComponent
//     },
//     { path: '', redirectTo: 'converter1', pathMatch: 'full' }
// ];

const appRoutes: Routes = [
    { path: 'dinconverter', loadChildren: () => import('./test-form/test-form-routing.module').then(m => m.TestFormComponentRoutingModule) },
    { path: 'clickconverter', loadChildren: () => import('./forms/forms-routing.module').then(m => m.FormsRoutingModule) },
    { path: 'chart', loadChildren: () => import('./date/date-routing.module').then(m => m.DateRoutingModule) },
    { path: '', redirectTo: 'dinconverter', pathMatch: 'full' }
]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],

    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
