
export class SolutionModel {
    id: string;
    request_id: string;
    price : string;
    delay :  string ;
    carrier_id :  string ;
    truck_type_id :  string ;
    details :  string ;
    transit_time :  string ;
 

    constructor(
        id: string,
        request_id: string,
        price : string,
        delay :  string ,
        carrier_id :  string ,
        truck_type_id :  string ,
        details :  string ,
        transit_time :  string ,
  
    ) {
        this.id = id;
        this.request_id =request_id;
        this.price  =price;
        this.delay=delay;
        this.carrier_id=carrier_id;
        this.truck_type_id=truck_type_id;
        this.details=details;
        this.transit_time=transit_time;
  
    }
}
