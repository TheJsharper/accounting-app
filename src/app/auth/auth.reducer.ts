import {User} from './user.model';
import {authAction, SET_USER} from './auth.actions';

export interface AuthState {
  user: User;
}

const initState: AuthState = {user: null};

export function authReducer(state: AuthState = initState, action: authAction): AuthState {
  switch (action.type) {
    case  SET_USER: {
      return {user: {...action.user}};
    }
    default: {
      return state;
    }
  }
}
