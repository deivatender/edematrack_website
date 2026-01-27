import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../all-modules/service/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionBean } from '../all-modules/model/subscription-bean';
import Swal from 'sweetalert2';
import { AlertPopupService } from '../all-modules/service/alert-popup.service';
declare var $;

@Component({
  selector: 'app-clinic-otp',
  templateUrl: './clinic-otp.component.html',
  styleUrls: ['./clinic-otp.component.css'],
})
export class ClinicOtpComponent implements OnInit {


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

  subscriptionBean: SubscriptionBean = new SubscriptionBean();
  signupError: SubscriptionBean;
  isCreated: Boolean = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute,
    private popupService: AlertPopupService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const subsId = +params.get('id');
      if (subsId) {
        this.getSubscriberById(subsId);
      }
    });
  }

  getSubscriberById(id: Number) {
    this.subscriptionService.getSubscriberById(id).subscribe(
      (subscriptionBean: SubscriptionBean) =>
        this.setSubscriberInfo(subscriptionBean),
      (err: any) => {
        console.log(err);
      }
    );
  }

  setSubscriberInfo(subscription: SubscriptionBean) {
    this.subscriptionService.setter(subscription);
    this.subscriptionBean = this.subscriptionService.getter();
    if (this.subscriptionBean.verificationStatus != 22) {
      this.router.navigateByUrl('/measure');
    }
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
     // nextInput.focus();
     nextInput.focus( $('#' + id1).select() );
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
    this.subscriptionBean.randomOtp = parseInt(otpString);
    this.clinicVerfiy(this.subscriptionBean);
  }

  clinicVerfiy(subscription: SubscriptionBean) {
    this.subscriptionService.verifyClinic(subscription).subscribe(
      (data) => {
        this.subscriptionBean = data;
        this.isCreated = true;
        // alert('Verified Successfully.');
        this.popupService.successAlert('Verified Successfully.', '');
        this.router.navigateByUrl('/payment/' + this.subscriptionBean.id);
      },
      (error: any) => {
        this.signupError = error.error;
        console.log(error);
        this.isCreated = false;
        if (error.status === 406) {
          this.isCreated = true;
        }
      }
    );
  }

  resend() {
    this.subscriptionService.otpResendById(this.subscriptionBean.id).subscribe(
      (data) => {
        this.isCreated = true;
        // alert('OTP sent successfully !');
        this.popupService.successAlert('OTP sent successfully !', '');
      },
      (error: any) => {
        console.log(error);
        // alert('please try again !');
        this.popupService.errorAlert('please try again !', '');
      }
    );
  }
}
