import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllModulesComponent } from './all-modules.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '',
    component: AllModulesComponent,
    children: [
      {
        path: 'about',
        loadChildren: () =>
          import('./abouts/abouts.module').then((m) => m.AboutsModule),
      },

      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },

      {
        path: 'register',
        loadChildren: () =>
          import('./new-register/new-register.module').then(
            (m) => m.NewRegisterModule
          ),
      },

      {
        path: 'measure',
        loadChildren: () =>
          import('./login-to-measure/login-to-measure.module').then(
            (m) => m.LoginToMeasureModule
          ),
      },

      {
        path: 'sponsor',
        loadChildren: () =>
          import('./promo-and-sponsor/promo-and-sponsor.module').then(
            (m) => m.PromoAndSponsorModule
          ),
      },

      {
        path: 'policy',
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyModule
          ),
      },

      {
        path: 'term',
        loadChildren: () =>
          import('./term-and-condition/term-and-condition.module').then(
            (m) => m.TermAndConditionModule
          ),
      },

      {
        path: 'plan',
        loadChildren: () =>
          import('./subscription-plan/subscription-plan.module').then(
            (m) => m.SubscriptionPlanModule
          ),
      },

      {
        path: 'faq',
        loadChildren: () =>
          import('./support-and-faq/support-and-faq.module').then(
            (m) => m.SupportAndFaqModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllModulesRoutingModule {}
