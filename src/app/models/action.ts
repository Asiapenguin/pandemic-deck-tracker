import { ActionType } from "./actionType";
import { Card } from "./card";

export class Action {
  type: ActionType;
  data: any;

  constructor(type: ActionType, data: any) {
    this.type = type;
    this.data = data;
  }
}
