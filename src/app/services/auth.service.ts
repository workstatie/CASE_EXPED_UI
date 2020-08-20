import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthService {

    token;
    userLoggedIn: UserModel;
    constructor(public oktaAuth: OktaAuthService) {  
    }

    async initToken() {
        const user = await this.oktaAuth.getUser();
        this.token = await this.oktaAuth.getAccessToken();
        this.setUser(user);
    }

    logout(){
        this.oktaAuth.logout('/');
    }

    getToken() {
        return this.token;
    }

    setToken(token) {
        this.token = token;
    }

    setUser(user) {
        this.userLoggedIn = user;
    }

    getUser() {
        return this.userLoggedIn;
    }
}