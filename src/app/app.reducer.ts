import {uiReducer, UIState} from './shared/ui.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {authReducer, AuthState} from './auth/auth.reducer';
import {creditDebitReducer, CreditDebitState} from './credit-debit/credit-debit.reducer';

export interface AppState {
  ui?: UIState;
  auth?:AuthState,
  //creditDebit?: null,
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
//  creditDebit: creditDebitReducer
}
