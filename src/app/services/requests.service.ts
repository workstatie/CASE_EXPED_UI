import { Injectable } from '@angular/core';
import { RequestsModel } from '../models/requests.model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment'
import { map } from "rxjs/operators"; 


@Injectable()
export class RequestService {

    // myRequests: RequestsModel[] = [];
    public myRequests$: BehaviorSubject<any> = new BehaviorSubject({});
    public unassignedRequests$: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private http: HttpClient) {
    }

    getMyRequests(userId) {
        const params = new HttpParams().set('assigned_user_id', userId);
        this.http.get(environment.apiUrl + 'GetRequests', { params })
          .pipe(map(res => res['recordset'])).subscribe( (res : RequestsModel[]) =>{
           // data = res['recordset'];
           this.myRequests$.next(res);
        });
    }

    getUnassignedRequests() {
            const params = new HttpParams().set('assigned_user_id', 'NULL');
            this.http.get(environment.apiUrl + 'GetRequests', { params })
              .pipe(map(res => res['recordset'])).subscribe( (res : RequestsModel[]) =>{
               this.unassignedRequests$.next(res);
            });
    }




    // getMyRequests(userId) {  
    //     const params = new HttpParams().set('assigned_user_id', userId);
    //     return this.http.get(environment.apiUrl + 'GetRequests', { params })
    // }


    getRequestByID(id) {
        const params = new HttpParams().set('id', id);
        return this.http.get(environment.apiUrl + 'GetRequestDetails', { params })
    }


    postNewRequest(request: RequestsModel) {
        return this.http.post(environment.apiUrl + 'NewRequest', {
            customer_id: request.customer_id,
            from_address_city: request.from_address_city,
            from_address_country: request.from_address_country,
            from_address_postcode: request.from_address_postcode,
            to_address_city: request.to_address_city,
            to_address_country: request.to_address_country,
            to_address_postcode: request.to_address_postcode,
            load_datetime: request.load_datetime,
            unload_datetime: request.unload_datetime,
            solution_time: request.solution_time,
            validation_datetime: request.validation_datetime,
            goods_weight: request.goods_weight,
            goods_europallets: request.goods_europallets,
            truck_type_id: request.truck_type_id,
            adr_type_id: request.adr_type_id,
            special_requirments: request.special_requirments,
            email_html: request.email_html,
            assigned_user_id: request.assigned_user_id,
            request_status_type_id: request.request_status_type_id
        });
    }

    putRequestById(request: RequestsModel, id) {
        const params = new HttpParams().set('id', id);
        return this.http.put(environment.apiUrl + 'UpdateRequest', {
            customer_id: request.customer_id,
            from_address_city: request.from_address_city,
            from_address_postcode: request.from_address_postcode,
            from_address_country: request.from_address_country,
            to_address_city: request.to_address_city,
            to_address_country : request.to_address_country,
            to_address_postcode: request.to_address_postcode,
            load_datetime: request.load_datetime,
            unload_datetime: request.unload_datetime,
            solution_time: request.solution_time,
            validation_datetime: request.validation_datetime,
            goods_weight: request.goods_weight,
            goods_europallets: request.goods_europallets,
            truck_type_id: request.truck_type_id,
            adr_type_id: request.adr_type_id,
            special_requirments: request.special_requirments,
            email_html: request.email_html,
            assigned_user_id: request.assigned_user_id,
            request_status_type_id: request.request_status_type_id
        }, { params });
    }

    updateStatusReqById(id, status) {
        

        const params = new HttpParams().set('id', id);

        return this.http.patch(environment.apiUrl + 'UpdateRequest', {
            request_status_type_id: status
        }, { params });
    }

     robotSendRequests(repeat){
        const params = new HttpParams().set('processName',"HelloWorldMGA");
        return this.http.post(environment.robotUrl + 'StartRobot', { repeat : repeat},
            { params } )
    }


}