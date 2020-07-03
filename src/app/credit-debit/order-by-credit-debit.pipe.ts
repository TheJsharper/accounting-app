import {Pipe, PipeTransform} from '@angular/core';
import {CreditDebitModel} from './credit-debit.model';

@Pipe({
  name: 'orderByCreditDebit'
})
export class OrderByCreditDebitPipe implements PipeTransform {

  transform(items: CreditDebitModel[]): CreditDebitModel[] {
    return items.slice().sort((a: CreditDebitModel, b: CreditDebitModel) => {
      return a.type == 'credit' ? -1 : 1;
    });
  }

}
