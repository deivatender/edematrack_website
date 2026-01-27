import { EdemaStatus } from "./edema-status";


export class Coupon {
    id:number;
    couponCode:String;
    couponDescription:String;
    createdTime:Date;
    modifiedTime:Date;
    createdBy:number;
    modifiedBy:number;
    status:number;
    discountType:number;
    couponExpiryTime:Date;
    discountValue:number;
    discountTypeBean:EdemaStatus;
    statusBean:EdemaStatus;
}
