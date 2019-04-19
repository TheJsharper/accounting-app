import {Action} from '@ngrx/store';
import {User} from './user.model';

export const SET_USER: string = '[AUTH] set user';

export class SetUserAction implements Action {
  readonly type: string = SET_USER;

  constructor(public user: User) {

  }

}

export  type authAction = SetUserAction;
