import { Component, OnInit } from '@angular/core';
import { SubscriptionBean } from '../all-modules/model/subscription-bean';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '../all-modules/service/subscription.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {


  
  subscriptionBean : SubscriptionBean = new SubscriptionBean();
  homeUrl: any;
  clinicUrl: any;

  constructor(public router: Router ,  private route: ActivatedRoute , private subscriptionService:SubscriptionService) { }

  ngOnInit(): void {
        this.route.paramMap.subscribe( params => {
          const subscriberId = +params.get('id');
          if (subscriberId) {
            this.getSubscriberById(subscriberId);
          }
      });
  }

  getSubscriberById(id: Number) {
        this.subscriptionService.getPaymentDetailsSubscriptionId(id).subscribe(
        (subscription: SubscriptionBean) => this.getSubscriber(subscription) , 
        (err: any) => {
          console.log(err.error);
        }
      );
    }


    getSubscriber(subscription: SubscriptionBean) {
        this.subscriptionService.setter(subscription);
        this.subscriptionBean = this.subscriptionService.getter();
       // this.signIn();
      // this.autoLogin();
    
    }

    downloadInvoice(){
      window.open(this.subscriptionBean.recieptUrl+'' , "_blank");
     this.router.navigateByUrl('/measure');
    }

    signIn(){
      setTimeout(function() {
        this.clinicUrl = window["clinicHome"];
        window.open( this.clinicUrl+"signin/"+this.subscriptionBean.loginKey , "_self");
      }, 10000);
    }

    autoLogin() {
      this.clinicUrl = window["clinicHome"];
      window.open( this.clinicUrl+"signin/"+this.subscriptionBean.loginKey , "_self");
    }
  
      clinicLogin(id){
        this.clinicUrl = window["clinicHome"];
        window.open( this.clinicUrl+"signin/"+id , "_self");
      }

}
