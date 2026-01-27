import { Component, OnInit } from '@angular/core';
import { Therapist } from '../all-modules/model/therapist';
import { SubscriptionService } from '../all-modules/service/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionBean } from '../all-modules/model/subscription-bean';
import { AuthLoginInfo } from '../auth/login-info';
import Swal from 'sweetalert2';
import { AlertPopupService } from '../all-modules/service/alert-popup.service';
declare var $;

@Component({
  selector: 'app-therapist-otp',
  templateUrl: './therapist-otp.component.html',
  styleUrls: ['./therapist-otp.component.css'],
})
export class TherapistOtpComponent implements OnInit {

  otpLength: number = 6;

  handlePaste(event: ClipboardEvent, currentIndex: number) {
    event.preventDefault();
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');

    if (pastedText.length === this.otpLength) {
      for (let i = 0; i < this.otpLength; i++) {
        const inputElement = document.getElementById(`digit${i + 1}`) as HTMLInputElement;
        inputElement.value = pastedText[i];
      }
      const currentInputElement = document.getElementById(`digit${currentIndex}`) as HTMLInputElement;
      currentInputElement.focus();
    }
  }

  moveToNext(event: Event, currentIndex: number) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length === 1) {
      if (currentIndex < this.otpLength) {
        const nextInputElement = document.getElementById(`digit${currentIndex + 1}`) as HTMLInputElement;
        nextInputElement.focus();
      }
    } else if (inputElement.value.length === 0 && currentIndex > 1) {
      const prevInputElement = document.getElementById(`digit${currentIndex - 1}`) as HTMLInputElement;
      prevInputElement.focus();
    }
  }
  
  therapistBean: Therapist = new Therapist();
  therapistError: Therapist;
  isCreated: Boolean = false;
  therapistUrl: any;
  private loginInfo: AuthLoginInfo;

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute,
    private popupService: AlertPopupService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const therapistId = +params.get('id');
      if (therapistId) {
        this.getTherapistById(therapistId);
      }
    });
  }

  getTherapistById(id: Number) {
    this.subscriptionService.getTherapistById(id).subscribe(
      (therapist: Therapist) => this.setSubscriberInfo(therapist),
      (err: any) => {
        console.log(err);
      }
    );
  }

  setSubscriberInfo(therapist: Therapist) {
    this.therapistBean = therapist;
    if (this.therapistBean.verificationStatus != 22) {
      this.router.navigateByUrl('/measure');
    }
  }

  onSubmit() {
    var otpString =
      $('#digit1').val() +
      '' +
      $('#digit2').val() +
      '' +
      $('#digit3').val() +
      '' +
      $('#digit4').val() +
      '' +
      $('#digit5').val() +
      '' +
      $('#digit6').val();
    this.therapistBean.randomOtp = parseInt(otpString);
    this.therapistVerfiy(this.therapistBean);
  }

  focusOnNextInput(id, id1) {
    var inputValue = $('#' + id1).val().trim();
    var numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(inputValue)) {
      // $('#' + id1).val(0);
      $('#' + id1).val('');
    }
    var nextInput = document.getElementById(id);
    if (nextInput) {
    //  nextInput.focus();
    nextInput.focus( $('#' + id1).select() );
    }
  }

  therapistVerfiy(therapist: Therapist) {
    var therapistAlertText = "";
    therapistAlertText = therapistAlertText + 'Thank you for verifying your email address and registering with EdemaTrack. Your request to join&nbsp'
    therapistAlertText = therapistAlertText + '<u style="color:#007bff;">'+therapist.subscriptionBean.clinicName+'</u>'
    therapistAlertText = therapistAlertText + "'s account has been successfully submitted and is pending approval from the clinic administrator in accordance with proper authorization security protocols."
    therapistAlertText = therapistAlertText + "<br><br>In the meantime, please ensure that you've saved your login credentials in a secure location. You will receive an email confirmation once your access has been granted."
    therapistAlertText = therapistAlertText + '<br><br>For any questions, please contact either your clinic administrator or the EdemaTrack team at'
    therapistAlertText = therapistAlertText + '<u style="color:#007bff;"> contact@edematrack.com.</u>'
    
    this.subscriptionService.verifyTherapist(therapist).subscribe(
      (data) => {
        this.therapistBean = data;
        this.isCreated = true;
        // alert('Verified Successfully.');
        this.popupService.successHTMLAlert('Verified Successfully.', therapistAlertText);
        this.router.navigateByUrl('/measure');
       // this.autoLogin(this.therapistBean);
      },
      (error: any) => {
        this.therapistError = error.error;
        console.log(error);
        this.isCreated = false;
        if (error.status === 406) {
          this.isCreated = true;
        }
      }
    );
  }

  autoLogin(therapistBean: Therapist) {
    //   console.log(therapistBean.email+"----"+therapistBean.password);
    //   var email = this.subscriptionService.urlEncrypt(therapistBean.email+"");
    //   var password = this.subscriptionService.urlEncrypt(therapistBean.password+"");
    // // alert(this.subscriptionService.urlDecrypt(this.subscriptionService.urlEncrypt(this.therapistForm.password+"").replace("!" , "/")));
    //   var compositeKey = (email+"edema_track+"+password).replace("/" , "!");
    this.therapistLogin(therapistBean.loginKey);
  }

  therapistLogin(id) {
    this.therapistUrl = window['therapistHome'];
    window.open(this.therapistUrl + 'signin/' + id, '_self');
  }

  resend() {
    this.subscriptionService
      .resendTherapistOtpById(this.therapistBean.id)
      .subscribe(
        (data) => {
          this.isCreated = true;
          // alert('OTP sent successfully !');
          this.popupService.successAlert('OTP sent successfully !', '');
        },
        (error: any) => {
          console.log(error);
          // alert('Please try again !');
          this.popupService.errorAlert('Please try again !', '');
        }
      );
  }
}
