import { Color } from "./color";
import { Known } from "./known";

export class Card {
  name: string;
  color: Color;
  connections: string[];
  selectOrder: number;
  isKnown: Known;
  isDiscarded: boolean;
  isRemoved: boolean;

  constructor(name: string, color: Color, connections: string[]) {
    this.name = name;
    this.color = color;
    this.connections = connections;
    this.selectOrder = null;
    this.isKnown = new Known(false);
    this.isDiscarded = false;
    this.isRemoved = false;
  }
}