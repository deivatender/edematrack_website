import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { SubscriptionService } from '../all-modules/service/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { SubscriptionBean } from '../all-modules/model/subscription-bean';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css']
})
export class PaymentFailedComponent implements OnInit {


  private baseUrl = window["baseHome"];
  private baseApiURL = window["commonUrlApi"]+"/api/edema/clinic-subscription";
  subscriptionBean : SubscriptionBean = new SubscriptionBean();
  homeUrl: any;
  ipAddress:any;
  currencyFlag :Boolean=false;
  planType: any;
  showPassword: boolean = false;
  


  individualPriceId = 'price_1P4NGQI2TZC0Xqtuw2xyqgzH'; // Live key 189 INR
  teamPriceId = 'price_1P4NGQI2TZC0XqtuzqOT6uOi'; // Live key 895 INR 
  smallPracticePriceId = 'price_1P4NGQI2TZC0XqtuJUoUkTQw'; // Live key 1690 USD
  largePracticePriceId = 'price_1P4NGQI2TZC0XqtuwQNpdITt'; // Live key 3975 USD
  stripePromise = loadStripe('pk_live_51OFVZfI2TZC0Xqtuih4FFPBPb2qd5V4Bu9kkKl6LrnNq5qbA55ptIGEYdZ4284eooyog380fyQpM5QVdm4kkmEF100FSM3Pnho');

  
//  individualPriceId = 'price_1OkJ5hI2TZC0XqtukGtHbti0'; // C Test key 189 INR
//  teamPriceId = 'price_1OkJ6zI2TZC0Xqtu61HFoojp'; // C Test key 895 INR 
//  smallPracticePriceId = 'price_1OkJ6zI2TZC0XqtujVvdImAr'; // C Test key 1690 USD
//  largePracticePriceId = 'price_1OkJ6zI2TZC0XqtuvJihWIWn'; // C Test key 3975 USD
//  stripePromise = loadStripe('pk_test_51OFVZfI2TZC0XqtuqV7MwvVkC4ozwQWrQJamMPnRyjtISRDcz3OEwTB8T6uP4BiWEjImGkM65wcElQFTBtFYkCsx00zJtczJ9X');


    constructor(private subscriptionService:SubscriptionService ,
      private router:Router  ,  private route: ActivatedRoute ,  
      private authservice: AuthService , private tokenStorage: TokenStorageService , private http: HttpClient) { }

ngOnInit() {
 this.route.paramMap.subscribe( params => {
   const subsId = +params.get('id');
   if (subsId) {
     this.getSubscriberById(subsId);
   }
 });
}

  getSubscriberById(id: Number) {
    this.subscriptionService.getSubscriberIncomletePaymentDetails(id).subscribe(
    (subscription: SubscriptionBean) => this.getSubscriber(subscription) , 
    (err: any) => {
      console.log(err.error);
    }
  );
}


getSubscriber(subscription: SubscriptionBean) {
    this.subscriptionService.setter(subscription);
    this.subscriptionBean = this.subscriptionService.getter();
}

 subscribeNow(id:number){
  // if(id == 1){
  //   this.planCheckout(this.individualPriceId)
  // } else if(id == 2) {
  //  this.planCheckout(this.teamPriceId)
  // } else if(id == 3){
  //  this.planCheckout(this.smallPracticePriceId)
  // } else if(id == 4){
  //  this.planCheckout(this.largePracticePriceId)
  // }
  this.router.navigateByUrl("payment/"+this.subscriptionBean.id);
}

async planCheckout(planPriceId:string): Promise<void> {
 // alert(planPriceId)
  this.checkout(planPriceId);
}

private async checkout(priceId: string): Promise<void> {
  const checkout = {
    priceId: priceId,
    subscriptionId:  this.subscriptionBean.id,
    cancelUrl: this.baseUrl+'payment-failed/'+this.subscriptionBean.id,
    successUrl: this.baseUrl+'payment-success/'+this.subscriptionBean.id,
  };
  const stripe = await this.stripePromise;
  this.http
    .post(`${this.baseApiURL}/saveClinicCardInfo`, checkout)
    .subscribe((data: any) => {
      stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    });
}
  

  userLogin(){
    this.homeUrl = window["home"];
    window.open( this.homeUrl+"login" , "_self");
  }
}
