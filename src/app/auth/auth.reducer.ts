import {User} from './user.model';
import {authAction, SET_USER, SetUserAction, UNSET_USER, UnsetUserAction} from './auth.actions';

export interface AuthState {
  user: User;
}

const initState: AuthState = {user: null};

export function authReducer(state: AuthState = initState, action: authAction): AuthState {
  switch (action.type) {
    case  SET_USER: {
      if (action instanceof SetUserAction) {
        return {user: {...action.user}};
      }
      break;
    }
    case UNSET_USER: {
      if (action instanceof UnsetUserAction) {
        return {user: null};
      }
      break;
    }
    default: {
      return state;
    }
  }
}
