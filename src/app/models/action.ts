import { ActionType } from "./actionType";
import { Card } from "./card";

export class Action {
  action: ActionType
  oldDeck: Card[];
  newDeck: Card[];

  constructor(action: ActionType, oldDeck: Card[]) {
    console.log("olddeck:", oldDeck)
    this.action = action;
    this.oldDeck = oldDeck;
  }
}