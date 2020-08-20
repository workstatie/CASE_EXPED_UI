
export class UserModel {

    ID: string;
    username: string;  
    email: string;
    phone: string;

    constructor(
        username: string,
        email: string,
        phone: string,
        
    ) {
        this.username =username;
        this.email =email;
        this.phone =phone;
    }     
}