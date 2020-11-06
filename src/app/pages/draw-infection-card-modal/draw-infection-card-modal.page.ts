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

  selectedCards: Card[] = [];

  constructor(
    private modalService: ModalService,
    private infectionDeckService: InfectionDeckService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

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

    let index = this.selectedCards.indexOf(selected);

    if (index < 0) {
      selected.selectOrder = this.selectedCards.length + 1;
      this.selectedCards.push(selected);
    } else {
      selected.selectOrder = null;
      this.selectedCards.splice(index, 1);
      this.selectedCards.forEach((card) => {
        card.selectOrder = this.selectedCards.indexOf(card) + 1;
      });
    }
  }

  drawCards() {
    if (this.selectedCards.length != this.numCards) {
      this.toastService.openToast(WRONG_NUMBER_CARDS_SELECTED, ToastType.ERROR);
    } else {
      if (this.type == CardType.RESILIENT_POPULATION) {
        this.infectionDeckService.removeCards(this.selectedCards);
      } else if (this.type != CardType.FORECAST) {
        this.infectionDeckService.discardCards(this.selectedCards);
      }

      this.infectionDeckService.clearSelectOrder(this.selectedCards);

      this.modalService.dismissModal({
        selectedCards: this.selectedCards,
      });
    }
  }
}
