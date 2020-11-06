import { Component, OnInit } from "@angular/core";
import {
  EPIDEMIC_TITLE,
  INFECT_TITLE,
  FORECAST_TITLE,
  RESILIENT_POPULATION_TITLE,
  EPIDEMIC_ICON_NAME,
  INFECT_ICON_NAME,
  FORECAST_ICON_NAME,
  RESILIENT_POPULATION_ICON_NAME,
  SETUP_TITLE,
  SETUP_ICON_NAME,
} from "src/app/constants/pandemic-constants";
import { Card } from "src/app/models/card";
import { CardType } from "src/app/models/cardType";
import { ActionService } from "src/app/services/action.service";
import { InfectionDeckService } from "src/app/services/infection-deck.service";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "app-infection-deck",
  templateUrl: "./infection-deck.page.html",
  styleUrls: ["./infection-deck.page.scss"],
})
export class InfectionDeckPage implements OnInit {
  knownCards: Card[] = [];
  unknownCards: Card[] = [];
  discardedCards: Card[] = [];
  removedCards: Card[] = [];
  epidemicCount: number = 0;

  EPIDEMIC_TITLE = EPIDEMIC_TITLE;
  INFECT_TITLE = INFECT_TITLE;
  FORECAST_TITLE = FORECAST_TITLE;
  RESILIENT_POPULATION_TITLE = RESILIENT_POPULATION_TITLE;
  SETUP_TITLE = SETUP_TITLE;
  EPIDEMIC_ICON_NAME = EPIDEMIC_ICON_NAME;
  INFECT_ICON_NAME = INFECT_ICON_NAME;
  FORECAST_ICON_NAME = FORECAST_ICON_NAME;
  RESILIENT_POPULATION_ICON_NAME = RESILIENT_POPULATION_ICON_NAME;
  SETUP_ICON_NAME = SETUP_ICON_NAME;

  CardType = CardType;

  constructor(
    private infectionDeckService: InfectionDeckService,
    private actionService: ActionService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.updateDeck();
    this.refreshEpidemicCount();
  }

  updateDeck() {
    let that = this;
    this.infectionDeckService.getAllCards().subscribe({
      next(cards) {
        that.knownCards = cards
          .filter((card) => card.isKnown.value == true && card.isDiscarded == false)
          .sort((a, b) => (a.isKnown.order > b.isKnown.order ? 1 : -1));
        that.unknownCards = cards.filter(
          (card) => card.isKnown.value == false && card.isDiscarded == false
        );
        that.discardedCards = cards.filter(
          (card) => card.isDiscarded == true && card.isRemoved == false
        );
        that.removedCards = cards.filter((card) => card.isRemoved == true);
      },
    });
  }

  refreshAll() {
    this.refreshEpidemicCount();
  }

  refreshEpidemicCount() {
    this.epidemicCount = this.infectionDeckService.getEpidemicCount();
  }

  async handleSetup() {
    let modal = await this.modalService.createModal(CardType.SETUP);

    modal.onDidDismiss().then((res) => {
      if (res.data.dismissed) {
        return;
      }

      this.actionService.doSetup(res.data.selectedCards);
    });

    return await modal.present();
  }

  async handleInfect() {
    let modal = await this.modalService.createModal(CardType.INFECT);

    modal.onDidDismiss().then((res) => {
      if (res.data.dismissed) {
        return;
      }

      this.actionService.doInfect(res.data.selectedCards);
    });

    return await modal.present();
  }

  async handleEpidemic() {
    let modal = await this.modalService.createModal(CardType.EPIDEMIC);

    modal.onDidDismiss().then((res) => {
      if (res.data.dismissed) {
        return;
      }

      this.actionService.doEpidemic(res.data.selectedCards);
      this.refreshEpidemicCount();
    });

    return await modal.present();
  }

  async handleForecast() {
    let modal = await this.modalService.createModal(CardType.FORECAST);

    modal.onDidDismiss().then((res) => {
      if (res.data.dismissed) {
        return;
      }

      this.actionService.doForecast(res.data.selectedCards);
    });

    return await modal.present();
  }

  async handleResilientPopulation() {
    let modal = await this.modalService.createModal(CardType.RESILIENT_POPULATION);

    modal.onDidDismiss().then((res) => {
      if (res.data.dismissed) {
        return;
      }

      this.actionService.doResilientPopulation(res.data.selectedCards);
    });

    return await modal.present();
  }
}
