import { SubscriptionBean } from "./subscription-bean";

export class Therapist {

    id:number;
    mobile:String;
    firstName:String;
    lastName:String;
    email:String;
    clinicId:number;
    subscriptionBean:SubscriptionBean;
    createdTime:Date;
    modifiedTime:Date;
    licenseKey:String;
    password:String;
    otpRequestedTime:Date;
    randomOtp:number;
    status:number;
    verificationStatus:number;
    licenseKeyId:number;
    loginKey:String;

}
