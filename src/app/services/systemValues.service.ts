import { Injectable } from '@angular/core';
import { RequestsModel } from '../models/requests.model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { TruckTypeModel } from '../models/truckType.model';
import { StatusTypeModel } from '../models/statusType.model';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment'
import { CustomerModel } from '../models/customer.model';
import { CustomerContactModel } from '../models/customercontact.model';
import { CarrierModel } from '../models/carrier.model';
import { CountryModel } from '../models/country.model';
import { OktaAuthService } from '@okta/okta-angular';
import { map } from 'rxjs/operators';


@Injectable()
export class SystemValuesService {

    truckTypes: TruckTypeModel[] = [];
    statusTypes: StatusTypeModel[] = [];
    userLoggedIn: UserModel;
    customers: CustomerModel[] = [];
    customerContacts: CustomerContactModel[] = [];
    carriers: CarrierModel[] = [];
    countries: CountryModel[] = [];
    token;
    oktaUser;

    constructor(private http: HttpClient,
        public oktaAuth: OktaAuthService) {    
    }

    
    async initToken() {
        const user = await this.oktaAuth.getUser();
        this.setOktaUser(user);
        this.token = await this.oktaAuth.getAccessToken();
       
    }

    logout(){
         this.oktaAuth.logout('/');
    }

    setOktaUser(user){
        this.oktaUser = user;
    }
    
    getOktaUser(){
        return this.oktaUser;
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

    getUserFromDB(email) {
        const params = new HttpParams().set('email', email);
        return this.http.get(environment.apiUrl + 'GetUserByEmail', {params});
    }


    loadTruckTypes() {

        return this.http.get(environment.apiUrl + 'GetAllTruckTypes')
    }

    getCustomerByName(name) {
        const params = new HttpParams().set('name', name);
        return this.http.get(environment.apiUrl + 'GetCustomerByName', {params})
    }

    getCustomerContactByName(name, customerid) {
        const params = new HttpParams().set('name', name).set('customer_id', customerid);
        return this.http.get(environment.apiUrl + 'GetCustomerByName', {params})
    }


    loadStatusTypes() {
        return this.http.get(environment.apiUrl + 'GetStatusTypes')
    }

    loadCustomers() {

        return this.http.get(environment.apiUrl + 'GetAllCustomers')
    }

    loadCountries() {

        return this.http.get(environment.apiUrl + 'GetAllCountries')
    }

    loadCustomerContacts(customerid ) {
        const params = new HttpParams().set('customer_id', customerid);
        return this.http.get(environment.apiUrl + 'GetCustomerContactByCustomerID', {params})
    }

    loadCarrier() {

        return this.http.get(environment.apiUrl + 'GetAllCarriers')
    }




    postNewCustomer(request: CustomerModel) {
       
        return this.http.post(environment.apiUrl + 'CreateCustomer', {
            name: request.name,
            agreed_solution_time: request.agreed_solution_time,
            crm_id: request.crm_id
        });
    }



    postNewCustomerContact(request: CustomerContactModel) {
       
        return this.http.post(environment.apiUrl + 'CreateCustomerContact', {
            customer_id: request.customerid,
            email: request.email,
            phone: request.phone,
            firstname: request.firstname,
            lastname: request.lastname,
            name: request.name
        });
    }

}