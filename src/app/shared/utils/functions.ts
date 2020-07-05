import swal from "sweetalert2";
import { alertDeleteMessage } from "./config";
import * as moment from "moment";
import { HttpParams } from "@angular/common/http";
import { FormControl } from "@angular/forms";

export interface FormControlField {
  field: FormControl;
  callback: any;
}

export const capitalizeTokenType = (value: string) => {
  return value.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
};

export const findByProp = (array, prop, value) => {
  return array.find(item => item[prop] === value);
};

export const getFileExtension = filename => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
};

export const dateForrmat = date => {
  const a = date.split("/", 3);
  return a[2] + "-" + a[1] + "-" + a[0];
};

export const onFieldsChange = (formControlFields: FormControlField[]) => {
  formControlFields.forEach(formControlField =>
    formControlField.field.valueChanges.subscribe(value =>
      formControlField.callback(value)
    )
  );
};

export const swalAlertDelete = callback => {
  swal(alertDeleteMessage).then(result => {
    if (result.value) {
      callback();
    }
  });
};

export const swalSuccessDelete = () => {
  swal("Supprimé", "La suppression a bien été effectuée.", "success");
};

export const swalFailDelete = () => {
  swal("Echoué", "La suppression a echouée.", "warning");
};

export const initIcDatePicker = () => {
  moment.locale("fr");
  return {
    attrs: {
      id: null,
      placeholder: "jj/mm/aaaa"
    },
    inputClasses: ["form-control"],
    displayFormat: "DD/MM/YYYY",
    dayQuickOptions: [
      {
        label: "Ajourd'hui",
        date: moment()
      },
      {
        label: "Demain",
        date: moment().add(1, "day")
      }
    ]
  };
};

export const initDataFilterPaginate = () => {
  return {
    per_page_data: [10, 20, 50, 100],
    data_filter: null,
    filter_query: "",
    params: {
      per_page: 10,
      sort_by: null,
      sort_order: null,
      page: 1
    }
  };
};

export const paramsBuilder = data => {
  let httpParams = new HttpParams();
  Object.keys(data).forEach(
    item =>
      (httpParams = data[item] ? httpParams.set(item, data[item]) : httpParams)
  );
  return httpParams;
};

export const formDataBuilder = data => {
  const formData = new FormData();
  Object.keys(data).forEach(item =>
    data[item] ? formData.append(item, data[item]) : formData
  );
  return formData;
};
