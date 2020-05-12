
export class CustomerModel {

    ID: string;
    crm_id: string;  
    email: string;
    phone: string;

    constructor(
        ID: string,
        crm_id: string,
        email: string,
        phone: string,
        
    ) {
        this.ID =ID;
        this.crm_id =crm_id;
        this.email =email;
        this.phone =phone;
    }     
}