import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
//import * as OktaAuth from '@okta/okta-auth-js';
import { UserModel } from '../models/user.model';
import { OktaAuthService } from '@okta/okta-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backednUrl: string = 'http://localhost:4200/api/';

  LOGIN_REDIRECT_URI = 'http://localhost:4200/callback';
  LOGOUT_REDIRECT_URI = 'http://localhost:4200/';





  public isAuthenticated = new BehaviorSubject<boolean>(false);


  constructor(private router: Router, private http: HttpClient) {
  }


  // async checkAuthenticated() {
  //   const v = await this.authClient.tokenManager.get('accessToken');
  //   const authenticated = await this.authClient.session.exists();
  //   this.isAuthenticated.next(authenticated);
  //   console.log(v)
  //   return authenticated;
  // }

  // async login(username: string, password: string) {
  //   const transaction = await this.authClient.signIn({ username, password });

  //   if (transaction.status !== 'SUCCESS') {
  //     throw Error('We cannot handle the ' + transaction.status + ' status');
  //   }

  //   this.isAuthenticated.next(true);
  //   this.authClient.session.setCookieAndRedirect(transaction.sessionToken);

  // }



  // async logout(redirect: string) {
  //   try {
  //     await this.authClient.signOut().then(res => {
  //     });
  //     this.isAuthenticated.next(false);
  //     this.router.navigate(["../login"]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // getUserId() {
  //   const accessToken = this.authClient.tokenManager.get('accessToken');
  //   const idTokenObject = this.authClient.tokenManager.get('myIdToken');
  //   this.authClient.token.getUserInfo(accessToken, idTokenObject)
  //     .then(function (user) {
  //       console.log('aici')
  //      console.log(user)
  //       // user has details about the user
  //     });
  // }

  // async getUserFromDB(username) {
  //   const params = new HttpParams().set('email', username);
  //   this.http.get(this.backednUrl + 'GetUserByEmail', { params }).subscribe(res => {
  //     console.log(res)
  //   })
  // }

  // async getConnectedUser() {
  //   //return this.authClient.token.getUserInfo()
  //   return this.connectedUser;
  // }
}