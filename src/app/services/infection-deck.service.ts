import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
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
  private deck: Card[] = [];
  private observableDeck: BehaviorSubject<Card[]>;

  private epidemicCount: number = 0;

  constructor() {
    this.processData(cardsJson.cards);
    this.observableDeck = new BehaviorSubject<Card[]>(this.deck);
  }

  processData(data: any) {
    data.forEach((card: any) => {
      this.deck.push(new Card(card.name, card.color, card.connections));
    });
  }

  discardCards(cards: Card[]) {
    for (let card of cards) {
      this.deck.map((c) => {
        if (c.name == card.name) {
          c.isDiscarded = true;
          c.isKnown = new Known(false);
        }
      });
    }
    this.observableDeck.next(this.deck);
  }

  removeCards(cards: Card[]) {
    for (let card of cards) {
      this.deck.map((c) => {
        if (c.name == card.name) {
          c.isRemoved = true;
          c.isKnown = new Known(false);
        }
      });
    }
    this.observableDeck.next(this.deck);
  }

  markCardsAsKnownRandom(cards: Card[]) {
    this.incrementDeckOrder(1);

    for (let card of cards) {
      this.deck.map((c) => {
        if (c.name == card.name) {
          card.isKnown = new Known(true, KnownType.RANDOM, 0);
        }
      });
    }
    this.observableDeck.next(this.deck);
  }

  markCardsAsKnownOrdered(cards: Card[]) {
    let numCards = cards.length;
    this.incrementDeckOrder(numCards);

    for (let i = 0; i < numCards; i++) {
      this.deck.map((c) => {
        if (c.name == cards[i].name) {
          cards[i].isKnown = new Known(true, KnownType.ORDERED, i);
        }
      });
    }
    this.observableDeck.next(this.deck);
  }

  emptyDiscardPile() {
    this.deck.forEach((card) => {
      if (!card.isRemoved) {
        card.isDiscarded = false;
      }
    });
    this.observableDeck.next(this.deck);
  }

  incrementDeckOrder(numTimes: number) {
    this.deck
      .filter((card) => card.isKnown.order != null)
      .map((card) => {
        card.isKnown.order = card.isKnown.order + numTimes;
      });
    this.observableDeck.next(this.deck);
  }

  incrementEpidemicCount() {
    this.epidemicCount++;
  }

  reset() {
    this.epidemicCount = 0;

    this.deck.map((card) => {
      card.isDiscarded = false;
      card.isKnown = new Known(false);
      card.isRemoved = false;
      card.selectOrder = null;
    });

    this.observableDeck.next(this.deck);
  }

  setDeck(cards: Card[]) {
    this.deck = cards;
    this.observableDeck.next(cards);
  }

  clearSelectOrder(cards: Card[]) {
    for (let card of cards) {
      this.deck.map((c) => {
        if (c.name == card.name) {
          c.selectOrder = null;
        }
      });
    }
    this.observableDeck.next(this.deck);  
  }

  findCardByName(name: string): Card {
    return this.deck.find((card) => card.name == name);
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

  getAllCards(): Observable<Card[]> {
    return this.observableDeck.asObservable();
  }

  // getKnownCards(): Card[] {
  //   return this.deck
  //     .filter((card) => card.isKnown.value == true && card.isDiscarded == false)
  //     .sort((a, b) => (a.isKnown.order > b.isKnown.order ? 1 : -1));
  // }

  // getUnknownCards(): Card[] {
  //   return this.deck.filter((card) => card.isKnown.value == false && card.isDiscarded == false);
  // }

  // getCardsInDeck(): Card[] {
  //   return this.deck.filter((card) => card.isDiscarded == false);
  // }

  getDiscardedCards(): Card[] {
    return this.deck.filter((card) => card.isDiscarded == true && card.isRemoved == false);
  }

  // getRemovedCards(): Card[] {
  //   return this.deck.filter((card) => card.isRemoved == true);
  // }
}
