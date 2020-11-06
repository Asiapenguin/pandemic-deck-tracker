import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {
  DEFAULT_TITLE,
  EPIDEMIC_TITLE,
  FORECAST_TITLE,
  INFECT_TITLE,
  RESILIENT_POPULATION_TITLE,
  SETUP_TITLE,
} from "../constants/pandemic-constants";
import { Card } from "../models/card";
import { CardType } from "../models/cardType";
import { DrawInfectionCardModalPage } from "../pages/draw-infection-card-modal/draw-infection-card-modal.page";
import { InfectionDeckService } from "./infection-deck.service";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  private cardsInDeck: Card[];
  private discardedCards: Card[];

  constructor(
    private infectionDeckService: InfectionDeckService,
    private modalController: ModalController
  ) {
    this.updateDeck();
  }

  updateDeck() {
    let that = this;
    this.infectionDeckService.getAllCards().subscribe({
      next(cards) {
        that.cardsInDeck = cards.filter((card) => card.isDiscarded == false);
        that.discardedCards = cards.filter(
          (card) => card.isDiscarded == true && card.isRemoved == false
        );
      },
    });
  }

  async createModal(type: CardType) {
    let cardDistribution: Card[] = [];
    let title: string;

    switch (type) {
      case CardType.EPIDEMIC:
        cardDistribution = this.cardsInDeck;
        title = EPIDEMIC_TITLE;
        break;
      case CardType.FORECAST:
        cardDistribution = this.cardsInDeck;
        title = FORECAST_TITLE;
        break;
      case CardType.INFECT:
        cardDistribution = this.cardsInDeck;
        title = INFECT_TITLE;
        break;
      case CardType.RESILIENT_POPULATION:
        cardDistribution = this.discardedCards;
        title = RESILIENT_POPULATION_TITLE;
        break;
      case CardType.SETUP:
        cardDistribution = this.cardsInDeck;
        title = SETUP_TITLE;
        break;
      default:
        cardDistribution = [];
        title = DEFAULT_TITLE;
    }

    let numCards = this.infectionDeckService.getNumberOfInfects(type);

    return await this.modalController.create({
      component: DrawInfectionCardModalPage,
      componentProps: {
        type: type,
        title: title,
        numCards: numCards,
        cardDistribution: cardDistribution,
      },
    });
  }

  async dismissModal(data: any) {
    this.modalController.dismiss(data);
  }
}
