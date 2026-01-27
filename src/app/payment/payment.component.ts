import { Component, OnInit } from '@angular/core';
import { SubscriptionBean } from '../all-modules/model/subscription-bean';
import { SubscriptionService } from '../all-modules/service/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginInfo } from '../auth/login-info';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { AlertPopupService } from '../all-modules/service/alert-popup.service';
import { SubscriptionPlan } from '../all-modules/model/subscription-plan';
declare var $;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent   implements OnInit {

  subscriptionPlanList: SubscriptionPlan[];
  private baseUrl = window["baseHome"];
  private baseApiURL = window["commonUrlApi"]+"/api/edema/clinic-subscription";
  subscriptionBean: SubscriptionBean = new SubscriptionBean();
  signupError: SubscriptionBean;
  isCreated: Boolean = false;
  therapistForm: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  clinicUrl: any;
  therapistUrl: any;
  private loginInfo: AuthLoginInfo;
    
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
             private http: HttpClient ,
             private popupService: AlertPopupService
             ) { }

  ngOnInit() {
        this.route.paramMap.subscribe( params => {
          const subsId = +params.get('id');
          if (subsId) {
            this.getSubscriberById(subsId);
          }
        });
    }

      getSubscriberById(id: Number){
        this.subscriptionService.getSubscriberById(id).subscribe(
          ( subscriptionBean: SubscriptionBean) => this.setSubscriberInfo(subscriptionBean) , 
          (err: any) => {
            console.log(err);
          }
        );
    }

    setSubscriberInfo(subscription: SubscriptionBean){
      this.subscriptionService.setter(subscription);
      this.subscriptionBean = this.subscriptionService.getter();
      //alert( this.subscriptionBean.isCouponCodeApply==0);
      if( this.subscriptionBean.isCouponCodeApply == 1){
        $('#couponCode').attr('readonly', true);
      } else {
       // this.subscriptionBean.couponCode
      }
      if( this.subscriptionBean.verificationStatus != 23 && this.subscriptionBean.verificationStatus == 18){
        this.router.navigateByUrl('/measure');
      } 

      if( this.subscriptionBean.verificationStatus == 22){
        this.router.navigateByUrl('/clinic-otp/'+this.subscriptionBean.id);
      } 

      this.getSubscriptionList();
    }

    getSubscriptionList() {
      this.subscriptionService.getSubscriptionPlanList().subscribe(
        (data) => {
          this.subscriptionPlanList = data;
          console.log( this.subscriptionPlanList);
        },
        (err: any) => {
          console.log(err.error);
        }
      );
    }

    cardNumberFormatting(id:String){
      var numericInput = $("#"+id).val().replace(/\D/g, '');
      var formattedNumber = numericInput.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
      $("#"+id).val(formattedNumber);
    }

    cardExpireFormatting(id:String){
      var numericInput = $("#"+id).val().replace(/\D/g, '');
      var formattedNumber = numericInput.replace(/(\d{2})(\d{2})/, '$1/$2');
      $("#"+id).val(formattedNumber);
    }

    onSubmit(){
        this.save();
    }

    save() {
      this.subscriptionService.updateClinicCardInfo(this.subscriptionBean)
            .subscribe(data => {
            this.subscriptionBean = data as SubscriptionBean;
            this.isCreated = true;
            },(error: any) => {
            this.signupError = error.error;
            console.log( this.signupError );
            this.isCreated = false;
            if (error.status === 406) {
              this.isCreated = true;
            }
      });
  }

  autoLogin(subscriptionBean:SubscriptionBean) {
    var email = this.subscriptionService.urlEncrypt(subscriptionBean.userEmail+"");
    var password = this.subscriptionService.urlEncrypt(subscriptionBean.userPassword+"");
  // alert(this.subscriptionService.urlDecrypt(this.subscriptionService.urlEncrypt(this.therapistForm.password+"").replace("!" , "/")));
    var compositeKey = (email+"edema_track+"+password).replace("/" , "!");
    this.clinicLogin(compositeKey);
  }

    clinicLogin(id){
      this.clinicUrl = window["clinicHome"];
      window.open( this.clinicUrl+"signin/"+id , "_self");
    }

    subscribeNow(id:number){
      if(id == 1){
        this.planCheckout(this.individualPriceId)
      } else if(id == 2) {
       this.planCheckout(this.teamPriceId)
      } else if(id == 3){
       this.planCheckout(this.smallPracticePriceId)
      } else if(id == 4){
       this.planCheckout(this.largePracticePriceId)
      }
    }

    async planCheckout(planPriceId:string): Promise<void> {
      this.checkout(planPriceId);
    }

    private async checkout(priceId: string): Promise<void> {
      const checkout = {
        priceId: priceId,
        subscriptionId:  this.subscriptionBean.id,
        cancelUrl: this.baseUrl+'payment-failed/'+this.subscriptionBean.id,
        successUrl: this.baseUrl+'payment-success/'+this.subscriptionBean.id,
        planId:this.subscriptionBean.subscriptionPlanId
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

    applyCouponCode(){
        if (this.subscriptionBean.couponCode.length > 3) {
          this.subscriptionService
            .findCouponCode(this.subscriptionBean.couponCode ,   this.subscriptionBean.id)
            .subscribe(
              (response) => {
                if (response != null) {
                  $('#couponCode').attr('readonly', true);
                  this.subscriptionBean.couponBean = response;
                  this.subscriptionBean.isCouponCodeApply = 1;
                  this.popupService.warningAlert('Coupon Code Applied Successfully.', '');
                } else {
                  this.subscriptionBean.couponCode = '';
                  this.popupService.warningAlert('Coupon Code Not Applied.', '');
                }
              },
              (response) => {
                console.log(response);
              }
            );
        } else {
          this.subscriptionBean.couponCode = '';
          this.popupService.warningAlert('Please enter valid coupon code.', '');
        }
    }

    removeCouponCode(){
          this.subscriptionService
          .removeCouponCode( this.subscriptionBean.id)
          .subscribe(
            (response) => {
              if (response > 0) {
                window.location.reload();
              } 
            },
            (response) => {
              console.log(response);
              this.popupService.warningAlert('Please Try Again !', 'Coupon Code Not Remove.');
            }
          );
    }

    changePlan(planList:SubscriptionPlan){
      this.subscriptionBean.subscriptionPlanId=planList.id;
      this.subscriptionBean.subscriptionPlanBean=planList;
    }

  }
