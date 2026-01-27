import { Component, OnInit } from '@angular/core';
import { PrivacyPolicy } from '../../model/privacy-policy';
import { WebService } from '../../service/web.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent   implements OnInit {


  privacyPolicy: PrivacyPolicy = new PrivacyPolicy();
  
  constructor( private webService:WebService) { }
  
  ngOnInit() {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       this.getPrivacyPolicy();
    } 
  
  
  
    getPrivacyPolicy() {
      this.webService.getPrivacyPolicy().subscribe(
          ( privacyPolicy: PrivacyPolicy) => this.setPrivacyPolicy(privacyPolicy) , 
          (err: any) => {
          }
        );
     }
  
    setPrivacyPolicy(privacyPolicy: PrivacyPolicy) {
        this.privacyPolicy  = privacyPolicy;
    }
  
  }
  

