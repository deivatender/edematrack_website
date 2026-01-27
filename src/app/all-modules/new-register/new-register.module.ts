import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRegisterRoutingModule } from './new-register-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    NewRegisterRoutingModule,
    FormsModule
  ]
})
export class NewRegisterModule { }
