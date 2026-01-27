import { SubscriptionBean } from "./subscription-bean";
import { Therapist } from "./therapist";

export class LicenseKey {
    id:number;
    licenseKey:number;
    assignTo:number;
    createdTime:Date;
    modifiedTime:Date;
    clinicId:number;
    subscriptionBean:SubscriptionBean;
    therapistId:number;
    therapistBean:Therapist;
}
