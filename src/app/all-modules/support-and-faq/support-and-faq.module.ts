import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportAndFaqRoutingModule } from './support-and-faq-routing.module';
import { SupportComponent } from './support/support.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    CommonModule,
    SupportAndFaqRoutingModule ,
    FormsModule
  ]
})
export class SupportAndFaqModule { }
