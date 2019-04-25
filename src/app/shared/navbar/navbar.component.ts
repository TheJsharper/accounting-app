import {Component, OnInit} from '@angular/core';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {User} from '../../auth/user.model';
import {map} from 'rxjs/operators';
import {AuthState} from '../../auth/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInfo$: Observable<User>;

  constructor(private  store: Store<AppState>) {
  }

  ngOnInit() {
    this.userInfo$ = this.store.select('auth').pipe(map((authState: AuthState) => authState.user));
  }

}
