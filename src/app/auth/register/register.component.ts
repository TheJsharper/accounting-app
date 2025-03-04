import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UIState} from '../../shared/ui.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  statusLoading$?: Observable<UIState| undefined>;

  constructor(private  authService: AuthService, @Inject(Store) private  store: Store<AppState>) {
  }

  ngOnInit() {
    this.statusLoading$ = this.store.select('ui');
  }

  onSubmit(form: NgForm): void {
    this.authService.createNewUser(form.value.name, form.value.email, form.value.password);
    form.resetForm({});
  }
}
