import { Inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// ES6 Modules or TypeScript
import { Store } from '@ngrx/store';
//import { User } from 'firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from 'firebase/auth';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { UnsetItemsAction } from '../credit-debit/credit-debit.actions';
import { ActiveLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import * as UserLocal from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subscriptions: Subscription[] = [];
  private userLocal!: Partial<UserLocal.User>;

  public get UserLocal(): Partial<UserLocal.User> {
    return {...this.userLocal};
  }

  constructor(private afAth: Auth , private router: Router, @Inject(Firestore) private afDB: Firestore, @Inject(Store) private  store: Store<AppState>) {
  }

  initAuthListener(): void {
    //this.afAth.authState.subscribe((user: User) => {
      authState(this.afAth).subscribe((user: User| null ) => {
      if (user) {
        this.subscriptions.push(this.afDB.doc(`${user.uid}/user`)
          .valueChanges()
          .subscribe((userJson: any) => {
              this.userLocal = new UserLocal.User(userJson.name, userJson.email, userJson.uid);
              this.store.dispatch(new SetUserAction(this.userLocal! as UserLocal.User));

            }
          ));
      } else {
       // this.userLocal = null;
        this.userLocal = {};
        this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
      }
      console.log(user);
    });
  }


  createNewUser(name: string, email: string, password: string): void {
    this.store.dispatch(new ActiveLoadingAction());
   // this.afAth.createUserWithEmailAndPassword(email, password)
   //this.afAth.currentUser(email, password)
   createUserWithEmailAndPassword(this.afAth, email, password)
      .then(async (userCredential: /*firebase.auth.UserCredential*/ UserCredential) => {
        const user: UserLocal.User = {
          name,
          email: userCredential.user.email!,
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
      const userCredential: /*firebase.auth.UserCredential */ UserCredential = /*await this.afAth.signInWithEmailAndPassword(email, password)*/ await signInWithEmailAndPassword(this.afAth, email, password);
      await this.router.navigate(['/']);
      this.store.dispatch(new DeactivateLoadingAction());
    } catch (err) {
      console.log(err);
      this.store.dispatch(new DeactivateLoadingAction());

    }

  }

  async logout(): Promise<void> {
    await this.router.navigate(['/login']);
    await this.afAth.signOut();
    this.store.dispatch(new UnsetUserAction());
    this.store.dispatch(new UnsetItemsAction());
  }

  isAuth(): Observable<boolean> {
    return authState(this.afAth).pipe(map((user: User | null) => {
      if (user == null) {
        this.router.navigate(['/login']).then((value: boolean) => console.log(value));
      }
      return user != null;
    }));
  }
}
