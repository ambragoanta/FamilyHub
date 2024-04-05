import { Component } from '@angular/core';
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  showLogin: boolean = true;

  constructor(protected themeService: ThemeService) {
  }

}
