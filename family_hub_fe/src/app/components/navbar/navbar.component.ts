import { Component } from '@angular/core';
import { ThemeService } from "../../services/theme.service";
import { AuthService } from "../../services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(protected themeService: ThemeService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  goBack() {
    window.history.back();
  }

  onLogout(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {title: 'Logout', message: 'Are you sure you want to logout?'},

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.authService.logout();
      }
    });
  }

}
