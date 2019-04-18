import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private  authService: AuthService) {
  }

  ngOnInit() {
  }

  async onSubmit(form: NgForm): Promise<void> {
    const userValue: any = form.value;
    form.resetForm({});
    await this.authService.login(userValue.email, userValue.password);
  }
}
