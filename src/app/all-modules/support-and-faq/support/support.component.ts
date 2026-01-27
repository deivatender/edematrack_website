import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminSupport } from '../service/admin-support';
import { Router } from '@angular/router';
import { AdminSupportService } from '../service/admin-support.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertPopupService } from '../../service/alert-popup.service';
import { FAQ } from '../service/faq';
declare var $;
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent  implements OnInit {

  adminSupportList: AdminSupport[];
  isCancel: Boolean = false;
  isCreated: Boolean = false;
  adminSupport: AdminSupport = new AdminSupport();
  submitted = false;
  adminSupportError: AdminSupport;
  faqList: FAQ[];

  constructor(private router:Router , private adminSupportService: AdminSupportService ,
                                      private authService: AuthService ,
                                      private popupService: AlertPopupService ) { }

  ngOnInit(): void {
       this.getFaqList();
    }

    getFaqList(){
      this.adminSupportService.getFaqList().subscribe(data => {
        this.faqList = data;
        console.log(this.faqList);
      } , (err: any) => {
        console.log(err.error);
      });
  }

  
    onSubmit() {
      this.submitted = true;
      this.save();
    }


     save() {
       this.adminSupport.userType=3;
       this.adminSupportService.createSupport(this.adminSupport)
       .subscribe(data => {
              this.isCreated = true;
              this.popupService.successAlert('Thank you', 'Your query successfully sent.');
              this.newSupport();
             } , (error: any) => {
            if ( error.status === 401) {
              this.authService.rediectPage();
            }
            console.log(error.error);
           // this.popupService.errorAlert('Error', 'Please Try again after some time');
            this.adminSupportError = error.error;
            this.isCreated = false;
            if (error.status === 406) {
                this.isCreated = true;
            }
       });
     }

     newSupport(){
       this.adminSupport = new AdminSupport;
       this.adminSupport.id=0;
       this.adminSupportError = new AdminSupport;
     }

}
