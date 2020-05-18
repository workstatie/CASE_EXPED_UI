import { Injectable } from '@angular/core';
import { RequestsModel } from '../models/requests.model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable()
export class SolutionService {

    myRequests: RequestsModel[] = [];
    
    
    constructor(private http: HttpClient) { 
    }


    getSolutions() {
        return this.http.get(environment.apiUrl + 'GetSolutions' )
    }

    getSolutionForRequestId(reqId){
        const params = new HttpParams().set('request_id', reqId);
        return this.http.get(environment.apiUrl + 'GetSolutionForRequestID', { params } )
    }

  
    robotSendRequests(repeat){
        const params = new HttpParams().set('processName',"CASE.EXPED.Check.Request.Responses");
        return this.http.post(environment.robotUrl + 'StartRobot', { repeat : repeat},
            { params } )
    }

}