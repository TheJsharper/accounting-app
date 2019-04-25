import {Component, OnInit} from '@angular/core';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {CreditDebitState} from '../credit-debit.reducer';
import {map} from 'rxjs/operators';
import {CreditDebitModel} from '../credit-debit.model';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  creditCount$: Observable<number>;
  debitCount$: Observable<number>;
  totalCredit$: Observable<number>;
  totalDebit$: Observable<number>;
  creditDebit$: Observable<[number, number]>;



  public doughnutChartLabels: string[] = ['Credit', 'Debit'];


  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    const creditDebit: Observable<CreditDebitState> = this.store.select('creditDebit');
    this.creditCount$ = creditDebit.pipe(map((creditDebit: CreditDebitState) => creditDebit.items.filter((items: CreditDebitModel) => items.type == 'credit').length));
    this.debitCount$ = creditDebit.pipe(map((creditDebit: CreditDebitState) => creditDebit.items.filter((items: CreditDebitModel) => items.type == 'debit').length));
    this.totalCredit$ = creditDebit.pipe(map((creditDebit: CreditDebitState) =>
      creditDebit.items.reduce((prev: number, curr: CreditDebitModel) => {
        if (curr.type == 'credit') {
          prev += curr.amount;
        }
        return prev;
      }, 0)
    ));

    this.totalDebit$ = creditDebit.pipe(map((creditDebit: CreditDebitState) =>
      creditDebit.items.reduce((prev: number, curr: CreditDebitModel) => {
        if (curr.type == 'debit') {
          prev += curr.amount;
        }
        return prev;
      }, 0)
    ));
    this.creditDebit$ = combineLatest(this.totalCredit$, this.totalDebit$);
    /* creditDebit$.pipe(map((value:[number,number])=>{

       }))*/
  }


}
