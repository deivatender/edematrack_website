import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { SubscriptionService } from '../../service/subscription.service';
import { CommonResponse } from '../../model/common-response';
import Swal from 'sweetalert2';
import { AlertPopupService } from '../../service/alert-popup.service';
import { Therapist } from '../../model/therapist';
declare var $;

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css'],
})
export class MeasureComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  form: any = {};
  form1: any = {};
  therapistForm: any = {};
  isLoggedIn = false;
  isLoginFailed = false; 
  errorMessage = '';
  roles: string[] = [];
  clinicUrl: any;
  therapistUrl: any;
  private loginInfo: AuthLoginInfo;
  private t_loginInfo: AuthLoginInfo;
  notificationAlert: any;
  isTLoginFailed = false;
  errorFlag: any;
  subscriptionId: any;
  commonResponse: CommonResponse = new CommonResponse();
  otpLength: number = 6;
  therapistBean: Therapist = new Therapist();
  isCreated: Boolean = false;
  therapistError: Therapist;
  therapist: Therapist = new Therapist();

  constructor(
    private router: Router,
    private authservice: AuthService,
    private subscriptionService: SubscriptionService,
    private tokenStorage: TokenStorageService,
    private popupService: AlertPopupService
  ) {}

  ngOnInit(): void {
    $('#revokedPopupId').hide()
    // alert(this.tokenStorage.getToken());
  }

  onSubmit1() {
    this.isLoginFailed = false;
    this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);
    this.authservice.checkClinicUserIsValid(this.loginInfo).subscribe(
      (data) => {
        this.commonResponse = data;
        if (this.commonResponse.status == 22) {
          this.popupService.warningAlert('Please verify Email Id !', '');
          this.router.navigateByUrl(
            'clinic-otp/' + this.commonResponse.docType
          );
        }
        if (this.commonResponse.status == 19) {
          this.popupService.warningAlert('Please update your payment information !', '');
          this.router.navigateByUrl('payment/' + this.commonResponse.docType);
        }
        if (this.commonResponse.status == 0) {
          this.popupService.errorAlert('Record Not Found !', '');
        }

        if (this.commonResponse.status == 2) {
          this.popupService.warningAlert('Access Denied!', 'Please contact to admin !');
        }

        if (this.commonResponse.status == 20) {
          this.popupService.warningAlert('Plan has been Expired !', 'Please clear your payment.');
        }

        if (this.commonResponse.status == 1) {
          this.clinicAuth(this.loginInfo);
        }
      },
      (error) => {
        if (error.status == 404) {
          this.isLoginFailed = true;
        }
        this.isLoginFailed = false;
      }
    );
  }

  clinicAuth(loginInfo: AuthLoginInfo) {
    this.authservice.clinicAttemptAuth(loginInfo).subscribe(
      (data) => {
        this.clinicLogin(data.message);
      },
      (error) => {
        if (error.status == 404) {
          this.isLoginFailed = true;
          // this.notificationAlert = 'User Record not Found !';
          this.popupService.errorAlert('Record Not Found !', '');
        }
        if (error.status == 406) {
          this.isLoginFailed = true;
          this.notificationAlert = error.error.message;
        } else {
          this.isLoginFailed = true;
          // this.notificationAlert = 'Please Enter Valid Credentials.';
          this.popupService.errorAlert('Please Enter Valid Credentials.', '');
        }
        // this.isLoginFailed = false;
      }
    );
  }

  onSubmit2() {
    this.t_loginInfo = new AuthLoginInfo(
      this.therapistForm.tusername,
      this.therapistForm.tpassword
    );
    this.authservice.checkTherapistUserIsValid(this.t_loginInfo).subscribe(
      (data) => {
        this.commonResponse = data;
        if (this.commonResponse.status == 22) {
          this.popupService.warningAlert('Please verify Email Id !', '');
          this.router.navigateByUrl(
            'therapist-otp/' + this.commonResponse.docType
          );
        }
        if (this.commonResponse.status == 36) {
          this.therapistBean.id=this.commonResponse.docType;
         // this.popupService.warningAlert('Access Denied!', 'You are revoked !');
           this.resend();
          $('#revokedPopupId').show();
          $('#licenseKeyNotFound').hide()
        }
        if (this.commonResponse.status != 1) {
          this.popupService.warningAlert('Something went wrong!', 'Please Contact to admin !');
        }
        if (this.commonResponse.status == 8) {
          this.popupService.warningAlert('Access Denied!', ' Your request to join EdemaTrack is still pending review by your clinic administrator. You will be notified via email when your registration with their clinic is approved and you are subsequently able to log in.!');
        }
        if (this.commonResponse.status == 0) {
          this.popupService.warningAlert('Record Not Found !', '');
        }
        if (this.commonResponse.status == 1) {
          this.therapistAuth(this.t_loginInfo);
        }
      },
      (error) => {
        if (error.status == 404) {
          this.isLoginFailed = true;
        }
        this.isLoginFailed = false;
      }
    );
  }

  therapistAuth(t_loginInfo: AuthLoginInfo) {
    this.isTLoginFailed = false;
    this.authservice.therapistAttemptAuth(t_loginInfo).subscribe(
      (data) => {
        this.therapistLogin(data.message);
      },
      (error) => {
        if (error.status == 404) {
          this.isTLoginFailed = true;
          // this.notificationAlert = 'User Record not Found !';
          this.popupService.errorAlert('Record Not Found !', '');
        }
        if (error.status == 406) {
          this.isTLoginFailed = true;
          this.notificationAlert = error.error.message;
        } else {
          this.isTLoginFailed = true;
          // this.notificationAlert = 'Please Enter Valid Credentials.';
          this.popupService.errorAlert('Please Enter Valid Credentials.', '');
        }
        // this.isTLoginFailed = false;
      }
    );
  }

  clinicLogin(id) {
    this.clinicUrl = window['clinicHome'];
    window.open(this.clinicUrl + 'signin/' + id, '_self');
  }

  therapistLogin(id) {
    this.therapistUrl = window['therapistHome'];
    window.open(this.therapistUrl + 'signin/' + id, '_self');
  }

  backToHome(){
    this.router.navigateByUrl('/home');
  }

  focusOnNextInput(id, id1) {
    var inputValue = $('#' + id1).val().trim();
    var numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(inputValue)) {
      $('#' + id1).val('');
    }
    var nextInput = document.getElementById(id);
    if (nextInput) {
    nextInput.focus( $('#' + id1).select() );
    }
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
    this.therapist.randomOtp = parseInt(otpString);
    this.therapist.id= this.therapistBean.id;
    this.therapistOTPVerfiy(this.therapist);
  }

  therapistOTPVerfiy(therapist: Therapist) {
    this.subscriptionService.therapistRevokeOTPVerfiy(therapist).subscribe(
      (data) => {
        this.therapistBean = data;
        this.isCreated = true;
        this.findLicenseKey();
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

  resend() {
    this.subscriptionService
      .resendTherapistOtpById(this.therapistBean.id)
      .subscribe(
        (data) => {
          this.isCreated = true;
          this.popupService.successAlert('OTP sent successfully !', '');
        },
        (error: any) => {
          console.log(error);
          this.popupService.errorAlert('Please try again !', '');
        }
      );
    }


    findLicenseKey() {
      console.log(this.therapist.licenseKey);
      if (this.therapist.licenseKey != undefined && this.therapist.licenseKey.length > 1) {
        this.subscriptionService
          .onFindKeyword(this.therapist.licenseKey)
          .subscribe( 
            (response) => {
              if (response != null) {
                this.therapist = this.therapistBean;
                this.therapist.clinicId = response.clinicId;
                this.therapist.licenseKey = response.licenseKey;
                this.therapist.licenseKeyId = response.id;
                this.updateTherapistLicenseKey(this.therapist);
              } else {
                this.therapist.clinicId = 0;
                this.therapist.licenseKey = '';
               // this.popupService.warningAlert('License key not found.', '');
                this.popupService.warningAlert('', 'They license key you’ve entered is either incorrect already in use');
              }
            },
            (response) => {
              console.log(response);
            }
          );
      } else {
        this.therapist.licenseKey = '';
      //  this.popupService.warningAlert('License key not found.', '');
        this.popupService.warningAlert('', 'They license key you’ve entered is either incorrect already in use');
      }
    }


    updateTherapistLicenseKey(therapist:Therapist){
       var clinicAlertText = "";
       clinicAlertText = clinicAlertText + "Your request to join "+therapist.subscriptionBean.clinicName+"'s account has been successfully submitted and is pending approval from the clinic administrator in accordance with proper authorization security protocols."
       clinicAlertText = clinicAlertText + "<br><br> In the meantime, please ensure that you've saved your login credentials in a secure location. You will receive an email confirmation once your access has been granted."
       clinicAlertText = clinicAlertText + '<br><br> For any questions, please contact either your clinic administrator or the EdemaTrack team at <u style="color:#007bff;">contact@edematrack.com.</u>'
      if(therapist.clinicId > 0){
            this.subscriptionService.updateTherapistLicenseKey(therapist).subscribe(
              (response) => {
                $('#revokedPopupId').hide();
                $('#licenseKeyNotFound').hide();
                this.backToHome();
                this.popupService.successHTMLAlert('Verified Successfully.', clinicAlertText);
              },
              (response) => {
                console.log(response);
                this.therapistError = response.error;
              }
            );
         }
    }
    

    
  
    
}