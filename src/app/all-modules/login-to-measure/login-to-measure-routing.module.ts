import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MeasureComponent } from './measure/measure.component';

const routes: Routes = [
  { path: '', component: MeasureComponent },
  { path: 'measure', component: MeasureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginToMeasureRoutingModule {}
