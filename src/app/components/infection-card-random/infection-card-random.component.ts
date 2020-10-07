import { Component, Input, OnInit } from "@angular/core";
import { Card } from "src/app/models/card";
import { Color } from "src/app/models/color";

@Component({
  selector: "app-infection-card-random",
  templateUrl: "./infection-card-random.component.html",
  styleUrls: ["./infection-card-random.component.scss"],
})
export class InfectionCardRandomComponent implements OnInit {
  @Input() cardDistribution: Card[];

  blackNum: number = 0;
  blueNum: number = 0;
  redNum: number = 0;
  yellowNum: number = 0;

  constructor() {}

  ngOnInit() {
    this.getNumberOfCards();
  }

  ngOnChanges() {
    this.getNumberOfCards();
  }

  getNumberOfCards() {
    this.blackNum = this.cardDistribution
      .filter((c) => c.color == Color.BLACK).length;
    this.blueNum = this.cardDistribution
      .filter((c) => c.color == Color.BLUE).length;
    this.redNum = this.cardDistribution
      .filter((c) => c.color == Color.RED).length;
    this.yellowNum = this.cardDistribution
      .filter((c) => c.color == Color.YELLOW).length;
  }
}
