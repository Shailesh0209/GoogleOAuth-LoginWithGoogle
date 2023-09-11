import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

import {
  // FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';

import { GoogleLoginProvider } from '@abacritt/angularx-social-login';


import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('563663616938-d8aq1jftrc8hikndg8ra3mdj1i14q1k2.apps.googleusercontent.com'),
          },
          // { 
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('964178781306077'),
          // },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
  
export class AppModule { }
