import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAth: AngularFireAuth, private router: Router) {
  }

  createNewUser(name: string, email: string, password: string): void {
    this.afAth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(async (userCredential: firebase.auth.UserCredential) => {
        console.log(userCredential);
        await this.router.navigate(['/']);
      }).then((err: any) => {
      console.log(err);
    });

  }
}
