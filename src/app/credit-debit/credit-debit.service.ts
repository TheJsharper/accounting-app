import { Injectable } from '@angular/core';
import { doc, DocumentReference, Firestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { getDoc, setDoc } from 'firebase/firestore';
import { lastValueFrom, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { AuthState } from '../auth/auth.reducer';
import { AuthService } from '../auth/auth.service';
import { CreditDebitModel } from './credit-debit.model';

@Injectable({
  providedIn: 'root'
})
export class CreditDebitService {

  constructor(  private authService: AuthService, private store: Store<AppState>, private firestore: Firestore) {
  }

  async getAuthState(): Promise<AuthState> {

      const result = this.store.select('auth').pipe(
      filter((value: AuthState | undefined) => value !== undefined && value.user != null),
      map((value: AuthState | undefined) => value as AuthState), take(1),);
    return await lastValueFrom(result);
  }

 async getCreditDebitItem(): Promise<Observable<CreditDebitModel[]>> {

    const authState: AuthState = await this.getAuthState();

    const docRef = doc(this.firestore, `${authState.user.uid}/credit-debit/items`);
  
    const docResult = getDoc(docRef);
    return new Observable<CreditDebitModel[]>((observer) => {
      docResult.then((value) => {
        observer.next(value.data() as CreditDebitModel[]);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });

  }

  async createCreditDebit(value: CreditDebitModel): Promise<DocumentReference> {
    value.uid = this.authService.UserLocal.uid??'';
    const ref = await doc(this.firestore,
      `${this.authService.UserLocal.uid}/credit-debit/items`);

    setDoc(ref, { ...value });
    return ref;

  }

  getCreditDebit(): Observable<CreditDebitModel[]> {
    const docRef = doc(this.firestore, `${this.authService.UserLocal.uid}/credit-debit/items`);
    const docResult = getDoc(docRef);

    return new Observable<CreditDebitModel[]>((observer) => {
      docResult.then((value) => {
        observer.next(value.data() as CreditDebitModel[]);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });

  }
  async removeCreditDebit(uid: string): Promise<void> {

    const authState: AuthState = await this.getAuthState();

 
    const docRef = doc(this.firestore, `${authState.user.uid}/credit-debit/items/${uid}`);
    await setDoc(docRef, { ...{ deleted: true } }, { merge: true });
  }
}
