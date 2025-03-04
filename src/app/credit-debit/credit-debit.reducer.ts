import {CreditDebitModel} from './credit-debit.model';
import {creditDebitActions, SET_ITEMS, SetItemsAction, UNSET_ITEMS} from './credit-debit.actions';
import {AppState} from '../app.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {uiReducer} from '../shared/ui.reducer';
import {authReducer} from '../auth/auth.reducer';

export interface CreditDebitState {
  items: CreditDebitModel[];
}
export interface AppStateExtend extends AppState{
 creditDebit: CreditDebitState,
}
const initialState: CreditDebitState = {
  items: []
};

export function creditDebitReducer(state: CreditDebitState = initialState, action: creditDebitActions): CreditDebitState {
  switch (action.type) {
    case  SET_ITEMS: {
      if (action instanceof SetItemsAction) {
        return {
          items: action.items.map((item: CreditDebitModel) => {
            return {...item};
          })
        };
      }else {
        return state;
      }
    }
    case  UNSET_ITEMS: {
      return {items: []};
    }
    default :
      return state;
  }
}

export const creditDebitReducers: ActionReducerMap<AppStateExtend> = {

  creditDebit: creditDebitReducer
}
