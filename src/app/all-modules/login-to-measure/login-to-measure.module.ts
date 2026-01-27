import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginToMeasureRoutingModule } from './login-to-measure-routing.module';
import { MeasureComponent } from './measure/measure.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MeasureComponent
  ],
  imports: [
    CommonModule,
    LoginToMeasureRoutingModule,
    FormsModule 
  ]
})
export class LoginToMeasureModule { }
