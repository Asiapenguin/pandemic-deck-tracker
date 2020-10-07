import { Injectable, ɵConsole } from "@angular/core";
import cardsJson from "../../data/cards.json";
import {
  DEFAULT_DRAW_NUMBER,
  EPIDEMIC_DRAW_NUMBER,
  FORECAST_DRAW_NUMBER,
  RESILIENT_POPULATION_DRAW_NUMBER,
} from "../constants/pandemic-constants";
import { Card } from "../models/card";
import { CardType } from "../models/cardType";
import { Known } from "../models/known";
import { KnownType } from "../models/knownType";

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
  // Every city infection card in the game
  private allCards: Card[] = [];

  // Every city infection card that we know exists on the top of the infection deck
  private cardsInDeck: Card[] = [];

  private epidemicCount: number = 0;

  constructor() {
    this.processData(cardsJson.cards);
  }

  processData(data: any) {
    data.forEach((card: any) => {
      this.allCards.push(new Card(card.name, card.color, card.connections));
    });

    this.cardsInDeck = this.allCards;
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

    for (let i = 0 ; i < numCards ; i++) {
      this.cardsInDeck.map((c) => {
        if (c.name == cards[i].name) {
          cards[i].isKnown = new Known(true, KnownType.ORDERED, i);
        }
      })
    }
  }

  findCardByName(name: string): Card {
    return this.allCards.find((card) => card.name == name);
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

  newGame() {
    this.epidemicCount = 0;

    this.cardsInDeck.map((card) => {
      card.isDiscarded = false;
      card.isKnown = new Known(false);
      card.isRemoved = false;
      card.selectOrder = null;
    })
  }

  getNumberOfInfects(type: CardType): number {
    switch (type) {
      case CardType.EPIDEMIC:
        return EPIDEMIC_DRAW_NUMBER;
      case CardType.FORECAST:
        return FORECAST_DRAW_NUMBER;
      case CardType.RESILIENT_POPULATION:
        return RESILIENT_POPULATION_DRAW_NUMBER;
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
    return this.allCards;
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
