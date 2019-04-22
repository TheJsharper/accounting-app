import {CreditDebitModel} from './credit-debit.model';
import {creditDebitActions, SET_ITEMS, SetItemsAction, UNSET_ITEMS} from './credit-debit.actions';

export interface CreditDebitState {
  items: CreditDebitModel[];
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
      }
    }
    case  UNSET_ITEMS: {
      return {items: []};
    }
    default :
      return state;
  }
}
