import { Component, OnInit } from '@angular/core';
import { SubscriptionBean } from '../../model/subscription-bean';
import { SubscriptionService } from '../../service/subscription.service';
import { State } from '../../model/state';
import { City } from '../../model/city';
import { Route, Router } from '@angular/router';
import { Therapist } from '../../model/therapist';
import { SubscriptionPlan } from '../../model/subscription-plan';
import Swal from 'sweetalert2';
import { AlertPopupService } from '../../service/alert-popup.service';
declare var $;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;
  visibles: boolean = true;
  changetypes: boolean = true;

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  viewspass() {
    this.visibles = !this.visibles;
    this.changetypes = !this.changetypes;
  }

  subscriptionPlanList: SubscriptionPlan[];
  subscriptionBean: SubscriptionBean = new SubscriptionBean();
  stateList: State[];
  cityList: City[];
  submitted = false;
  signupError: SubscriptionBean;
  isCreated: Boolean = false;
  therapistBean: Therapist = new Therapist();
  therapistError: Therapist;
  isPasswordConfirm: any = false;
  isPasswordConfirm1: any = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    private popupService: AlertPopupService
  ) {}

  ngOnInit() {
    this.subscriptionBean.countryId = 231;
    this.subscriptionBean.stateId = 0;
    this.subscriptionBean.subscriptionPlanId = 0;
    this.subscriptionBean.newsLetterFlag =0;
    this.getStatesList();
    this.getSubscriptionList();
    $('#therapist_mandat').hide();
    $('#clinic_mandat').hide();
  }

  getSubscriptionList() {
    this.subscriptionService.getSubscriptionPlanList().subscribe(
      (data) => {
        this.subscriptionPlanList = data;
      },
      (err: any) => {
        console.log(err.error);
      }
    );
  }

  getStatesList() {
    this.subscriptionService
      .getStatesList(this.subscriptionBean.countryId)
      .subscribe(
        (data) => {
          this.stateList = data;
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  getCityList() {
    this.subscriptionService.getCityList($('#c-stateId').val()).subscribe(
      (data) => {
        this.cityList = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  onSubmit() { 
    this.subscriptionBean.newsLetterFlag =0;
    this.isPasswordConfirm = false;
    if ($('#confirm-userPassword').val() == '' || this.subscriptionBean.userPassword == undefined) {
     // this.popupService.warningAlert('Please fill all mandatory field !', '');
     $('#clinic_mandat').show();
      setTimeout(function() {
        $('#clinic_mandat').hide();
      }, 5000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (this.subscriptionBean.userPassword != $('#confirm-userPassword').val()) {
      this.isPasswordConfirm = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (this.subscriptionBean.subscriptionPlanId == 0) {
      this.popupService.warningAlert('Please choose any plan.', '');
      window.scrollTo({ top: 50, behavior: 'smooth' });
      return;
    }

    if($("#c-termCheck").prop('checked')==false){
      this.popupService.warningAlert('Sorry !', 'Please verify terms and conditions and privacy policy !');
      return;
    }

      // Swal.fire({
      //   title:'Are You Sure?',
      //   text:'Please double-check that the email you’ve entered is correct, as we will send your license keys to that address for you to then distribute to your therapists.',
      //   icon:'warning',
      //   showCancelButton:true ,
      
      //   confirmButtonText:"Yes",
      //   cancelButtonText:"No",
      //   confirmButtonColor: '#3085d6'
      // }).then((result)=>{
      //   if(result.value){
      //       this.save();
      //   } else {
      //      console.log("You canceled!");
      //   }
      // }); 


      var clinicAlertText = "";
      clinicAlertText = clinicAlertText + 'Please double-check that this email :'
      clinicAlertText = clinicAlertText + '<br><br><u style="color:#007bff;">'+this.subscriptionBean.userEmail+'</u>'
      clinicAlertText = clinicAlertText + '<br><br>is correct, as it is needed for us to send you a one- time password (OTP), and for us to send your license keys to that inbox so you can distribute them to your therapists.'
  
      Swal.fire({
        html:clinicAlertText,
        icon:'warning',
        showCancelButton:true ,
        focusCancel:true,
        confirmButtonText:"Yes",
        cancelButtonText:"No",
        confirmButtonColor: '#3085d6',
        customClass: {
          cancelButton: 'order-1',
          confirmButton: 'order-2',
        },
      }).then((result)=>{
        if(result.value){
            this.save();
        } else {
           console.log("You canceled!");
        }
      }); 
    
  }

  topScroll(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  save() {
    if($("#c-news-letter").prop('checked')==true){
      this.subscriptionBean.newsLetterFlag =1;
    }
    this.subscriptionService.signUpCreation(this.subscriptionBean).subscribe(
      (data) => {
        this.subscriptionBean = data as SubscriptionBean;
        this.router.navigateByUrl('/clinic-otp/' + this.subscriptionBean.id);
        this.isCreated = true;
      },
      (error: any) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.signupError = error.error;
        console.log(this.signupError.status);
        this.isCreated = false;
        if (error.status === 406) {
          this.isCreated = true;
        }
      }
    );
  }

  setPlan(planId: number) {
    this.subscriptionBean.subscriptionPlanId = planId;
  }

  therapistSubmit() {
    this.isPasswordConfirm1 = false;
    if ($('#confirmpassword').val() == '' || this.therapistBean.password == undefined) {
      //this.popupService.warningAlert('Please fill all mandatory field !', '');
      $('#therapist_mandat').show();
      setTimeout(function() {
        $('#therapist_mandat').hide();
      }, 5000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (this.therapistBean.clinicId == 0 || this.therapistBean.clinicId == undefined) {
     // this.popupService.warningAlert('Please fill all mandatory field !', '');
     $('#therapist_mandat').show();
     setTimeout(function() {
       $('#therapist_mandat').hide();
     }, 5000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if ($('#confirmpassword').val() == '' || this.therapistBean.password == undefined) {
      return;
    }
    if (this.therapistBean.password != $('#confirmpassword').val()) {
      this.isPasswordConfirm1 = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if($("#t-termCheck").prop('checked')==false){
      this.popupService.warningAlert('Sorry !', 'Please verify terms and conditions and privacy policy !');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }


      var therapistAlertText = "";
      therapistAlertText = therapistAlertText + 'Please double-check that this email :'
      therapistAlertText = therapistAlertText + '<br><br><u style="color:#007bff;">'+this.therapistBean.email+'</u>'
      therapistAlertText = therapistAlertText + '<br><br>is correct, so we can send you a one- time password (OTP).'
  

    Swal.fire({
     // title:'Are you sure entered email and phone number details are correct ?',
    //  text:'Are you sure entered email and phone number details are correct ?',
       html:therapistAlertText,
      icon:'warning',
      showCancelButton:true ,
      focusCancel:true,
      confirmButtonText:"Yes",
      cancelButtonText:"No",
      confirmButtonColor: '#3085d6',
      customClass: {
        cancelButton: 'order-1',
        confirmButton: 'order-2',
      },
    }).then((result)=>{
      if(result.value){
        this.subscriptionService.therapistCreation(this.therapistBean).subscribe(
          (data) => {
            this.therapistBean = data as Therapist;
            this.router.navigateByUrl('/therapist-otp/' + this.therapistBean.id);
            this.isCreated = true;
          },
          (error: any) => {
            this.therapistError = error.error;
            console.log(this.therapistError.status);
            this.isCreated = false;
            if (error.status === 406) {
              this.isCreated = true;
            }
          }
        );
      } else {
         console.log("You canceled!");
      }
    }); 

   
  }

  mobileNumberFormat(id: String) {
    var numericInput = $('#' + id)
      .val()
      .replace(/\D/g, '');
    var formattedNumber = numericInput.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3'
    );
    $('#' + id).val(formattedNumber);
  }

  findLicenseKey(id: String) {
    if (this.therapistBean.licenseKey.length > 1) {
      this.subscriptionService
        .onFindKeyword(this.therapistBean.licenseKey)
        .subscribe( 
          (response) => {
            if (response != null) {
              this.therapistBean.clinicId = response.clinicId;
              this.therapistBean.licenseKey = response.licenseKey;
              this.therapistBean.licenseKeyId = response.id;
              $('#' + id).attr('readonly', true);
              // alert('License key found.');
              this.popupService.successAlert(''  , 'License Key Valid');
              $('#t-address').val(response.subscriptionBean.address);
              $('#t-city').val(response.subscriptionBean.cityName);
              $('#t-state').val(response.subscriptionBean.stateBean.stateName);
              $('#t-zipcode').val(response.subscriptionBean.zipCode);
            } else {
              this.therapistBean.clinicId = 0;
              this.therapistBean.licenseKey = '';
              // alert('License key not found.');
              this.popupService.warningAlert('', 'They license key you’ve entered is either incorrect already in use');
            }
          },
          (response) => {
            console.log(response);
          }
        );
    } else {
      this.therapistBean.licenseKey = '';
      // alert('License key not found.');
     // this.popupService.warningAlert('License key not found.', '');
     this.popupService.warningAlert('', 'They license key you’ve entered is either incorrect already in use');
    }
  }


  einNumberFormat(id: String) {
    var numericInput = $('#' + id).val().replace(/\D/g, '');
    var formattedNumber = numericInput.replace(
      /(\d{2})(\d{7})/,
      '$1-$2'
    );
    $('#' + id).val(formattedNumber);
  }

  zipCodeNumberFormat(id: String){
    var numericInput = $('#' + id).val().replace(/\D/g, '');
    var formattedNumber = numericInput.replace(
      /(\d{5})/,
      '$1'
    );
    $('#' + id).val(formattedNumber);
  }

}
