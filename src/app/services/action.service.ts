import { Injectable } from "@angular/core";
import { Action } from "../models/action";
import { InfectionDeckService } from "./infection-deck.service";

@Injectable({
  providedIn: "root",
})
export class ActionService {
  private actions: Action[] = [];

  constructor() {}

  addAction(action: Action) {
    this.actions.push(action);
  }

  undo() {
    let lastAction = this.actions.pop();
  }
}
