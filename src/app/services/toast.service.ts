import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { DEFAULT_DURATION } from "../constants/pandemic-constants";
import { ToastType } from "../models/toastType";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async openToast(message: string, type: ToastType, duration?: number) {
    let toast: HTMLIonToastElement;

    switch (type) {
      case ToastType.NOTIFICATION:
        toast = await this.getNotificationToast(message, duration);
        break;
      case ToastType.ERROR:
        toast = await this.getErrorToast(message, duration);
        break;
      default:
        toast = await this.getDefaultToast(message, duration);
    }

    await toast.present();
  }

  private async getNotificationToast(message: string, duration?: number) {
    return await this.toastController.create({
      animated: true,
      color: "success",
      duration: duration ? duration : DEFAULT_DURATION,
      keyboardClose: true,
      position: "middle",
      message: message,
    });
  }

  private async getErrorToast(message: string, duration?: number) {
    return await this.toastController.create({
      animated: true,
      color: "danger",
      duration: duration ? duration : DEFAULT_DURATION,
      keyboardClose: true,
      position: "middle",
      message: message,
    });
  }

  private async getDefaultToast(message: string, duration?: number) {
    return await this.toastController.create({
      animated: true,
      color: "light",
      duration: duration ? duration : DEFAULT_DURATION,
      keyboardClose: true,
      position: "middle",
      message: message,
    });
  }
}
