import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrawInfectionCardModalPageRoutingModule } from './draw-infection-card-modal-routing.module';

import { DrawInfectionCardModalPage } from './draw-infection-card-modal.page';
import { InfectionCardSelectComponent } from "src/app/components/infection-card-select/infection-card-select.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrawInfectionCardModalPageRoutingModule
  ],
  declarations: [
    DrawInfectionCardModalPage,
    InfectionCardSelectComponent,
  ]
})
export class DrawInfectionCardModalPageModule {}
