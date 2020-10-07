import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { CardType } from "src/app/models/cardType";
import { DrawInfectionCardModalPage } from "src/app/pages/draw-infection-card-modal/draw-infection-card-modal.page";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

  @Input() iconName: string;

  @Input() buttonName: string;

  @Input() type: CardType;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}
}
