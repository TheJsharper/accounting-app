import {Action} from '@ngrx/store';
import {CreditDebitModel} from './credit-debit.model';

export const SET_ITEMS: string = '[Credit Debit] set Items';
export const UNSET_ITEMS: string = '[Credit Debit] unset Items';

export class SetItemsAction implements Action {

  readonly type: string = SET_ITEMS;

  constructor(public items: CreditDebitModel[]) {
  }
}

export class UnsetItemsAction implements Action {

  readonly type: string = UNSET_ITEMS;
}

export type creditDebitActions = SetItemsAction | UnsetItemsAction;
