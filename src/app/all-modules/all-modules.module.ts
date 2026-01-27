import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllModulesRoutingModule } from './all-modules-routing.module';
import { AllModulesComponent } from './all-modules.component';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [AllModulesComponent, HeaderComponent, FooterComponent ],
  imports: [
    CommonModule, 
    AllModulesRoutingModule,
     HttpClientModule , 
     FormsModule,
     ReactiveFormsModule
  ],
})
export class AllModulesModule {}
