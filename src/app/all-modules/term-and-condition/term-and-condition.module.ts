import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermAndConditionRoutingModule } from './term-and-condition-routing.module';
import { TermsComponent } from './terms/terms.component';


@NgModule({
  declarations: [
    TermsComponent
  ],
  imports: [
    CommonModule,
    TermAndConditionRoutingModule
  ]
})
export class TermAndConditionModule { }
