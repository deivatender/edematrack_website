import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutsRoutingModule } from './abouts-routing.module';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutsRoutingModule
  ]
})
export class AboutsModule { }
