
import { SubscriptionBean } from "../all-modules/model/subscription-bean";
import { UserRoles } from "./user-roles";

export class UserInfo {
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;
    contactNo: string;
    status: number;
    createdTime: Date;
    modifiedTime: Date;
    userRole: string;
    roles: UserRoles[]
    randomOtp:number;
    userResponse:number;
    clinicId:number;
    subscriptionBean:SubscriptionBean;
    userEncryptedKey:String;
}
