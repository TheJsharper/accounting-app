import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
// ES6 Modules or TypeScript
import {User} from 'firebase';
import {map, tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import * as UserLocal from './user.model';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {ActiveLoadingAction, DeactivateLoadingAction} from '../shared/ui.actions';
import {SetUserAction, UnsetUserAction} from './auth.actions';
import {UnsetItemsAction} from '../credit-debit/credit-debit.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subscriptions: Subscription[] = [];
  private userLocal: UserLocal.User;

  public get UserLocal(): UserLocal.User {
    return {...this.userLocal};
  }

  constructor(private afAth: AngularFireAuth, private router: Router, private afDB: AngularFirestore, private  store: Store<AppState>) {
  }

  initAuthListener(): void {
    this.afAth.authState.subscribe((user: User) => {
      if (user) {
        this.subscriptions.push(this.afDB.doc(`${user.uid}/user`)
          .valueChanges()
          .subscribe((userJson: any) => {
              this.userLocal = new UserLocal.User(userJson.name, userJson.email, userJson.uid);
              this.store.dispatch(new SetUserAction(this.userLocal));

            }
          ));
      } else {
        this.userLocal = null;
        this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
      }
      console.log(user);
    });
  }


  createNewUser(name: string, email: string, password: string): void {
    this.store.dispatch(new ActiveLoadingAction());
    this.afAth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(async (userCredential: firebase.auth.UserCredential) => {
        const user: UserLocal.User = {
          name,
          email: userCredential.user.email,
          uid: userCredential.user.uid
        };
        await this.afDB.doc(`${user.uid}/user`).set(user);
        await this.router.navigate(['/']);
        this.store.dispatch(new DeactivateLoadingAction());
      }).catch((err: any) => {
      console.log(err);
      this.store.dispatch(new DeactivateLoadingAction());
    });

  }

  async login(email: string, password: string): Promise<void> {
    try {
      this.store.dispatch(new ActiveLoadingAction());
      const userCredential: firebase.auth.UserCredential = await this.afAth.auth.signInWithEmailAndPassword(email, password);
      await this.router.navigate(['/']);
      this.store.dispatch(new DeactivateLoadingAction());
    } catch (err) {
      console.log(err);
      this.store.dispatch(new DeactivateLoadingAction());

    }

  }

  async logout(): Promise<void> {
    await this.router.navigate(['/login']);
    await this.afAth.auth.signOut();
    this.store.dispatch(new UnsetUserAction());
    this.store.dispatch(new UnsetItemsAction());
  }

  isAuth(): Observable<boolean> {
    return this.afAth.authState.pipe(map((user: User) => {
      if (user == null) {
        this.router.navigate(['/login']).then((value: boolean) => console.log(value));
      }
      return user != null;
    }));
  }
}
