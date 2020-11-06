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
import { Action } from "src/app/models/action";
import { Card } from "src/app/models/card";
import { CardType } from "src/app/models/cardType";
import { InfectionDeckService } from "src/app/services/infection-deck.service";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "app-infection-deck",
  templateUrl: "./infection-deck.page.html",
  styleUrls: ["./infection-deck.page.scss"],
})
export class InfectionDeckPage implements OnInit {
  title = "Deck Tracker";

  activeTabOne = "unknown";
  activeTabTwo = "discarded";

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
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.refreshCards();
    this.refreshEpidemicCount();
  }

  refreshCards() {
    this.knownCards = this.infectionDeckService.getKnownCards();
    this.unknownCards = this.infectionDeckService.getUnknownCards();
    this.discardedCards = this.infectionDeckService.getDiscardedCards();
    this.removedCards = this.infectionDeckService.getRemovedCards();
  }

  refreshEpidemicCount() {
    this.epidemicCount = this.infectionDeckService.getEpidemicCount();
  }

  changeTabOne(event: any) {
    this.activeTabOne = event.target.value;
  }

  changeTabTwo(event: any) {
    this.activeTabTwo = event.target.value;
  }

  async handleSetup() {
    let modal = await this.modalService.createModal(CardType.SETUP);

    modal.onDidDismiss().then((_) => {
      this.refreshCards();
    });

    return await modal.present();
  }

  async handleInfect() {
    let modal = await this.modalService.createModal(CardType.INFECT);

    modal.onDidDismiss().then((res) => {
      if (res.data.dismissed) {
        return;
      }

      this.infectionDeckService.doInfect(res.data.selectedCards);
      this.refreshCards();
    });

    return await modal.present();
  }

  async handleEpidemic() {
    let modal = await this.modalService.createModal(CardType.EPIDEMIC);

    modal.onDidDismiss().then((res) => {
      if (res.data.dismissed) {
        return;
      }
      
      this.infectionDeckService.doEpidemic(res.data.selectedCards);
      
      this.discardedCards = this.infectionDeckService.getDiscardedCards();
      this.knownCards = this.infectionDeckService.getKnownCards();
      this.refreshCards();
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
      
      this.infectionDeckService.doForecast(res.data.selectedCards);
      this.refreshCards();
    });

    return await modal.present();
  }

  async handleResilientPopulation() {
    let modal = await this.modalService.createModal(CardType.RESILIENT_POPULATION);

    modal.onDidDismiss().then((res) => {
      if (res.data.dismissed) {
        return;
      }

      this.infectionDeckService.doResilientPopulation(res.data.selectedCards);
      this.refreshCards();
    });

    return await modal.present();
  }

  handleNewGame() {
    this.infectionDeckService.newGame();
    this.refreshCards();
    this.refreshEpidemicCount();
  }
}
