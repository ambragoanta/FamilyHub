import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { filter, takeUntil } from "rxjs";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit{
  currentUser?: User;

  constructor(private router: Router,
              private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadCurrentUser();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.loadCurrentUser();
      });
  }
  loadCurrentUser() {
    this.userService.getMe().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        this.loadProfilePicture();
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }

  loadProfilePicture() {
    this.userService.getProfilePicture().subscribe(blob => {
      const imageUrl = URL.createObjectURL(blob);
      this.setProfilePicture(imageUrl);
    }, error => {
      console.error('Error loading profile picture', error);
    });
  }

  setProfilePicture(imageUrl: string) {
    const circle = document.querySelector('.profile-circle-navbar') as HTMLElement;
    if (circle) {
      circle.style.backgroundImage = `url(${imageUrl})`;
    }
  }

  navigate(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {title: "Edit Profile", message: 'Do you want to edit your profile?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/family-hub/edit-user-profile']);
      }
    });
  }
}
