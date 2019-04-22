import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {CreditDebitModel} from './credit-debit.model';
import {AuthService} from '../auth/auth.service';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditDebitService {

  constructor(private afDB: AngularFirestore, private authService: AuthService, private store:Store<AppState>) {
  }

  async createCreditDebit(value: CreditDebitModel): Promise<DocumentReference> {
    //this.store.select('auth').subscribe()
    value.uid = this.authService.UserLocal.uid;
    return this.afDB.doc(`${this.authService.UserLocal.uid}/credit-debit`).collection('items').add({...value});

  }
   getCreditDebit():Observable<CreditDebitModel[]>{
    return this.afDB.collection<CreditDebitModel>(`${this.authService.UserLocal.uid}/credit-debit/items`).valueChanges()
  }
}
