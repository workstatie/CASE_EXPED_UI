
export class ExtractedDataModel {
    origin:string;
    addressFrom: string;
    addressTo: string;
    cityFrom: string;
    cityTo: string;
    postcodeFrom: string;
    postcodeTo: string;

    constructor(
        origin: string,
        addressFrom: string,
        addressTo: string,
        cityFrom: string,
        cityTo: string,
        postcodeFrom: string,
        postcodeTo: string,
        
    ) {
        this.origin = origin;
        this.addressFrom = addressFrom;
        this.addressTo = addressTo;
        this.cityFrom = cityFrom;
        this.cityTo = cityTo;
        this.postcodeFrom = postcodeFrom;
        this.postcodeTo = postcodeTo;
     
    }     
}
