import {Component, OnInit} from '@angular/core';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {CreditDebitState} from '../credit-debit.reducer';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  creditDebit$: Observable<CreditDebitState>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.creditDebit$ = this.store.select('creditDebit');
  }

  removeItem(uid: string): void {
    console.log(uid);
  }

}
