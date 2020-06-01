
export class CarrierModel {

    id: string;
    name: string;  
    email: string;
    phone: string;
    orders_fulfilled : string;
    rating :string;

    constructor(
      id: string,
      name: string,  
      email: string,
      phone: string,
      orders_fulfilled : string,
      rating :string,
        
    ) {
     this.id = id;
        this.name =name;
        this.email =email;
        this.phone =phone;
        this.orders_fulfilled =orders_fulfilled;
        this.rating =rating;
    }     
}