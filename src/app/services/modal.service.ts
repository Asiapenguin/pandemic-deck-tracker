import { Injectable } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { DEFAULT_TITLE, EPIDEMIC_TITLE, FORECAST_TITLE, INFECT_TITLE, RESILIENT_POPULATION_TITLE } from "../constants/pandemic-constants";
import { Card } from "../models/card";
import { CardType } from "../models/cardType";
import { DrawInfectionCardModalPage } from "../pages/draw-infection-card-modal/draw-infection-card-modal.page";
import { InfectionDeckService } from "./infection-deck.service";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private infectionDeckService: InfectionDeckService, private modalController: ModalController) { }

  async createModal(type: CardType) {
    let cardDistribution: Card[] = [];
    let title: string;
    
    switch (type) {
      case CardType.EPIDEMIC:
        cardDistribution = this.infectionDeckService.getCardsInDeck();
        title = EPIDEMIC_TITLE;
        break;
      case CardType.FORECAST:
        cardDistribution = this.infectionDeckService.getCardsInDeck();
        title = FORECAST_TITLE;
        break;
      case CardType.INFECT:
        cardDistribution = this.infectionDeckService.getCardsInDeck();
        title = INFECT_TITLE;
        break;
      case CardType.RESILIENT_POPULATION:
        cardDistribution = this.infectionDeckService.getDiscardedCards();
        title = RESILIENT_POPULATION_TITLE;
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
