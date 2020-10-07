import { Component, Input, OnInit } from "@angular/core";
import { Card } from "src/app/models/card";
import { Color } from "src/app/models/color";

@Component({
  selector: "app-infection-card",
  templateUrl: "./infection-card.component.html",
  styleUrls: ["./infection-card.component.scss"],
})
export class InfectionCardComponent implements OnInit {
  @Input() card: Card;

  Color = Color;

  constructor() {}

  ngOnInit() {} 
}
