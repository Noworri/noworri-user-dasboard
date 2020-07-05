import { Injectable } from "@angular/core";
import { ToastyService, ToastOptions } from "ng2-toasty";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppToastService {
  // position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center' | 'center-center';
  private defaultOptions = {
    showClose: true,
    timeout: 5000,
    theme: "bootstrap",
    position: "top-right"
  };
  private successDefaultOptions: ToastOptions = {
    ...this.defaultOptions,
    title: "Enregister !",
    msg: "Données enregistrées avec succès."
  };
  private doneDefaultOptions: ToastOptions = {
    ...this.defaultOptions,
    title: "Succès !",
    msg: "Effectué avec succès."
  };
  private errorOptions: ToastOptions = {
    ...this.defaultOptions,
    title: "Echec !",
    msg: "Une erreur inattendue est survenue ."
  };
  private deleteOptions: ToastOptions = {
    ...this.defaultOptions,
    title: "Succès !",
    msg: "Suppression éffectuée avec succès ."
  };
  private submitOptions: ToastOptions = {
    ...this.defaultOptions,
    title: "Succès !",
    msg: "Suppression éffectuée avec succès ."
  };
  private invalidOptions: ToastOptions = {
    ...this.defaultOptions,
    title: "Echec !",
    msg: "Le formulaire est incorrecte"
  };
  private editedOptions: ToastOptions = {
    ...this.defaultOptions,
    title: "Succès !",
    msg: "Modification éffectuée avec succès ."
  };
  private infoOptions: ToastOptions = {
    ...this.defaultOptions,
    title: "Info !"
  };
  positionSubjet = new BehaviorSubject<string>("top-right");

  constructor(private toastService: ToastyService) {}

  success(options?: ToastOptions) {
    this.positionSubjet.next("top-right");
    this.toastService.success(options || this.successDefaultOptions);
  }
  submited(options?: ToastOptions) {
    this.positionSubjet.next("top-right");
    this.toastService.success(options || this.submitOptions);
  }
  done(options?: ToastOptions) {
    this.toastService.success(options || this.doneDefaultOptions);
  }
  delete(options?: ToastOptions) {
    this.positionSubjet.next("top-right");
    this.toastService.success(options || this.deleteOptions);
  }
  edited(options?: ToastOptions) {
    this.positionSubjet.next("top-right");
    this.toastService.success(options || this.editedOptions);
  }
  error(options?: ToastOptions) {
    this.positionSubjet.next("bottom-center");
    this.toastService.warning(options || this.errorOptions);
  }
  info(options?: ToastOptions) {
    // this.positionSubjet.next("top-right");
    this.toastService.info(options || this.infoOptions);
  }

  invalidForm(options?: ToastOptions) {
    this.positionSubjet.next("top-right");
    this.toastService.warning(options || this.invalidOptions);
  }

  get position() {
    return this.positionSubjet.asObservable();
  }
}
