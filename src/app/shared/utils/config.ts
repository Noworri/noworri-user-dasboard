import { SweetAlertOptions } from "sweetalert2";

export const alertDeleteMessage: SweetAlertOptions = {
  title: "Êtes vous sûr de vouloir supprimer ?",
  text: "Une fois lancée, l'action est irréversible",
  type: "warning",
  showCancelButton: true,
  cancelButtonColor: "#d33",
  cancelButtonText: "Non",
  confirmButtonColor: "#3085d6",
  confirmButtonText: "Oui",
  showLoaderOnConfirm: true
};
