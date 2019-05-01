import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {dashboardRouters} from './dashbord.routes';
import {DashboardComponent} from './dashboard.component';

const routes: Routes=[
   {
      path: '', component: DashboardComponent,
      children: dashboardRouters,
     // canActivate: [AuthGuardService]
    },
];
@NgModule({
  declarations: [],
  imports:[
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutingModule { }
