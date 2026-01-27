import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionBean } from '../model/subscription-bean';
import { Therapist } from '../model/therapist';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

    private cscUrl =window["commonUrlApi"]+'/api/edema/csc-data';
    private clinicUrl =window["commonUrlApi"]+'/api/edema/clinic-subscription';
    private therapistUrl =window["commonUrlApi"]+'/api/edema/therapist';
    private commonUrl =window["commonUrlApi"]+'/api/edema/common';
    private subscriptionUrl =window["commonUrlApi"]+'/api/edema/subscription-plan';
    private subscriptionBean: SubscriptionBean
    
         
    constructor(private http: HttpClient) { }


    getStatesList(id: Number): Observable<any> {
      return this.http.get(this.cscUrl + '/stateGetByCountryId/' + id);
    }

    getCityList(id: Number): Observable<any> {
      return this.http.get(this.cscUrl + '/cityGetByStateId/' + id);
    }

    signUpCreation(signup: SubscriptionBean): Observable<Object> {
      return this.http.post(`${this.clinicUrl}` + `/createClinicSusbcription`, signup);
     }

     therapistCreation(signup: Therapist): Observable<Object> {
      return this.http.post(`${this.therapistUrl}` + `/therapistCreation`, signup);
     }

     getSubscriberById(id: Number): Observable<SubscriptionBean> {
      return this.http.get<SubscriptionBean>(this.clinicUrl + '/getSubscriptionById/' + id);
   }

   verifyClinic(signup: SubscriptionBean): Observable<SubscriptionBean> {
    return this.http.post<SubscriptionBean>(`${this.clinicUrl}` + `/clinicOTPVerification`, signup);
   }

   otpResendById(id: Number): Observable<SubscriptionBean> {
      return this.http.get<SubscriptionBean>(this.clinicUrl + '/clinicOtpResend/' + id);
   }

   onFindKeyword(id: String) {
     return this.http.get<any>(this.commonUrl + '/searchLicenseKey/' + id);
   }

   verifyTherapist(therapist: Therapist): Observable<Therapist> {
    return this.http.post<Therapist>(`${this.therapistUrl}` + `/therapistOTPVerification`, therapist);
   }

   getTherapistById(id: Number): Observable<Therapist> {
    return this.http.get<Therapist>(this.therapistUrl + '/getTherapistById/' + id);
   }

   resendTherapistOtpById(id: Number): Observable<Therapist> {
    return this.http.get<Therapist>(this.therapistUrl + '/therapistOtpResend/' + id);
   }

   getSubscriptionPlanList(): Observable<any> {
    return this.http.get(this.subscriptionUrl + '/plans-list');
   }

   updateClinicCardInfo(signup: SubscriptionBean): Observable<Object> {
    return this.http.post(`${this.clinicUrl}` + `/saveClinicCardInfo`, signup);
   }

   urlEncrypt(id:string) {
    return CryptoJS.AES.encrypt(id, 'srsecretkey').toString().replace("/" , "!");
   }
   
   urlDecrypt(id:string) {
     var bytes  = CryptoJS.AES.decrypt(id.replace("!" , "/"), 'srsecretkey');
     var id = bytes.toString(CryptoJS.enc.Utf8);
     return id;
    }

    getPaymentDetailsSubscriptionId(id: Number): Observable<SubscriptionBean> {
      return this.http.get<SubscriptionBean>(this.clinicUrl + '/getSubscriberPaymentDetails/' + id);
     }

     getSubscriberIncomletePaymentDetails(id: Number): Observable<SubscriptionBean> {
      return this.http.get<SubscriptionBean>(this.clinicUrl + '/getSubscriberIncomletePaymentDetails/' + id);
     }

     findCouponCode(id: String , subsId:Number) {
      return this.http.get<any>(this.commonUrl + '/searchCouponCode/' + id+"/"+subsId);
    }

    removeCouponCode(subscriptionId:Number) {
      return this.http.get<any>(this.commonUrl + '/removeAppliedCouponCode/'+subscriptionId);
    }
    
    therapistRevokeOTPVerfiy(therapist: Therapist): Observable<Therapist> {
      return this.http.post<Therapist>(`${this.therapistUrl}` + `/therapistRevokeOTPVerification`, therapist);
     }

     updateTherapistLicenseKey( user: object) {
      return this.http.post<any>(this.therapistUrl + '/updateRevokedTherapistLicenseKey/' , user);
    }
   
    setter(subscription: SubscriptionBean) {
        this.subscriptionBean = subscription;
    }

    getter() {
      return this.subscriptionBean;
    }
  

}
