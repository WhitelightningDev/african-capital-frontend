import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  imports: [IonContent],
})
export class RegisterPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
