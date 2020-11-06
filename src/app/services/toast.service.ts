import { Injectable } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { ToastType } from "../models/toastType";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private duration = 2000;

  constructor(private toastController: ToastController) { }

  async openToast(message: string, type: ToastType) {
    let toast: HTMLIonToastElement;

    switch(type) {
      case ToastType.NOTIFICATION:
        toast = await this.getNotificationToast(message);
        break;
      case ToastType.ERROR:
        toast = await this.getErrorToast(message);
        break;
      default:
        toast = await this.getDefaultToast(message);
    }

    await toast.present();
  }

  private async getNotificationToast(message: string) {
    return await this.toastController.create({
      animated: true,
      color: "success",
      duration: this.duration,
      keyboardClose: true,
      position: "middle",
      message: message
    })
  }

  private async getErrorToast(message: string) {
    return await this.toastController.create({
      animated: true,
      color: "danger",
      duration: this.duration,
      keyboardClose: true,
      position: "middle",
      message: message
    })
  }

  private async getDefaultToast(message: string) {
    return await this.toastController.create({
      animated: true,
      color: "light",
      duration: this.duration,
      keyboardClose: true,
      position: "middle",
      message: message
    })
  }
}
