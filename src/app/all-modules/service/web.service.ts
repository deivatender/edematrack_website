import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TermsAndCondition } from '../model/terms-and-condition';
import { PrivacyPolicy } from '../model/privacy-policy';

@Injectable({
  providedIn: 'root'
})
export class WebService {

 
  private termsUrl =window["commonUrlApi"]+'/api/edema/web-termsconditions';
  private ppUrl =window["commonUrlApi"]+'/api/edema/web-privacyPolicy';

  constructor(private http: HttpClient) { }


  getTermsAndCondition (): Observable<TermsAndCondition> {
    return this.http.get<TermsAndCondition>(this.termsUrl + '/webTermsConditions');
  }

  getPrivacyPolicy (): Observable<PrivacyPolicy> {
    return this.http.get<PrivacyPolicy>(this.ppUrl + '/webPrivacyPolicy');
  }

}
