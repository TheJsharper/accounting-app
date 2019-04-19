import {uiReducer, UIState} from './shared/ui.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {authReducer, AuthState} from './auth/auth.reducer';

export interface AppState {
  ui: UIState;
  auth:AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
}
