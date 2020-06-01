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

@Injectable()
export class SystemValuesService {

    truckTypes: TruckTypeModel[] = [];
    statusTypes: StatusTypeModel[] = [];
    userLoggedIn: UserModel;
    customers: CustomerModel[]= [];
    customerContacts: CustomerContactModel[]= [];


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
                this.customers.push(new CustomerModel(res['recordset'][i]['id'], res['recordset'][i]['name'],res['recordset'][i]['agreed_solution_time'],res['recordset'][i]['crm_id']))
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

    getCustomerByName(name) {
        const params = new HttpParams().set('name', name);
        return this.http.get(environment.apiUrl + 'GetCustomerByName', { params })
    }

    getCustomerContactByName(name, customerid) {
        const params = new HttpParams().set('name', name).set('customer_id', customerid);
        return this.http.get(environment.apiUrl + 'GetCustomerByName', { params })
    }


    loadStatusTypes() {
        return this.http.get(environment.apiUrl + 'GetStatusTypes')
    }
    loadCustomers() {
        return this.http.get(environment.apiUrl + 'GetAllCustomers')
    }

    loadCustomerContacts(customerid) {
        const params = new HttpParams().set('customer_id', customerid);
        return this.http.get(environment.apiUrl + 'GetCustomerContactByCustomerID', { params }) 
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

    getTruckTypes() {
        return this.truckTypes;
    }

    getStatusTypes() {
        return this.statusTypes;
    }

    getAllCustomers() {
        return this.customers;
    }


}