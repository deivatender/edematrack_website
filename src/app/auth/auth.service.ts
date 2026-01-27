import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { UserInfo } from './user-info';
import { CommonBalance } from '@stripe/stripe-js';
import { CommonResponse } from '../all-modules/model/common-response';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tsigninUrl = window["commonUrlApi"]+'/api/edema/t-auth/t-signin-auth';
  private csigninUrl = window["commonUrlApi"]+'/api/edema/c-auth/c-signin-auth';
  private cisUserValid = window["commonUrlApi"]+'/api/edema/c-auth/c-checkUserIsValid';
  private tisUserValid = window["commonUrlApi"]+'/api/edema/t-auth/t-checkUserIsValid';


 

  constructor(private http: HttpClient , private tokenStorage: TokenStorageService , private router: Router) {

  }

  clinicAttemptAuth(credentials: AuthLoginInfo): Observable<any> {
    return this.http.post<any>(this.csigninUrl, credentials, httpOptions);
  }

  therapistAttemptAuth(credentials: AuthLoginInfo): Observable<any> {
    return this.http.post<any>(this.tsigninUrl, credentials, httpOptions);
  }

  checkClinicUserIsValid(credentials: AuthLoginInfo): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(this.cisUserValid, credentials, httpOptions);
  }

  checkTherapistUserIsValid(credentials: AuthLoginInfo): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(this.tisUserValid, credentials, httpOptions);
  }

  rediectPage() {
    this.tokenStorage.signOut();
    this.router.navigateByUrl("/login")
  }

  rediectToAccessDenied() {
     this.router.navigateByUrl("/accessDenied")
   }


}
