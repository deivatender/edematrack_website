import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecoverpassComponent } from './recoverpass/recoverpass.component';
import { OtpComponent } from './otp/otp.component';
import { CreatepassComponent } from './createpass/createpass.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { TherapistOtpComponent } from './therapist-otp/therapist-otp.component';
import { ClinicOtpComponent } from './clinic-otp/clinic-otp.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { Error404Component } from './error404/error404.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(`./all-modules/all-modules.module`).then(
        (m) => m.AllModulesModule
      ),
  },

  // { path: "error-500", component: Error500Component },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'createpass', component: CreatepassComponent },
  { path: 'payment/:id', component: PaymentComponent },
  { path: 'payment-success/:id', component: SuccessComponent },
  { path: 'payment-failed/:id', component: PaymentFailedComponent },
  { path: 'therapist-otp/:id', component: TherapistOtpComponent },
  { path: 'clinic-otp/:id', component: ClinicOtpComponent },
  { path: 'recovers', component: RecoverpassComponent },
  { path: 'otp/:id', component: OtpComponent },
  { path: 'update-password/:id', component: UpdatePasswordComponent },
  { path: "error404", component: Error404Component },
  { path: "**", component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
