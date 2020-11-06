import { ActionType } from "./actionType";
import { Card } from "./card";

export class Action {
  action: ActionType
  oldDeck: Card[];
  newDeck: Card[];

  constructor(action: ActionType) {
    this.action = action;
  }
}