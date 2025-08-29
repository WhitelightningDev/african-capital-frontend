import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonButton, IonContent, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
