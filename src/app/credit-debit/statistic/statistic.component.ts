import { Component, Inject, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { combineLatest, iif, Observable, of } from 'rxjs';
import { AppStateExtend, CreditDebitState } from '../credit-debit.reducer';
import { filter, map, mergeMap } from 'rxjs/operators';
import { CreditDebitModel } from '../credit-debit.model';
import "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  creditCount$: Observable<number> = of(0);

  debitCount$: Observable<number> = of(0);

  totalCredit$: Observable<number> = of(0);

  totalDebit$: Observable<number> = of(0);

  creditDebit$: Observable<[number, number]> = of([0, 0]);

  successStatus$: Observable<boolean> = of(false);

  dangerStatus$: Observable<boolean> = of(false);

  resultCreditDebit$: Observable<number> = of(0);

  isGreaterThanZeroTotalCreditDebit$: Observable<boolean> = of(false);



  public doughnutChartLabels: string[] = ['Credit', 'Debit'];


  constructor(@Inject(Store) private store: Store<AppStateExtend>) {
  }

  ngOnInit() {
    const creditDebit: Observable<CreditDebitState> = this.store.select('creditDebit').pipe(filter((creditDebit: CreditDebitState | undefined): creditDebit is CreditDebitState => creditDebit !== null && creditDebit !== undefined));
    
    this.creditCount$ = creditDebit.pipe(
      filter((creditDebit: CreditDebitState | undefined): creditDebit is CreditDebitState => creditDebit !== null && creditDebit !== undefined && creditDebit.items.length > 0),
      map((creditDebit: CreditDebitState) => creditDebit.items.filter((items: CreditDebitModel) => items.type == 'credit').length));

    this.debitCount$ = creditDebit.pipe(map((creditDebit: CreditDebitState) => creditDebit.items.filter((items: CreditDebitModel) => items.type == 'debit').length));

    this.totalCredit$ = creditDebit.pipe(
      filter((creditDebit: CreditDebitState | undefined): creditDebit is CreditDebitState => creditDebit !== null && creditDebit !== undefined && creditDebit.items.length > 0),
      map((creditDebit: CreditDebitState) =>
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

    this.successStatus$ = this.calculationViewStatus().pipe(mergeMap((value: number) => iif(() => value > 0, of(true), of(false))));

    this.dangerStatus$ = this.calculationViewStatus().pipe(mergeMap((value: number) => iif(() => value < 0, of(true), of(false))));

    this.resultCreditDebit$ = this.calculationTotalDebitAndCredit();

    this.isGreaterThanZeroTotalCreditDebit$ = this.calculationGreaterThanZeroTotalDebitAndCredit();
  }

  private calculationViewStatus(): Observable<number> {

    const value: Observable<number> = this.creditCount$.pipe(
      filter((creditCount: number | undefined) => creditCount != undefined),
      mergeMap((creditCount: number | undefined) => this.debitCount$.pipe(
        filter((debitCount: number | undefined) => debitCount != undefined),
        map((value: number | undefined) => creditCount != undefined && value != undefined ? creditCount - value : 0
        ))));


    return value;
  }

  private calculationTotalDebitAndCredit(): Observable<number> {
    const value: Observable<number> = this.totalCredit$.pipe(
      filter((totalCredit: number | undefined) => totalCredit != undefined),
      mergeMap((totalCredit: number) => this.totalDebit$.pipe(
        filter((totalCredit: number | undefined) => totalCredit != undefined),
        map((value: number) => totalCredit - value
        ))));
    return value;
  }

  private calculationGreaterThanZeroTotalDebitAndCredit(): Observable<boolean> {
    const result = this.totalCredit$.pipe(
      filter((totalCredit: number | undefined) => totalCredit != undefined),
      mergeMap((totalCredit: number) => this.totalDebit$.pipe(
        filter((totalCredit: number | undefined) => totalCredit != undefined),
        map((value: number) => totalCredit > 0 || value > 0
        ))));

        return result;
  }
}
