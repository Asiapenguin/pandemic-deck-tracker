import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfectionDeckPageRoutingModule } from './infection-deck-routing.module';

import { InfectionDeckPage } from './infection-deck.page';
import { InfectionCardComponent } from "src/app/components/infection-card/infection-card.component";
import { ButtonComponent } from "src/app/components/button/button.component";
import { InfectionCardRandomComponent } from "src/app/components/infection-card-random/infection-card-random.component";
import { KnownInfectionDeckComponent } from "src/app/components/known-infection-deck/known-infection-deck.component";
import { UnknownInfectionDeckComponent } from "../unknown-infection-deck/unknown-infection-deck.component";
import { DiscardedDeckComponent } from "../discarded-deck/discarded-deck.component";
import { RemovedDeckComponent } from "../removed-deck/removed-deck.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfectionDeckPageRoutingModule
  ],
  declarations: [
    ButtonComponent,
    InfectionCardComponent,
    InfectionCardRandomComponent,
    InfectionDeckPage,
    KnownInfectionDeckComponent,
    UnknownInfectionDeckComponent,
    DiscardedDeckComponent,
    RemovedDeckComponent
  ]
})
export class InfectionDeckPageModule {}
