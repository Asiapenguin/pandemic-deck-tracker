import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { APP_TITLE } from "src/app/constants/pandemic-constants";
import { ToastType } from "src/app/models/toastType";
import { ActionService } from "src/app/services/action.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  title: string = APP_TITLE;
  actionsExist: boolean = false;

  @Output() refresh = new EventEmitter();

  constructor(private actionService: ActionService, private toastService: ToastService) {
    this.updateActions();
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
    this.actionService.getActions().subscribe({
      next(actions) {
        if (actions.length > 0) {
          that.actionsExist = true
        } else {
          that.actionsExist = false;
        }
      },
      error(msg) {
        that.toastService.openToast(msg, ToastType.ERROR);
      }
    });
  }
}
