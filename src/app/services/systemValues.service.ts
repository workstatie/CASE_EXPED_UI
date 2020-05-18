import { Injectable } from '@angular/core';
import { RequestsModel } from '../models/requests.model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { TruckTypeModel } from '../models/truckType.model';
import { StatusTypeModel } from '../models/statusType.model';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment'
import { CustomerModel } from '../models/customer.model';

@Injectable()
export class SystemValuesService {

    truckTypes: TruckTypeModel[] = [];
    statusTypes: StatusTypeModel[] = [];
    userLoggedIn: UserModel;
    customers: CustomerModel[]= [];

    constructor(private http: HttpClient) {
        this.loadTruckTypes().subscribe(res => {
            for (var i = 0; i < res['recordset'].length; i++) {
                this.truckTypes.push(new TruckTypeModel(res['recordset'][i]['id'], res['recordset'][i]['name']))
            }
        });
        this.loadStatusTypes().subscribe(res => {
            for (var i = 0; i < res['recordset'].length; i++) {
                this.statusTypes.push(new StatusTypeModel(res['recordset'][i]['id'], res['recordset'][i]['name']))
            }
        });

        this.loadCustomers().subscribe(res => {

            for (var i = 0; i < res['recordset'].length; i++) {
                this.customers.push(new CustomerModel(res['recordset'][i]['id'], res['recordset'][i]['name'],res['recordset'][i]['email'],res['recordset'][i]['phone']))
            }
        });
        

    }

    setUser(user) {
        this.userLoggedIn = user;
    }

    getUser() {
        return this.userLoggedIn;
    }

    getUserFromDB(userEmail) {
        const params = new HttpParams().set('email', userEmail);
        return this.http.get(environment.apiUrl + 'GetUserByEmail', { params });
    }


    loadTruckTypes() {
        return this.http.get(environment.apiUrl + 'GetAllTruckTypes')
    }

    loadStatusTypes() {
        return this.http.get(environment.apiUrl + 'GetStatusTypes')
    }
    loadCustomers() {
        return this.http.get(environment.apiUrl + 'GetAllCustomers')
    }

    getTruckTypes() {
        return this.truckTypes;
    }

    getStatusTypes() {
        return this.statusTypes;
    }

    getCustomers() {
        return this.customers;
    }


}