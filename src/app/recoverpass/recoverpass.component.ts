import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../all-modules/service/user.service';
import Swal from 'sweetalert2';
import { AlertPopupService } from '../all-modules/service/alert-popup.service';
declare var $;

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.component.html',
  styleUrls: ['./recoverpass.component.css'],
})
export class RecoverpassComponent implements OnInit {
  userType: any;
  passwordMatchFlag: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private popupService: AlertPopupService
  ) {}

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // this.userType=id;
    // if(( this.userType != 'clinic') && ( this.userType != 'therapist')){
    //   this.router.navigateByUrl('/error404');
    // }
  }

  verifyAndGenerateOTP(id: String) {
    this.userService.verifyUserByKeyword($('#' + id).val()).subscribe(
      (response) => {
        if (response != null) {
          this.router.navigateByUrl('/otp/' + response.userEncryptedKey);
        } else {
          // alert("Number not found.");
          this.popupService.errorAlert('Please try again !', '');
        }
      },
      (response) => {
        console.log(response);
      }
    );
  }
}
