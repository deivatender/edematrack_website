import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../auth/user-info';
import { UserService } from '../all-modules/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertPopupService } from '../all-modules/service/alert-popup.service';
declare var $;

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {

  otpLength: number = 6;

 
  userBean: UserInfo = new UserInfo();
  passwordMatchFlag: Boolean = false;
  userError: UserInfo;
  userKey: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private popupService: AlertPopupService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.userKey = id;
  }

  focusOnNextInput(id, id1) {
  //  alert('')
    var inputValue = $('#' + id1).val().trim();
    var numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(inputValue)) {
      // $('#' + id1).val(0);
      $('#' + id1).val('');
    }
    var nextInput = document.getElementById(id);
    if (nextInput) {
      nextInput.focus( $('#' + id1).select());
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
    if (otpString != '') {
      this.userBean.randomOtp = parseInt(otpString);
      this.otpVerify(this.userBean);
    } else {
      // alert('Please Enter valid OTP.');
      this.popupService.warningAlert('Please Enter valid OTP', '');
    }
  }

  otpVerify(userBean: UserInfo) {
    
        this.userService.userOTPVerification(this.userKey, userBean).subscribe(
          (response) => {
           // this.router.navigateByUrl('/measure');
            this.router.navigateByUrl('/update-password/'+this.userKey);
           // this.popupService.successAlert('Thank You !','Password Successfully Update.' );
          },
          (response) => {
            console.log(response);
            this.userError = response.error;
          }
        );
  }

  resend() {
    this.userService.resendUserOtpById(this.userKey).subscribe(
      (data) => {
        this.popupService.successAlert('OTP sent successfully !', '');
      },
      (error: any) => {
        this.popupService.errorAlert('Please try again !', '');
      }
    );
  }

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
}
