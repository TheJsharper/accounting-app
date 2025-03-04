import {Component, Inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStateExtend, CreditDebitState} from '../credit-debit.reducer';
import {Observable} from 'rxjs';
import {CreditDebitService} from '../credit-debit.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  creditDebit$?: Observable<CreditDebitState>;
  removeItemAsync?: (uid: string) => Promise<void>;

  constructor(@Inject(Store)  private store: Store<AppStateExtend>, private  creditDebitService: CreditDebitService) {
  }

  ngOnInit() {
    this.creditDebit$ = this.store.select('creditDebit');
    this.removeItemAsync = this.removeItem;
  }

  async removeItem(uid: string): Promise<void> {
    await this.creditDebitService.removeCreditDebit(uid);
  }

}
