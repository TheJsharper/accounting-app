import {Component, Inject, OnInit} from '@angular/core';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {User} from '../../auth/user.model';
import {filter, map} from 'rxjs/operators';
import {AuthState} from '../../auth/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInfo$?: Observable<Partial<User | null>>;

  constructor(@Inject(Store) private  store: Store<AppState>) {
  }

  ngOnInit() {
    this.userInfo$ = this.store.select('auth').pipe(
      filter((authState: AuthState| undefined) => authState !== undefined),
      filter((authState: AuthState) => authState.user !== null),
      map((authState: AuthState) => authState.user));
  }

}
