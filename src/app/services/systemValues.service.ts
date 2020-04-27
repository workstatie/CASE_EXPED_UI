import { Injectable } from '@angular/core';
import { RequestsModel } from '../models/requests.model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { TruckTypeModel } from '../models/truckType.model';
import { StatusTypeModel } from '../models/statusType.model';

@Injectable()
export class SystemValuesService {

    backednUrl: string = 'http://localhost:4200/api/'
    truckTypes: TruckTypeModel[] = [];
    statusTypes: StatusTypeModel[] = [];


    constructor(private http: HttpClient) { 
        this.loadTruckTypes().subscribe(res =>{
            for(var i=0;i<res['recordset'].length; i++){
                this.truckTypes.push(new TruckTypeModel(res['recordset'][i]['id'],res['recordset'][i]['name'])) 
            }   
        });
        this.loadStatusTypes().subscribe(res =>{
            for(var i=0;i<res['recordset'].length; i++){
                this.statusTypes.push(new StatusTypeModel(res['recordset'][i]['id'],res['recordset'][i]['name'])) 
            }   
        });
    }


    loadTruckTypes() {
        return this.http.get(this.backednUrl + 'GetAllTruckTypes')
    }

    loadStatusTypes() {
        return this.http.get(this.backednUrl + 'GetStatusTypes')
    }

    getTruckTypes(){
        return this.truckTypes;
    }

    getStatusTypes(){
        return this.statusTypes;
    }


}