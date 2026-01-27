import { City } from "./city";
import { Coupon } from "./coupon";
import { State } from "./state";
import { SubscriptionPlan } from "./subscription-plan";

export class SubscriptionBean {
    id:number;
    userMobile:String;
    firstName:String;
    lastName:String;
    remark:String;
    userEmail:String;
    subscriptionDateTime:Date;
    expireDateTime:Date;
    subscriptionDuration:String;
    subscriptionAmount:number
    modifiedTime:Date;
    createdTime:Date;
    status:number;
    paymentStatus:number;
    paymentId:String;
    userPassword:String;
    companyName:String;
    paymentSessionId:String;
    transactionStatus:number;
    currencyName:string;
    tax:number;
    discount:number;
    finalAmount:number;
    recieptUrl:String;
    paymentKey:String;
    paymentGateway:number;
    paymentType:number;
    dueAmount:number;
    subscriptionPlanId:number;
    clinicEin:String;
    countryId:number;
  
    stateId:number;
    randomOtp:number;
    otpRequestedTime:Date;
    discountId:number;
    couponCode:String;
    zipCode:String;
    address:String;
    verificationStatus:number;
    stateBean:State;
    
    clinicName:String;
    subscriptionPlanBean:SubscriptionPlan;
    cardCvv:String;
    cardHolderName:String;
    cardExpiry:String;
    cardNumber:String;
    loginKey:String;
    isCouponCodeApply:number;
    couponCodeId:number;
    couponBean:Coupon;
    cityName:String;
    // cityId:number;
    // cityBean:City;
    newsLetterFlag:number;
}
