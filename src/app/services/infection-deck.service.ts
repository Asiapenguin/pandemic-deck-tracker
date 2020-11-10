import { Injectable } from "@angular/core";
import cardsJson from "../../data/cards.json";
import {
  DEFAULT_DRAW_NUMBER,
  EPIDEMIC_DRAW_NUMBER,
  FORECAST_DRAW_NUMBER,
  RESILIENT_POPULATION_DRAW_NUMBER,
  SETUP_DRAW_NUMBER,
} from "../constants/pandemic-constants";
import { Card } from "../models/card";
import { CardType } from "../models/cardType";
import { Known } from "../models/known";
import { KnownType } from "../models/knownType";
import { DiscardStatus, KnownStatus, RemoveStatus } from "../models/status";

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

  constructor() {
    this.processData(cardsJson.cards);
  }

  processData(data: any) {
    data.forEach((card: any) => {
      this.cardsInDeck.push(new Card(card.name, card.color, card.connections));
    });
  }

  discardCards(cards: Card[]) {
    for (let card of cards) {
      this.cardsInDeck.map((c) => {
        if (c.name == card.name) {
          c.isDiscarded = true;
          c.isKnown = new Known(false);
        }
      });
    }
  }

  removeCards(cards: Card[]) {
    for (let card of cards) {
      this.cardsInDeck.map((c) => {
        if (c.name == card.name) {
          c.isRemoved = true;
          c.isKnown = new Known(false);
        }
      });
    }
  }

  markCardsAsKnownRandom(cards: Card[]) {
    this.incrementDeckOrder(1);

    for (let card of cards) {
      this.cardsInDeck.map((c) => {
        if (c.name == card.name) {
          card.isKnown = new Known(true, KnownType.RANDOM, 0);
        }
      });
    }
  }

  markCardsAsKnownOrdered(cards: Card[]) {
    let numCards = cards.length;
    this.incrementDeckOrder(numCards);

    for (let i = 0; i < numCards; i++) {
      this.cardsInDeck.map((c) => {
        if (c.name == cards[i].name) {
          cards[i].isKnown = new Known(true, KnownType.ORDERED, i);
        }
      });
    }
  }

  emptyDiscardPile() {
    this.cardsInDeck.forEach((card) => {
      if (!card.isRemoved) {
        card.isDiscarded = false;
      }
    });
  }

  incrementDeckOrder(numTimes: number) {
    this.cardsInDeck
      .filter((card) => card.isKnown.order != null)
      .map((card) => {
        card.isKnown.order = card.isKnown.order + numTimes;
      });
  }

  incrementEpidemicCount() {
    this.epidemicCount++;
  }

  decrementEpidemicCount() {
    this.epidemicCount--;
  }

  reset() {
    this.epidemicCount = 0;

    this.cardsInDeck.map((card) => {
      card.isDiscarded = false;
      card.isKnown = new Known(false);
      card.isRemoved = false;
      card.selectOrder = null;
    });
  }

  setDeck(data: any) {
    let keys = Object.keys(data);
    for (let attr of keys) {
      let statuses = data[attr];
      for (let status of statuses) {
        let card = this.findCardByName(status.name);
        card[attr] = status[attr];
      }
    }
  }

  clearSelectOrder(cards: Card[]) {
    for (let card of cards) {
      this.cardsInDeck.map((c) => {
        if (c.name == card.name) {
          c.selectOrder = null;
        }
      });
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

  getKnownStatus(cards: Card[]): KnownStatus[] {
    let isKnowns: KnownStatus[] = [];
    for (let card of cards) {
      let isKnown = this.cardsInDeck.filter((c) => card.name == c.name).map((c) => c.isKnown)[0];
      isKnowns.push(new KnownStatus(card.name, isKnown));
    }
    return isKnowns;
  }

  getDiscardStatus(cards: Card[]): DiscardStatus[] {
    let isDiscardeds: DiscardStatus[] = [];
    for (let card of cards) {
      let isDiscarded = this.cardsInDeck
        .filter((c) => card.name == c.name)
        .map((c) => c.isDiscarded)[0];
      isDiscardeds.push(new DiscardStatus(card.name, isDiscarded));
    }
    return isDiscardeds;
  }

  getRemoveStatus(cards: Card[]): RemoveStatus[] {
    let isRemoveds: RemoveStatus[] = [];
    for (let card of cards) {
      let isRemoved = this.cardsInDeck
        .filter((c) => card.name == c.name)
        .map((c) => c.isRemoved)[0];
      isRemoveds.push(new RemoveStatus(card.name, isRemoved));
    }
    return isRemoveds;
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
}
