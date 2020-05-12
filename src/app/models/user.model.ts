
export class UserModel {

    ID: string;
    username: string;  
    email: string;
    phone: string;

    constructor(
        ID: string,
        username: string,
        email: string,
        phone: string,
        
    ) {
        this.ID =ID;
        this.username =username;
        this.email =email;
        this.phone =phone;
    }     
}