import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {User} from '../../auth/user.model';
import {map} from 'rxjs/operators';
import {AuthState} from '../../auth/auth.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userInfo$:Observable<User>;
  constructor(private  authService: AuthService, private  store:Store<AppState>) {
  }

  ngOnInit() {
    this.userInfo$ = this.store.select('auth').pipe(map((authState:AuthState)=> authState.user));
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }


}
