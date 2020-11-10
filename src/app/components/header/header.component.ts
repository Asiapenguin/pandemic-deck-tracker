import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { APP_TITLE } from "src/app/constants/pandemic-constants";
import { ToastType } from "src/app/models/toastType";
import { ActionService } from "src/app/services/action.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: string = APP_TITLE;
  actionsExist: boolean = false;

  actionSubscription: Subscription;

  @Output() refresh = new EventEmitter();

  constructor(private actionService: ActionService, private toastService: ToastService) {
    this.updateActions();
  }

  ngOnDestroy(): void {
    this.actionSubscription.unsubscribe();
  }

  ngOnInit() {}

  handleNewGame() {
    this.actionService.newGame();
    this.refresh.emit();
  }

  handleUndo() {
    this.actionService.undoLastAction();
    this.refresh.emit();
  }

  private updateActions() {
    let that = this;
    this.actionSubscription = this.actionService.getActions().subscribe({
      next(actions) {
        if (actions.length > 0) {
          that.actionsExist = true;
        } else {
          that.actionsExist = false;
        }
      },
      error(msg) {
        that.toastService.openToast(msg, ToastType.ERROR);
      },
    });
  }
}
