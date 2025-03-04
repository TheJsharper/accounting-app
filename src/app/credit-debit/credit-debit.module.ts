import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CreditDebitComponent } from './credit-debit.component';
import { creditDebitReducer } from './credit-debit.reducer';
import { DetailComponent } from './detail/detail.component';
import { OrderByCreditDebitPipe } from './order-by-credit-debit.pipe';
import { StatisticComponent } from './statistic/statistic.component';


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
   StoreModule.forFeature('creditDebit', creditDebitReducer)
  ]
})
export class CreditDebitModule {
}
