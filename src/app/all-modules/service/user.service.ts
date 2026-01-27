import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/auth/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private commonUrl =window["commonUrlApi"]+'/api/edema/common';

  constructor(private http: HttpClient) { }


  verifyUserByKeyword(searchKey: String) {
    return this.http.get<any>(this.commonUrl + '/userVerification/' + searchKey);
   }

   userOTPVerification(id: String , user: object) {
    return this.http.put<any>(this.commonUrl + '/userOTPVerification/' + id , user);
  }

  resendUserOtpById(id: String): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.commonUrl + '/userOtpResend/' + id);
   }

   updateUserPassword(id: String , user: object) {
    return this.http.put<any>(this.commonUrl + '/changeUserPassword/' + id , user);
  }

}
