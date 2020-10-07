import { Component, Input, OnInit } from "@angular/core";
import { WRONG_NUMBER_CARDS_SELECTED } from "src/app/constants/pandemic-constants";
import { Card } from "src/app/models/card";
import { CardType } from "src/app/models/cardType";
import { ToastType } from "src/app/models/toastType";
import { InfectionDeckService } from "src/app/services/infection-deck.service";
import { ModalService } from "src/app/services/modal.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-draw-infection-card-modal",
  templateUrl: "./draw-infection-card-modal.page.html",
  styleUrls: ["./draw-infection-card-modal.page.scss"],
})
export class DrawInfectionCardModalPage implements OnInit {
  @Input() type: CardType;
  @Input() title: string;
  @Input() numCards: number;
  @Input() cardDistribution: Card[];

  currentNumCards: number;

  constructor(
    private modalService: ModalService,
    private infectionDeckService: InfectionDeckService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.currentNumCards = 1;
  }

  close() {
    this.cardDistribution.forEach((card) => (card.selectOrder = null));
    this.modalService.dismissModal({
      dismissed: true,
    });
  }

  selectCard(event: any) {
    let selected = this.infectionDeckService.findCardByName(event.target.outerText);
    if (!selected) {
      return;
    }
    
    if (selected.selectOrder != null) {
      selected.selectOrder = null;
      this.currentNumCards--;
    } else {
      selected.selectOrder = this.currentNumCards;
      this.currentNumCards++;
    }
  }

  drawCards() {
    let cardsToDraw = this.cardDistribution
      .filter((card) => card.selectOrder != null)
      .sort((a, b) => (a.selectOrder > b.selectOrder ? 1 : -1));

    if (cardsToDraw.length != this.numCards) {
      this.toastService.openToast(WRONG_NUMBER_CARDS_SELECTED, ToastType.ERROR);
    } else {
      if (this.type == CardType.RESILIENT_POPULATION) {
        this.infectionDeckService.removeCards(cardsToDraw);
      } else if (this.type != CardType.FORECAST) {
        this.infectionDeckService.discardCards(cardsToDraw);
      }

      this.infectionDeckService.clearSelectOrder(cardsToDraw);

      this.modalService.dismissModal({
        cardsToDraw,
      });
    }
  }
}
