
export class RequestsModel {
    id: string;
    customer_id : string;
    customer_contact_id : string;
    from_address_city :  string ;
    from_address_country :  string ;
    from_address_postcode :  string ;
    to_address_city :  string ;
    to_address_country :  string ;
    to_address_postcode :  string ;
    load_datetime :  string ;
    load_end_datetime :  string ;
    unload_datetime :  string ;
    unload_end_datetime :  string ;
    solution_sent_datetime :  string ;
    solution_deadline :  string ;
    validation_datetime :  string ;
    goods_weight :  string ;
    truck_type_id :  string ;
    special_requirments :  string ;
    email_html :  string ;
    assigned_user_id :  string ;
    request_status_type_id :  string ;
    request_source_id :  string ;
    datetime_created:string;
    adr_flag: string;
    twodrivers_flag: string;
    jumbo_flag: string;
    frigo_flag: string;
    intermodal_flag: string;
    status_name:string;

    constructor(
        customer_id : string,
        customer_contact_id : string,
        from_address_city :  string ,
        from_address_country :  string ,
        from_address_postcode :  string ,
        to_address_city :  string ,
        to_address_country :  string ,
        to_address_postcode :  string ,
        load_datetime :  string ,
        load_end_datetime :  string ,
        unload_datetime :  string ,
        unload_end_datetime :  string ,
        solution_sent_datetime :  string ,
        solution_deadline :  string ,
        validation_datetime :  string ,
        goods_weight :  string ,     
        truck_type_id :  string ,
        special_requirments :  string ,
        email_html :  string ,
        assigned_user_id :  string ,
        request_status_type_id :  string, 
        request_source_id :  string,
        adr_flag : string =null,
        twodrivers_flag : string =null,
        jumbo_flag : string =null,
        frigo_flag : string =null,
        intermodal_flag : string =null,

    ) {
        this.customer_id  =customer_id;
        this.customer_contact_id  =customer_contact_id;
        this.from_address_city=from_address_city;
        this.from_address_country=from_address_country
        this.from_address_postcode=from_address_postcode;
        this.to_address_city=to_address_city;
        this.to_address_country=to_address_country
        this.to_address_postcode=to_address_postcode;
        this.load_datetime=load_datetime;
        this.load_end_datetime=load_end_datetime;
        this.unload_datetime=unload_datetime;
        this.unload_end_datetime=unload_end_datetime;
        this.solution_sent_datetime=solution_sent_datetime;
        this.solution_deadline=solution_deadline;
        this.validation_datetime=validation_datetime;
        this.goods_weight=goods_weight;
        this.truck_type_id=truck_type_id;
        this.special_requirments=special_requirments;
        this.email_html=email_html;
        this.assigned_user_id=assigned_user_id;
        this.request_status_type_id=request_status_type_id;
        this.request_source_id=request_source_id;
        this.adr_flag=adr_flag;
        this.twodrivers_flag=twodrivers_flag;
        this.jumbo_flag=jumbo_flag;
        this.frigo_flag=frigo_flag;
        this.intermodal_flag=intermodal_flag;
    }
}
