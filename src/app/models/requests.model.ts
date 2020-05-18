
export class RequestsModel {
    id: string;
    customer_id : string;
    from_address_city :  string ;
    from_address_country :  string ;
    from_address_postcode :  string ;
    to_address_city :  string ;
    to_address_country :  string ;
    to_address_postcode :  string ;
    load_datetime :  string ;
    unload_datetime :  string ;
    solution_time :  string ;
    validation_datetime :  string ;
    goods_weight :  string ;
    goods_europallets :  string ;
    truck_type_id :  string ;
    adr_type_id :  string ;
    special_requirments :  string ;
    email_html :  string ;
    assigned_user_id :  string ;
    completed :  string ;
    request_status_type_id :  string 
    datetime_created:string
    
    constructor(
        id: string,
        customer_id : string,
        from_address_city :  string ,
        from_address_country :  string ,
        from_address_postcode :  string ,
        to_address_city :  string ,
        to_address_country :  string ,
        to_address_postcode :  string ,
        load_datetime :  string ,
        unload_datetime :  string ,
        solution_time :  string ,
        validation_datetime :  string ,
        goods_weight :  string ,
        goods_europallets :  string ,
        truck_type_id :  string ,
        adr_type_id :  string ,
        special_requirments :  string ,
        email_html :  string ,
        assigned_user_id :  string ,
        completed :  string ,
        request_status_type_id :  string 

    ) {
        this.id =id;
        this.customer_id  =customer_id;
        this.from_address_city=from_address_city;
        this.from_address_postcode=from_address_postcode;
        this.to_address_city=to_address_city;
        this.from_address_country=from_address_country
        this.to_address_country=to_address_country
        this.to_address_city=to_address_city;
        this.to_address_postcode=to_address_postcode;
        this.load_datetime=load_datetime;
        this.unload_datetime=unload_datetime;
        this.solution_time=solution_time;
        this.validation_datetime=validation_datetime;
        this.goods_weight=goods_weight;
        this.goods_europallets=goods_europallets;
        this.truck_type_id=truck_type_id;
        this.adr_type_id=adr_type_id;
        this.special_requirments=special_requirments;
        this.email_html=email_html;
        this.assigned_user_id=assigned_user_id;
        this.completed=completed;
        this.request_status_type_id=request_status_type_id;
    }
}
