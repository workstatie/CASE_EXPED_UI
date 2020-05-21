
export class CustomerContactModel {

    id: string;
    firstname: string;  
    lastname: string;
    email: string;
    phone: string;
    customerid: string;
    name: string;

    constructor(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    customerid: string,
    name: string
       
        
    ) {
        this.id =id;
        this.firstname =firstname;
        this.lastname =lastname;
        this.email =email;
        this.phone =phone;
        this.customerid =customerid;
        this.name =name;
    }     
}