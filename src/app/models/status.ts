import { Known } from "./known";

export class Status {
  name: string;
}

export class KnownStatus extends Status {
  isKnown: Known;

  constructor(name: string, isKnown: Known) {
    super();
    this.name = name;
    this.isKnown = isKnown;
  }
}

export class DiscardStatus extends Status {
  isDiscarded: boolean;

  constructor(name: string, isDiscarded: boolean) {
    super();
    this.name = name;
    this.isDiscarded = isDiscarded;
  }
}

export class RemoveStatus extends Status {
  isRemoved: boolean;

  constructor(name: string, isRemoved: boolean) {
    super();
    this.name = name;
    this.isRemoved = isRemoved;
  }
}
