
export class CustomerModel {

    id: string;
    name: string;  
    crm_id: string;
    agreed_solution_time: string;

    constructor(
      id: string,
        name: string,
        crm_id: string,
        agreed_solution_time: string,
        
    ) {
     this.id = id;
        this.name =name;
        this.crm_id =crm_id;
        this.agreed_solution_time =agreed_solution_time;
    }     
}