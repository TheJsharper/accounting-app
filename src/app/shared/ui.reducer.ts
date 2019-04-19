import {ACTIVE_LOADING, DEACTIVATE_LOADING, UiActions} from './ui.actions';

export interface UIState {
  isLoading: boolean;
}


const initState: UIState = {isLoading: false};


export function uiReducer(state: UIState = initState, action: UiActions): UIState {
  switch (action.type) {

    case ACTIVE_LOADING:
      return {isLoading: true};
    case  DEACTIVATE_LOADING:
      return {isLoading: false};
      
    default: {
      return state;
    }
  }
}
