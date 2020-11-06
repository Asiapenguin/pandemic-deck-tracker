import { Component, Input, OnInit } from '@angular/core';
import { Card } from "src/app/models/card";

@Component({
  selector: 'app-unknown-infection-deck',
  templateUrl: './unknown-infection-deck.component.html',
  styleUrls: ['./unknown-infection-deck.component.scss'],
})
export class UnknownInfectionDeckComponent implements OnInit {

  @Input() unknownCards: Card[];
  constructor() { }

  ngOnInit() {}

}
