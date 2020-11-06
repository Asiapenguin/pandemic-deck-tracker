import { Component, Input, OnInit } from '@angular/core';
import { Card } from "src/app/models/card";

@Component({
  selector: 'app-removed-deck',
  templateUrl: './removed-deck.component.html',
  styleUrls: ['./removed-deck.component.scss'],
})
export class RemovedDeckComponent implements OnInit {

  @Input() removedCards: Card[];
  
  constructor() { }

  ngOnInit() {}

}
