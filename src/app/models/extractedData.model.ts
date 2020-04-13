
export class ExtractedDataModel {

    origin:string;
    addressFrom: string;
    adressTo: string;
    cityFrom: string;
    cityTo: string;
    postcodeFrom: string;
    postcodeTo: string;
    
    
  

    constructor(
        origin: string,
        addressFrom: string,
        adressTo: string,
        cityFrom: string,
        cityTo: string,
        postcodeFrom: string,
        postcodeTo: string,
        
    ) {
        this.origin = origin;
        this.addressFrom = addressFrom;
        this.adressTo = adressTo;
        this.cityFrom = cityFrom;
        this.cityTo = cityTo;
        this.postcodeFrom = postcodeFrom;
        this.postcodeTo = postcodeTo;
     
    }     
}
