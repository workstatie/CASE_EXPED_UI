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


@Injectable()
export class SystemValuesService {

    truckTypes: TruckTypeModel[] = [];
    statusTypes: StatusTypeModel[] = [];
    userLoggedIn: UserModel;
    customers: CustomerModel[]= [];
    customerContacts: CustomerContactModel[]= [];
    carriers :CarrierModel[]=[];
    countries: CountryModel[]=[];
    token;

    constructor(
        private http: HttpClient
        ) {
            
        }

    setUser(user) {
        this.userLoggedIn = user;
    }

    getUser() {
        return this.userLoggedIn;
    }

    getUserFromDB(userEmail, api_key) {
        const params = new HttpParams().set('email', userEmail).set('api_key', api_key);
        return this.http.get(environment.apiUrl + 'GetUserByEmail', { params });
    }


    loadTruckTypes(api_key) {
        const params = new HttpParams().set('api_key', api_key);
        return this.http.get(environment.apiUrl + 'GetAllTruckTypes', { params })
    }

    getCustomerByName(name, api_key) {
        const params = new HttpParams().set('name', name).set('api_key', api_key);
        return this.http.get(environment.apiUrl + 'GetCustomerByName', { params })
    }

    getCustomerContactByName(name, customerid) {
        const params = new HttpParams().set('name', name).set('customer_id', customerid);
        return this.http.get(environment.apiUrl + 'GetCustomerByName', { params })
    }


    loadStatusTypes(api_key) {
        const params = new HttpParams().set('api_key', api_key)
        return this.http.get(environment.apiUrl + 'GetStatusTypes', { params })
    }

    loadCustomers(api_key) {
        const params = new HttpParams().set('api_key', api_key);
        return this.http.get(environment.apiUrl + 'GetAllCustomers', { params })
    }

    loadCountries(api_key) {
        const params = new HttpParams().set('api_key', api_key);
        return this.http.get(environment.apiUrl + 'GetAllCountries' , { params })
    }

    loadCustomerContacts(customerid, api_key) {
        const params = new HttpParams().set('customer_id', customerid).set('api_key', api_key);
        return this.http.get(environment.apiUrl + 'GetCustomerContactByCustomerID', { params }) 
    }

    loadCarrier(api_key){
        const params = new HttpParams().set('api_key', api_key);
        return this.http.get(environment.apiUrl + 'GetAllCarriers', { params })
    }




    postNewCustomer(request: CustomerModel, api_key) {
        const params = new HttpParams().set('api_key', api_key);
        return this.http.post(environment.apiUrl + 'CreateCustomer', {
            name: request.name,
            agreed_solution_time: request.agreed_solution_time,
            crm_id: request.crm_id
        }, { params });
    }


    
    postNewCustomerContact(request: CustomerContactModel, api_key) {
        const params = new HttpParams().set('api_key', api_key);
        return this.http.post(environment.apiUrl + 'CreateCustomerContact', {
            customer_id: request.customerid,
            email: request.email,
            phone: request.phone,
            firstname: request.firstname,
            lastname: request.lastname,
            name: request.name
        }, { params });
    }

}