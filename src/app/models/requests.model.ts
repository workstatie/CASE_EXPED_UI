import { ExtractedDataModel } from './extractedData.model';

export class RequestsModel {

    _id: string;
    status: string;
    assignedToID: string;
    data: ExtractedDataModel;

    constructor(
        _id: string,
        status: string,
        assignedToID: string,
        data: ExtractedDataModel,

    ) {
        this._id = _id;
        this.status = status;
        this.assignedToID = assignedToID;
        this.data = data;

    }
}
