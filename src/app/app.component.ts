import { Component, OnInit } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideStorage } from '@angular/fire/storage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { getAuth } from 'firebase/auth';
import { } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';  
/*AngularFireModule.initializeApp(environment.firebase),
AngularFirestoreModule,
StoreModule.forRoot(appReducers),
NgbModule,*/

//  CreditDebitModule,
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [

 AuthModule,
    AppRoutingModule,

/*
    provideFirebaseApp(() => initializeApp(environment.firebase)),     
    provideFirestore(() => getFirestore()),  
    provideAuth(() => getAuth()),  
    provideStorage(() => getStorage()),  
    provideAnalytics(() => getAnalytics()), */ 

    /*StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly:environment.production
    }),*/
    /*SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    })*/

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
