import { Component, OnInit } from '@angular/core';
import { } from 'firebase/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CreditDebitModule } from './credit-debit/credit-debit.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    AuthModule,
    CreditDebitModule,
    AppRoutingModule,
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.initAuthListener();
  }
}
