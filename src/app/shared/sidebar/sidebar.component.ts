import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {User} from '../../auth/user.model';
import {filter, map} from 'rxjs/operators';
import {AuthState} from '../../auth/auth.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userInfo$?:Observable<Partial<User>>;
  constructor(private  authService: AuthService, @Inject(Store)  private  store:Store<AppState>) {
  }

  ngOnInit() {
    this.userInfo$ = this.store.select('auth').pipe(
      filter((authState:AuthState| undefined)=> authState != null),
      filter((authState:AuthState)=> authState.user != null),
      map((authState:AuthState)=> authState.user));
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }


}
