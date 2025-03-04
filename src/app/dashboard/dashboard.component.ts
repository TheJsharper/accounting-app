import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CreditDebitService} from '../credit-debit/credit-debit.service';
import {Observable, Subscription} from 'rxjs';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {SetItemsAction} from '../credit-debit/credit-debit.actions';
import {CreditDebitModel} from '../credit-debit/credit-debit.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(private creditDebitService: CreditDebitService, @Inject(Store) private  store: Store<AppState>) {
  }

  async ngOnInit(): Promise<void> {
    const items: Observable<CreditDebitModel[]>= await this.creditDebitService.getCreditDebitItem();
    this.subscriptions.push(items.subscribe((items: CreditDebitModel[]) => this.store.dispatch(new SetItemsAction(items))));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

}
