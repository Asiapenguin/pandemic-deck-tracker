import { Component, Input, OnInit } from '@angular/core';
import { Card } from "src/app/models/card";

@Component({
  selector: 'app-discarded-deck',
  templateUrl: './discarded-deck.component.html',
  styleUrls: ['./discarded-deck.component.scss'],
})
export class DiscardedDeckComponent implements OnInit {

  @Input() discardedCards: Card[];
  
  constructor() { }

  ngOnInit() {}

}
