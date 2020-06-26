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

    getMyRequests(userId, api_key) {
        const params = new HttpParams().set('user_id', userId).set('api_key', api_key);
        this.http.get(environment.apiUrl + 'GetRequestByCountry', { params })
            .pipe(map(res => res['recordset'])).subscribe((res: RequestsModel[]) => {
                // data = res['recordset'];
                this.myRequests$.next(res);
            });
    }

    getUnassignedRequests(api_key) {
        const params = new HttpParams().set('api_key', api_key);
            this.http.get(environment.apiUrl + 'GetUnassignedRequests',{ params })
              .pipe(map(res => res['recordset'])).subscribe( (res : RequestsModel[]) =>{
               this.unassignedRequests$.next(res);
            });
    }


    getRequestByID(id,api_key) {
        const params = new HttpParams().set('id', id).set('api_key', api_key);
        return this.http.get(environment.apiUrl + 'GetRequestDetails', { params })
    }

    getRequestByCountry(user_id, api_key) {
        const params = new HttpParams().set('user_id', user_id).set('api_key', api_key);
        return this.http.get(environment.apiUrl + 'GetRequestByCountry', { params })
    }


    postNewRequest(request: RequestsModel, api_key) {
        const params = new HttpParams().set('api_key', api_key);

        return this.http.post(environment.apiUrl + 'NewRequest', {
            customer_id: request.customer_id,
            customer_contact_id: request.customer_contact_id,
            from_address_city: request.from_address_city,
            from_address_country: request.from_address_country,
            from_address_postcode: request.from_address_postcode,
            to_address_city: request.to_address_city,
            to_address_country: request.to_address_country,
            to_address_postcode: request.to_address_postcode,
            load_datetime: request.load_datetime,
            unload_datetime: request.unload_datetime,
            load_end_datetime: request.load_end_datetime,
            unload_end_datetime: request.unload_end_datetime,
            solution_deadline: request.solution_deadline,
            validation_datetime: request.validation_datetime,
            goods_weight: request.goods_weight,
            truck_type_id: request.truck_type_id,
            special_requirments: request.special_requirments,
            email_html: request.email_html,
            assigned_user_id: request.assigned_user_id,
            request_status_type_id: request.request_status_type_id,
            request_source_id: request.request_source_id,
            adr_flag: request.adr_flag,
            twodrivers_flag: request.twodrivers_flag,
            jumbo_flag: request.jumbo_flag,
            frigo_flag: request.frigo_flag,
            intermodal_flag: request.intermodal_flag
        }, { params });
    }

    putRequestById(request: RequestsModel, id, api_key) {
        const params = new HttpParams().set('id', id).set('api_key', api_key);;
        return this.http.put(environment.apiUrl + 'UpdateRequest', {
            customer_id: request.customer_id,
            from_address_city: request.from_address_city,
            from_address_postcode: request.from_address_postcode,
            from_address_country: request.from_address_country,
            to_address_city: request.to_address_city,
            to_address_country: request.to_address_country,
            to_address_postcode: request.to_address_postcode,
            load_datetime: request.load_datetime,
            unload_datetime: request.unload_datetime,
            solution_sent_datetime: request.solution_sent_datetime,
            validation_datetime: request.validation_datetime,
            goods_weight: request.goods_weight,
            truck_type_id: request.truck_type_id,
            special_requirments: request.special_requirments,
            email_html: request.email_html,
            assigned_user_id: request.assigned_user_id,
            request_status_type_id: request.request_status_type_id
        }, { params });
    }

    updateStatusReqById(id, status, api_key) {


        const params = new HttpParams().set('id', id).set('api_key', api_key);;;

        return this.http.patch(environment.apiUrl + 'UpdateRequest', {
            request_status_type_id: status
        }, { params });
    }




}