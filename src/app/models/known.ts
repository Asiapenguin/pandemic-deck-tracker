import { KnownType } from "./knownType"

export class Known {
  value: boolean;
  type: KnownType;
  order: number;

  constructor(value: boolean, type?: KnownType, order?: number) {
    this.value = value;
    this.type = type;
    this.order = order;
  }
}