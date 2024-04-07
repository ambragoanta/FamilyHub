import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'family_hub_fe';

  constructor(private authService: AuthService) {

  }
}
