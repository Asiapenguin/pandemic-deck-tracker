import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfectionDeckPage } from './infection-deck.page';

const routes: Routes = [
  {
    path: '',
    component: InfectionDeckPage,
  },
  {
    path: 'draw-infection-card-modal',
    loadChildren: () =>
    import('../../pages/draw-infection-card-modal/draw-infection-card-modal.module').then((m) => m.DrawInfectionCardModalPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfectionDeckPageRoutingModule {}
