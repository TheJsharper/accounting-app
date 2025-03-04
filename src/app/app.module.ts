/*import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, SETTINGS} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ChartsModule} from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
  //  CreditDebitModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    NgbModule,
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly:environment.production
    }),
    SweetAlert2Module.forRoot({
      //buttonsStyling: false,
    //  customClass: 'modal-content',
     // confirmButtonClass: 'btn btn-primary',
     // cancelButtonClass: 'btn'
     provideSwal?: () => import('sweetalert2/dist/sweetalert2.all.js'),
     fireOnInit?: true,
     dismissOnDestroy?: true
    })
  ],
  exports:[ChartsModule],
  providers: [{
    provide:SETTINGS, useValue:{}
  }],
  bootstrap: [AppComponent]
})*/
export class AppModule { }
