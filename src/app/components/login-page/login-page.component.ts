import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [IonContent],
})
export class LoginPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
