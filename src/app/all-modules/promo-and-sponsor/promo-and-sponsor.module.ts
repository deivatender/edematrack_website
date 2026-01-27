import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoAndSponsorRoutingModule } from './promo-and-sponsor-routing.module';
import { SponsorComponent } from './sponsor/sponsor.component';

@NgModule({
  declarations: [SponsorComponent],
  imports: [CommonModule, PromoAndSponsorRoutingModule],
})
export class PromoAndSponsorModule {}
