import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawInfectionCardModalPage } from './draw-infection-card-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DrawInfectionCardModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrawInfectionCardModalPageRoutingModule {}
