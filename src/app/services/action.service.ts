import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Action } from "../models/action";
import { ActionType } from "../models/actionType";
import { Card } from "../models/card";
import { InfectionDeckService } from "./infection-deck.service";

@Injectable({
  providedIn: "root",
})
export class ActionService {
  private actions: Action[];
  private observableActions: BehaviorSubject<Action[]>;
  private oldDeck: Card[];

  private discardCards: Card[];

  constructor(private infectionDeckService: InfectionDeckService) {
    this.actions = [];
    this.observableActions = new BehaviorSubject<Action[]>([]);

    this.updateDeck();
  }

  updateDeck() {
    let that = this;
    this.infectionDeckService.getAllCards().subscribe({
      next(cards) {
        that.oldDeck = cards;
        that.discardCards = cards.filter(
          (card) => card.isDiscarded == true && card.isRemoved == false
        );
      },
    });
  }

  addAction(action: Action) {
    this.actions.push(action);
    this.observableActions.next(this.actions);
  }

  clearAllActions() {
    this.actions = [];
    this.observableActions.next([]);
  }

  undoLastAction() {
    let lastAction = this.actions.pop();
    this.observableActions.next(this.actions);
    this.infectionDeckService.setDeck(lastAction.oldDeck);
  }

  getActions() {
    return this.observableActions.asObservable();
  }

  doSetup(selectedCards: Card[]) {
    let action = new Action(ActionType.SETUP, this.oldDeck);
    console.log(action.oldDeck);

    this.infectionDeckService.discardCards(selectedCards);

    this.addAction(action);
  }

  doInfect(selectedCards: Card[]) {
    let action = new Action(ActionType.INFECT, this.oldDeck);

    this.infectionDeckService.discardCards(selectedCards);

    this.addAction(action);
  }

  doEpidemic(selectedCards: Card[]) {
    let action = new Action(ActionType.EPIDEMIC, this.oldDeck);

    this.infectionDeckService.discardCards(selectedCards);
    this.infectionDeckService.markCardsAsKnownRandom(this.discardCards);
    this.infectionDeckService.emptyDiscardPile();
    this.infectionDeckService.incrementEpidemicCount();

    this.addAction(action);
  }

  doForecast(selectedCards: Card[]) {
    let action = new Action(ActionType.FORECAST, this.oldDeck);

    this.infectionDeckService.markCardsAsKnownOrdered(selectedCards);

    this.addAction(action);
  }

  doResilientPopulation(selectedCards: Card[]) {
    let action = new Action(ActionType.RESILIENT_POPULATION, this.oldDeck);

    this.infectionDeckService.removeCards(selectedCards);

    this.addAction(action);
  }

  newGame() {
    this.clearAllActions();

    this.infectionDeckService.reset();
  }
}
