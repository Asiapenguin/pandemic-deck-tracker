import { Component, Input, OnInit } from '@angular/core';
import { Card } from "src/app/models/card";
import { KnownType } from "src/app/models/knownType";

@Component({
  selector: 'app-known-infection-deck',
  templateUrl: './known-infection-deck.component.html',
  styleUrls: ['./known-infection-deck.component.scss'],
})
export class KnownInfectionDeckComponent implements OnInit {

  @Input() knownCards: Card[];

  knownCardsWithOrder: object;
  knownCardsWithOrderKeys: string[];

  KnownType = KnownType;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.updateKnownCardsWithOrder();
  }

  updateKnownCardsWithOrder() {
    this.knownCardsWithOrder = {};
    let uniqueOrderNumbers = [... new Set(this.knownCards.map(card => card.isKnown.order))];
    if (uniqueOrderNumbers.length > 0) {
      for (let order of uniqueOrderNumbers) {
        let withSameOrder = this.knownCards.filter(card => card.isKnown.order == order)
        let type = [...new Set(withSameOrder.map(card => card.isKnown.type))][0];
        this.knownCardsWithOrder[order] = { cards: withSameOrder, type: type };
      }
    }
    this.knownCardsWithOrderKeys = Object.keys(this.knownCardsWithOrder);
  }

}
