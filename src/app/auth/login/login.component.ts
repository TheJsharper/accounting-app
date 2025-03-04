import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UIState} from '../../shared/ui.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  statusLoading$?: Observable<UIState|undefined>;

  constructor(private authService: AuthService, @Inject(Store) private store: Store<AppState>) {
  }

  ngOnInit() {
    this.statusLoading$ = this.store.select('ui');
  }

  async onSubmit(form: NgForm): Promise<void> {
    const userValue: any = form.value;
    form.resetForm({});
    await this.authService.login(userValue.email, userValue.password);
  }
}
