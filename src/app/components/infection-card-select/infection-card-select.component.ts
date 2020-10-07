import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Card } from "src/app/models/card";
import { CardType } from "src/app/models/cardType";
import { Color } from "src/app/models/color";

@Component({
  selector: "app-infection-card-select",
  templateUrl: "./infection-card-select.component.html",
  styleUrls: ["./infection-card-select.component.scss"],
})
export class InfectionCardSelectComponent implements OnInit {
  @Input() card: Card;

  @Input() selectedCards: Card[];

  Color = Color;

  orderNumber: number = null;

  constructor() {}

  ngOnInit() {}

  updateOrderNumber() {
    this.orderNumber = this.selectedCards.findIndex((c) => c.name == this.card.name) + 1;

  }
}
