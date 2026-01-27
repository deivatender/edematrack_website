import { Component, OnInit } from '@angular/core';
import { TermsAndCondition } from '../../model/terms-and-condition';
import { WebService } from '../../service/web.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent   implements OnInit {

  termsAndCondition: TermsAndCondition = new TermsAndCondition();
  
  constructor( private webService:WebService) { }
  
  ngOnInit() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.getTermsAndCondition();
    } 

    getTermsAndCondition() {
      this.webService.getTermsAndCondition().subscribe(
          ( termsAndCondition: TermsAndCondition) => this.setTermsAndCondition(termsAndCondition) , 
          (err: any) => {
        }
      );
  }
  
  setTermsAndCondition(termsAndCondition: TermsAndCondition) {
      this.termsAndCondition  = termsAndCondition;
  }
  
}
