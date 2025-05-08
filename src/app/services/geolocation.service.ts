import { Injectable } from '@angular/core';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
async getCurrentPosition(): Promise<GeolocationPosition> {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates;
  }
  constructor() { }
}
