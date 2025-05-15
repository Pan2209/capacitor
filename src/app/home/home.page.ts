import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GeolocationService } from '../services/geolocation.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  PushNotifications,
  Token,
  PushNotificationSchema,
  ActionPerformed,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class HomePage {
  latitude: number | null = null;
  longitude: number | null = null;
  photo: string | null = null;
  pushToken: string | null = null;
  notificationMessage: string | null = null;

  constructor(private geoService: GeolocationService) {
    this.registerPush();
  }

  async getCurrentPosition() {
    const coordinates = await this.geoService.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.photo = image.dataUrl!;
  }

  registerPush() {
    // Solicita permiso
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    // Token recibido
    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
      this.pushToken = token.value;
    });

    // Error al registrar
    PushNotifications.addListener('registrationError', err => {
      console.error('Push registration error: ', err);
    });

    // Notificación recibida en primer plano
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      this.notificationMessage = notification.body ?? 'Notificación sin cuerpo';
    });

    // Acciones en la notificación
    PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
      console.log('Acción realizada con la notificación:', action);
    });
  }
}
