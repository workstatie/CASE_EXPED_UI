import { Injectable } from '@angular/core';
import { RequestsModel } from '../models/requests.model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class SolutionService {

    myRequests: RequestsModel[] = [];
    backednUrl: string = 'http://localhost:4200/api/'
    
    constructor(private http: HttpClient) { 
    }


    getSolutions() {
        return this.http.get(this.backednUrl + 'GetSolutions' )
    }

    getSolutionForRequestId(reqId){
        const params = new HttpParams().set('request_id', reqId);
        return this.http.get(this.backednUrl + 'GetSolutionForRequestID', { params } )
    }

}