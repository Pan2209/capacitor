import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GeolocationService } from '../services/geolocation.service';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, ],
})
export class HomePage {
  latitude: number   | null = null;
  longitude: number  | null = null;
  constructor(private geoService : GeolocationService) {}
async getCurrentPosition() {
const coordinates = await this.geoService.getCurrentPosition();
this.latitude = coordinates.coords.latitude;
this.longitude = coordinates.coords.longitude;


  }
}