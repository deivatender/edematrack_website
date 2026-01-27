import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionPlan } from '../../model/subscription-plan';
import { SubscriptionService } from '../../service/subscription.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {
  subscriptionPlanList: SubscriptionPlan[];
  isCancel: Boolean = false;
  isCreated: Boolean = false;

  constructor(
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.getSubscriptionList();
  }

  getSubscriptionList() {
    this.subscriptionService.getSubscriptionPlanList().subscribe(
      (data) => {
        this.subscriptionPlanList = data;
      },
      (err: any) => {
        console.log(err.error);
      }
    );
  }
}
