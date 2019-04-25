import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {CreditDebitModel} from './credit-debit.model';
import {AuthService} from '../auth/auth.service';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {User} from '../auth/user.model';
import {AuthState} from '../auth/auth.reducer';
import {filter, map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreditDebitService {

  constructor(private afDB: AngularFirestore, private authService: AuthService, private store: Store<AppState>) {
  }

  async getAuthState(): Promise<AuthState> {

    let subscription: Subscription = new Subscription();
    const authState: AuthState = await new Promise<AuthState>((resolve: (value: AuthState) => void, reject: (reason: any) => void) => {
        subscription = this.store.select('auth').pipe(filter((value: AuthState) => value.user != null), take(1)).subscribe(resolve, reject);

      }
    );
    subscription.unsubscribe();
    return authState;


  }

  async getCreditDebitItem(): Promise<any> {

    const authState: AuthState = await this.getAuthState();
    return this.afDB.collection(`${authState.user.uid}/credit-debit/items`)
      .snapshotChanges()
      .pipe(
        map((value: DocumentChangeAction<CreditDebitModel>[]) => {

          return value.map((v: DocumentChangeAction<CreditDebitModel>) => {
            const cdModel: CreditDebitModel = {...v.payload.doc.data(), uid: v.payload.doc.id};
            return cdModel;
          });
        }));

  }

  async createCreditDebit(value: CreditDebitModel): Promise<DocumentReference> {
    //this.store.select('auth').subscribe()
    value.uid = this.authService.UserLocal.uid;
    return this.afDB.doc(`${this.authService.UserLocal.uid}/credit-debit`).collection('items').add({...value});

  }

  getCreditDebit(): Observable<CreditDebitModel[]> {
    return this.afDB.collection<CreditDebitModel>(`${this.authService.UserLocal.uid}/credit-debit/items`).valueChanges();
  }

  async removeCreditDebit(uid: string): Promise<void> {

    const authState: AuthState = await this.getAuthState();
    return this.afDB.doc(`${authState.user.uid}/credit-debit/items/${uid}`).delete();
  }
}
