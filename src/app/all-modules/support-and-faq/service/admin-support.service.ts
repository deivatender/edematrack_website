import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminSupport } from './admin-support';

@Injectable({
  providedIn: 'root'
})
export class AdminSupportService {

    private supportUrl =window["commonUrlApi"]+'/api/edema/wa-support';

    constructor(private http: HttpClient) { }

    // getSupportListByUserId(): Observable<any> {
    //   return this.http.get(this.supportUrl + '/supportListByUserId');
    // }

    createSupport(faq: object): Observable<AdminSupport> {
      return this.http.post<AdminSupport>(`${this.supportUrl}` + `/createWebSupportQuery`, faq);
    }

    getFaqList(): Observable<any> {
      return this.http.get(this.supportUrl + '/web-faq-list');
     }
 
}
