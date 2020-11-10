import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Action } from "../models/action";
import { ActionType } from "../models/actionType";
import { Card } from "../models/card";
import { ToastType } from "../models/toastType";
import { InfectionDeckService } from "./infection-deck.service";
import { ToastService } from "./toast.service";

@Injectable({
  providedIn: "root",
})
export class ActionService {
  private actions: Action[];
  private observableActions: BehaviorSubject<Action[]>;

  constructor(
    private infectionDeckService: InfectionDeckService,
    private toastService: ToastService
  ) {
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

    if (lastAction.type == ActionType.EPIDEMIC) {
      this.infectionDeckService.decrementEpidemicCount();
    }

    this.infectionDeckService.setDeck(lastAction.data);

    this.toastService.openToast(`Undo ${lastAction.type}`, ToastType.NOTIFICATION, 500);
  }

  getActions() {
    return this.observableActions.asObservable();
  }

  doSetup(selectedCards: Card[]) {
    let isKnowns = this.infectionDeckService.getKnownStatus(selectedCards);
    let isDiscardeds = this.infectionDeckService.getDiscardStatus(selectedCards);
    let action = new Action(ActionType.SETUP, { isKnown: isKnowns, isDiscarded: isDiscardeds });
    this.addAction(action);

    this.infectionDeckService.discardCards(selectedCards);
  }

  doInfect(selectedCards: Card[]) {
    let isKnowns = this.infectionDeckService.getKnownStatus(selectedCards);
    let isDiscardeds = this.infectionDeckService.getDiscardStatus(selectedCards);
    let action = new Action(ActionType.INFECT, { isKnown: isKnowns, isDiscarded: isDiscardeds });
    this.addAction(action);

    this.infectionDeckService.discardCards(selectedCards);
  }

  doEpidemic(selectedCards: Card[]) {
    // Before discarding epidemic city card
    let discardedCards = this.infectionDeckService.getDiscardedCards();

    let isKnowns = this.infectionDeckService.getKnownStatus(selectedCards.concat(discardedCards));
    let isDiscardeds = this.infectionDeckService.getDiscardStatus(
      selectedCards.concat(discardedCards)
    );
    let action = new Action(ActionType.EPIDEMIC, { isKnown: isKnowns, isDiscarded: isDiscardeds });
    this.addAction(action);

    this.infectionDeckService.discardCards(selectedCards);
    // Update new set of discarded cards
    discardedCards = this.infectionDeckService.getDiscardedCards();
    this.infectionDeckService.markCardsAsKnownRandom(discardedCards);
    this.infectionDeckService.emptyDiscardPile();
    this.infectionDeckService.incrementEpidemicCount();
  }

  doForecast(selectedCards: Card[]) {
    let isKnowns = this.infectionDeckService.getKnownStatus(selectedCards);
    let action = new Action(ActionType.FORECAST, { isKnown: isKnowns });
    this.addAction(action);

    this.infectionDeckService.markCardsAsKnownOrdered(selectedCards);
  }

  doResilientPopulation(selectedCards: Card[]) {
    let isKnowns = this.infectionDeckService.getKnownStatus(selectedCards);
    let isRemoveds = this.infectionDeckService.getRemoveStatus(selectedCards);
    let action = new Action(ActionType.RESILIENT_POPULATION, {
      isKnown: isKnowns,
      isRemoved: isRemoveds,
    });
    this.addAction(action);

    this.infectionDeckService.removeCards(selectedCards);
  }

  newGame() {
    this.clearAllActions();

    this.infectionDeckService.reset();
  }
}
