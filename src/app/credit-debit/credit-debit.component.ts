import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditDebitModel} from './credit-debit.model';
import {CreditDebitService} from './credit-debit.service';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UIState} from '../shared/ui.reducer';
import {ActiveLoadingAction, DeactivateLoadingAction} from '../shared/ui.actions';
import {AppStateExtend} from './credit-debit.reducer';

@Component({
  selector: 'app-credit-debit',
  templateUrl: './credit-debit.component.html',
  styleUrls: ['./credit-debit.component.scss']
})
export class CreditDebitComponent implements OnInit {
  form?: FormGroup;
  loadingStatus$?: Observable<UIState| undefined>;

  constructor(private  creditDebitService: CreditDebitService, @Inject(Store)  private store: Store<AppStateExtend>) {
  }

  ngOnInit() {
    this.loadingStatus$ = this.store.select('ui');
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.min(0)]),
      type: new FormControl('credit', [Validators.required])

    });
  }

  setType(value: string): void {
    this.form?.get('type')?.setValue(value);
  }

  async createNewCreditDebit(): Promise<void> {
    try {
      this.store.dispatch(new ActiveLoadingAction());
      const creditDebit: CreditDebitModel = new CreditDebitModel(this.form?.get('description')?.value?? '', this.form?.get('amount')?.value?? '', this.form?.get('type')?.value??'', '');

      await this.creditDebitService.createCreditDebit(creditDebit);
      this.form?.reset({amount: 0, type: 'credit', description: ''});
      this.store.dispatch(new DeactivateLoadingAction());
    } catch (e) {
      console.error(e);
    }

  }

}
