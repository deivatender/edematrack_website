import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsComponent } from './terms/terms.component';
const routes: Routes = [
  { path: '', component: TermsComponent },
  { path: 'term', component: TermsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermAndConditionRoutingModule {}
