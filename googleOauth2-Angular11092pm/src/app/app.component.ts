import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SocialAuthService,
  GoogleLoginProvider,
  // FacebookLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // title: string = 'googleOauth';
  title = 'googleOauth'; 
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin: boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {
    console.log('App component constructor called');
   }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // loginWithFacebook(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  
  logOut(): void {
    this.socialAuthService.signOut();
  }
}