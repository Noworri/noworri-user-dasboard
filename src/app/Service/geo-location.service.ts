import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Geolocalisation } from "../Models/geoLocalisation.model";

@Injectable({
  providedIn: "root",
})
export class GeoLocationService {
  GeolocalisationUrl = "https://ipapi.co/json/";

  constructor(private http: HttpClient) {}
  getLocation() {
    return this.http.get<Geolocalisation[]>(this.GeolocalisationUrl);
  }
}
