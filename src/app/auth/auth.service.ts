import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
// ES6 Modules or TypeScript
import {User} from 'firebase';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as UserLocal from './user.model';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) {
  }

  initAuthListener(): void {
    this.afAth.authState.subscribe((user: User) => {
      console.log(user);
    });
  }

  createNewUser(name: string, email: string, password: string): void {
    this.afAth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(async (userCredential: firebase.auth.UserCredential) => {
        console.log(userCredential);
        const user: UserLocal.User = {
          name,
          email: userCredential.user.email,
          uid: userCredential.user.uid
        };
        await this.afDB.doc(`${user.uid}/user`).set(user);
        await this.router.navigate(['/']);
      }).then((err: any) => {
      console.log(err);
    });

  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential: firebase.auth.UserCredential = await this.afAth.auth.signInWithEmailAndPassword(email, password);
      console.log(userCredential);
      await this.router.navigate(['/']);
    } catch (err) {
      console.log(err);

    }

  }

  async logout(): Promise<void> {
    await this.router.navigate(['/login']);
    await this.afAth.auth.signOut();
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
