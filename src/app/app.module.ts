import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RecoverpassComponent } from './recoverpass/recoverpass.component';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { CreatepassComponent } from './createpass/createpass.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { TherapistOtpComponent } from './therapist-otp/therapist-otp.component';
import { ClinicOtpComponent } from './clinic-otp/clinic-otp.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { Error404Component } from './error404/error404.component';
import { LoaderComponent } from './loader/loader.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverpassComponent,
    SignupComponent,
    OtpComponent,
    CreatepassComponent,
    PaymentComponent,
    SuccessComponent,
    TherapistOtpComponent,
    ClinicOtpComponent,
    PaymentFailedComponent,
    Error404Component,
    LoaderComponent,
    UpdatePasswordComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DatePipe,
    ReactiveFormsModule,
    NgHttpLoaderModule.forRoot() ,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
