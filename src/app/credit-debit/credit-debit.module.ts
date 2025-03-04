import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {CreditDebitComponent} from './credit-debit.component';
import {StatisticComponent} from './statistic/statistic.component';
import {DetailComponent} from './detail/detail.component';
import {OrderByCreditDebitPipe} from './order-by-credit-debit.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {NgChartsModule} from 'ng2-charts';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from '../dashboard/dashboard-routing.module';
import {StoreModule} from '@ngrx/store';
import {creditDebitReducer, creditDebitReducers} from './credit-debit.reducer';


@NgModule({
  declarations: [
    DashboardComponent,
    CreditDebitComponent,
    StatisticComponent,
    DetailComponent,
    OrderByCreditDebitPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutingModule,
   // StoreModule.forFeature('creditDebit', creditDebitReducer)
  ]
})
export class CreditDebitModule {
}
