import {Action} from '@ngrx/store';
import {User} from './user.model';

export const SET_USER: string = '[AUTH] set user';
export const UNSET_USER: string = '[AUTH] unset user';

export class SetUserAction implements Action {
  readonly type: string = SET_USER;

  constructor(public user: User) {

  }

}

export class UnsetUserAction implements Action {
  readonly type: string = UNSET_USER;
}


export  type authAction = SetUserAction | UnsetUserAction;
