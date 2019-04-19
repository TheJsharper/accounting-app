import {Action} from '@ngrx/store';

export const ACTIVE_LOADING: string = '[UI LOADING ] Loading...';
export const DEACTIVATE_LOADING: string = '[UI LOADING ] End of loading...';

export class ActiveLoadingAction implements Action {
  readonly type: string = ACTIVE_LOADING;
}

export class DeactivateLoadingAction implements Action {
  readonly type: string = DEACTIVATE_LOADING;
}

export type UiActions = ActiveLoadingAction | DeactivateLoadingAction;
