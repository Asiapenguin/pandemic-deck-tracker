import { Injectable } from "@angular/core";
import cardsJson from "../../data/cards.json";
import {
  DEFAULT_DRAW_NUMBER,
  EPIDEMIC_DRAW_NUMBER,
  FORECAST_DRAW_NUMBER,
  RESILIENT_POPULATION_DRAW_NUMBER,
  SETUP_DRAW_NUMBER,
} from "../constants/pandemic-constants";
import { Action } from "../models/action";
import { ActionType } from "../models/actionType";
import { Card } from "../models/card";
import { CardType } from "../models/cardType";
import { Known } from "../models/known";
import { KnownType } from "../models/knownType";
import { ActionService } from "./action.service";

const epidemicCountToInfectNumber = {
  0: 2,
  1: 2,
  2: 2,
  3: 3,
  4: 3,
  5: 4,
  6: 4,
};

@Injectable({
  providedIn: "root",
})
export class InfectionDeckService {
  // Every city infection card that we know exists on the top of the infection deck
  private cardsInDeck: Card[] = [];

  private epidemicCount: number = 0;

  constructor(private actionService: ActionService) {
    this.processData(cardsJson.cards);
  }

  processData(data: any) {
    data.forEach((card: any) => {
      this.cardsInDeck.push(new Card(card.name, card.color, card.connections));
    });
  }

  doInfect(selectedCards: Card[]) {
    let action = new Action(ActionType.INFECT);
    action.oldDeck = this.cardsInDeck;

    this.discardCards(selectedCards);

    action.newDeck = this.cardsInDeck;
    this.actionService.addAction(action);
  }

  doEpidemic(selectedCards: Card[]) {
    let action = new Action(ActionType.EPIDEMIC);
    action.oldDeck = this.cardsInDeck;
    
    this.discardCards(selectedCards)
    let discardedCards = this.getDiscardedCards();
    this.markCardsAsKnownRandom(discardedCards);
    this.emptyDiscardPile();
    this.incrementEpidemicCount();

    action.newDeck = this.cardsInDeck;
    this.actionService.addAction(action);
  }

  doForecast(selectedCards: Card[]) {
    let action = new Action(ActionType.FORECAST);
    action.oldDeck = this.cardsInDeck;

    this.markCardsAsKnownOrdered(selectedCards);

    action.newDeck = this.cardsInDeck;
    this.actionService.addAction(action);
  }

  doResilientPopulation(selectedCards: Card[]) {
    let action = new Action(ActionType.RESILIENT_POPULATION);
    action.oldDeck = this.cardsInDeck;

    this.removeCards(selectedCards);

    action.newDeck = this.cardsInDeck;
    this.actionService.addAction(action);
  }

  newGame() {
    this.epidemicCount = 0;

    this.cardsInDeck.map((card) => {
      card.isDiscarded = false;
      card.isKnown = new Known(false);
      card.isRemoved = false;
      card.selectOrder = null;
    })
  }

  clearSelectOrder(cards: Card[]) {
    for (let card of cards) {
      this.cardsInDeck.map((c) => {
        if (c.name == card.name) {
          c.selectOrder = null;
        }
      })
    }
  }

  findCardByName(name: string): Card {
    return this.cardsInDeck.find((card) => card.name == name);
  }

  getNumberOfInfects(type: CardType): number {
    switch (type) {
      case CardType.EPIDEMIC:
        return EPIDEMIC_DRAW_NUMBER;
      case CardType.FORECAST:
        return FORECAST_DRAW_NUMBER;
      case CardType.RESILIENT_POPULATION:
        return RESILIENT_POPULATION_DRAW_NUMBER;
      case CardType.SETUP:
        return SETUP_DRAW_NUMBER;
      case CardType.INFECT:
        return epidemicCountToInfectNumber[this.epidemicCount];
      default:
        return DEFAULT_DRAW_NUMBER;
    }
  }

  getEpidemicCount(): number {
    return this.epidemicCount;
  }

  getAllCards(): Card[] {
    return this.cardsInDeck;
  }

  getKnownCards(): Card[] {
    return this.cardsInDeck
      .filter((card) => card.isKnown.value == true && card.isDiscarded == false)
      .sort((a, b) => (a.isKnown.order > b.isKnown.order ? 1 : -1));
  }

  getUnknownCards(): Card[] {
    return this.cardsInDeck.filter(
      (card) => card.isKnown.value == false && card.isDiscarded == false
    );
  }

  getCardsInDeck(): Card[] {
    return this.cardsInDeck.filter((card) => card.isDiscarded == false);
  }

  getDiscardedCards(): Card[] {
    return this.cardsInDeck.filter((card) => card.isDiscarded == true && card.isRemoved == false);
  }

  getRemovedCards(): Card[] {
    return this.cardsInDeck.filter((card) => card.isRemoved == true);
  }

  private discardCards(cards: Card[]) {
    let action = new Action(ActionType.DISCARD);
    action.oldDeck = this.cardsInDeck;
    for (let card of cards) {
      this.cardsInDeck.map((c) => {
        if (c.name == card.name) {
          c.isDiscarded = true;
          c.isKnown = new Known(false);
        }
      });
    }
    action.newDeck = this.cardsInDeck;
    this.actionService.addAction(action);
  }

  private removeCards(cards: Card[]) {
    let action = new Action(ActionType.REMOVE);
    action.oldDeck = this.cardsInDeck;
    for (let card of cards) {
      this.cardsInDeck.map((c) => {
        if (c.name == card.name) {
          c.isRemoved = true;
          c.isKnown = new Known(false);
        }
      });
    }
    action.newDeck = this.cardsInDeck;
    this.actionService.addAction(action);
  }

  private markCardsAsKnownRandom(cards: Card[]) {
    this.incrementDeckOrder(1);

    for (let card of cards) {
      this.cardsInDeck.map((c) => {
        if (c.name == card.name) {
          card.isKnown = new Known(true, KnownType.RANDOM, 0);
        }
      });
    }
  }

  private markCardsAsKnownOrdered(cards: Card[]) {
    let numCards = cards.length;
    this.incrementDeckOrder(numCards);

    for (let i = 0 ; i < numCards ; i++) {
      this.cardsInDeck.map((c) => {
        if (c.name == cards[i].name) {
          cards[i].isKnown = new Known(true, KnownType.ORDERED, i);
        }
      })
    }
  }
  
  private emptyDiscardPile() {
    this.cardsInDeck.forEach((card) => {
      if (!card.isRemoved) {
        card.isDiscarded = false;
      }
    });
  }

  private incrementDeckOrder(numTimes: number) {
    this.cardsInDeck
      .filter((card) => card.isKnown.order != null)
      .map((card) => {
        card.isKnown.order = card.isKnown.order + numTimes;
      });
  }

  private incrementEpidemicCount() {
    this.epidemicCount++;
  }
}
