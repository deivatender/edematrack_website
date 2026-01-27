import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionPlanRoutingModule } from './subscription-plan-routing.module';
import { PlanComponent } from './plan/plan.component';


@NgModule({
  declarations: [
    PlanComponent
  ],
  imports: [
    CommonModule,
    SubscriptionPlanRoutingModule
  ]
})
export class SubscriptionPlanModule { }
