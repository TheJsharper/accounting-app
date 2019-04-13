import {Routes} from '@angular/router';
import {StatisticComponent} from '../credit-debit/statistic/statistic.component';
import {CreditDebitComponent} from '../credit-debit/credit-debit.component';
import {DetailComponent} from '../credit-debit/detail/detail.component';

export const dashboardRouters: Routes = [
  {path: '', component: StatisticComponent},
  {path: 'credit-debit', component: CreditDebitComponent},
  {path: 'detail', component: DetailComponent}
];
