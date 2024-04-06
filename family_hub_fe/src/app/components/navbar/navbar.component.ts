import { Component } from '@angular/core';
import { ThemeService } from "../../services/theme.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(protected themeService: ThemeService,
              private authService: AuthService) {
  }

  goBack() {
    window.history.back();
  }

  onLogout(){
    this.authService.logout();
  }
}
