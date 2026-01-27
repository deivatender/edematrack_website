import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { PolicyComponent } from './policy/policy.component';


@NgModule({
  declarations: [
    PolicyComponent
  ],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule
  ]
})
export class PrivacyPolicyModule { }
