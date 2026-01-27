import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../auth/user-info';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../all-modules/service/user.service';
import { AlertPopupService } from '../all-modules/service/alert-popup.service';
declare var $;

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  userBean: UserInfo = new UserInfo();
  passwordMatchFlag: Boolean = false;
  userError: UserInfo;
  userKey: any;

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

  onSubmit(){
    if ($('#newPassword').val() != '' && $('#confirmPassword').val() != '') {
      if ($('#newPassword').val() === $('#confirmPassword').val()) {
        this.userBean.password = $('#newPassword').val() + '';
        console.log(this.userBean);
        this.userService.updateUserPassword(this.userKey,  this.userBean).subscribe(
          (response) => {
            this.router.navigateByUrl('/measure');
            this.popupService.successAlert(
              'Thank You !','Password Successfully Update.'
            );
          },
          (response) => {
            console.log(response);
            this.userError = response.error;
          }
        );
      } else {
        this.popupService.warningAlert('Your Password Mismatch.', '');
      }
    } else {
      this.popupService.warningAlert('Please Enter valid password.', '');
    }
  }

}
