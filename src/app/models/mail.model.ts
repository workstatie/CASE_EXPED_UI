
export class MailModel {

    subject: string;
    body: string;
    emailFrom: string;
    
  

    constructor(
        subject: string,
        body: string,
        emailFrom: string,
        
    ) {
        this.subject = subject;
        this.body = body;
      
        this.emailFrom= emailFrom;
    }     
}
