import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private  authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    console.log('===>', form.value);
    this.authService.createNewUser(form.value.name, form.value.email, form.value.password);
    form.resetForm({});
  }
}
