import { EdemaStatus } from "../../model/edema-status";
import { SubscriptionBean } from "../../model/subscription-bean";


export class AdminSupport {
    id:number;
    subject:String;
    message:String;
    createdTime:Date;
    modifiedTime:Date;
    createdBy:number;
    modifiedBy:number;
    status:number;
    statusBean:EdemaStatus;
    clinicId:number;
    subscriptionBean:SubscriptionBean;
    userType:number;
    name:String;
    email:String;
}
