import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
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

  constructor(private infectionDeckService: InfectionDeckService) {
    this.actions = [];
    this.observableActions = new BehaviorSubject<Action[]>(Object.assign([]));
  }

  addAction(action: Action) {
    this.actions.push(action);
    this.observableActions.next(Object.assign([], this.actions));
  }

  clearAllActions() {
    this.actions = [];
    this.observableActions.next(Object.assign([], this.actions));
  }

  undoLastAction() {
    let lastAction = this.actions.pop();
    this.observableActions.next(Object.assign([], this.actions));
    this.infectionDeckService.setDeck(lastAction.oldDeck);
  }

  getActions() {
    return this.observableActions.asObservable();
  }

  doSetup(selectedCards: Card[]) {
    let action = new Action(ActionType.SETUP, this.infectionDeckService.getAllCards());
    this.addAction(action);

    this.infectionDeckService.discardCards(selectedCards);
  }

  doInfect(selectedCards: Card[]) {
    let action = new Action(ActionType.INFECT, selectedCards);
    this.addAction(action);

    this.infectionDeckService.discardCards(selectedCards);
  }

  doEpidemic(selectedCards: Card[]) {
    let action = new Action(ActionType.EPIDEMIC, this.infectionDeckService.getAllCards());
    this.addAction(action);
    
    this.infectionDeckService.discardCards(selectedCards)
    let discardedCards = this.infectionDeckService.getDiscardedCards();
    this.infectionDeckService.markCardsAsKnownRandom(discardedCards);
    this.infectionDeckService.emptyDiscardPile();
    this.infectionDeckService.incrementEpidemicCount();
  }

  doForecast(selectedCards: Card[]) {
    let action = new Action(ActionType.FORECAST, this.infectionDeckService.getAllCards());
    this.addAction(action);

    this.infectionDeckService.markCardsAsKnownOrdered(selectedCards);
  }

  doResilientPopulation(selectedCards: Card[]) {
    let action = new Action(ActionType.RESILIENT_POPULATION, this.infectionDeckService.getAllCards());
    this.addAction(action);
    
    this.infectionDeckService.removeCards(selectedCards);
  }

  newGame() {
    this.clearAllActions();

    this.infectionDeckService.reset();
  }
}
