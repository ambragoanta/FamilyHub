import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-family-member-card',
  templateUrl: './family-member-card.component.html',
  styleUrls: ['./family-member-card.component.css']
})
export class FamilyMemberCardComponent implements OnInit {
  @Input() member!: User;

  constructor(private userService: UserService, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.loadProfilePicture();
  }

  loadProfilePicture() {
    if (this.member.userId) {
      this.userService.getProfilePictureById(this.member.userId).subscribe(blob => {
        const imageUrl = URL.createObjectURL(blob);
        this.setProfilePicture(imageUrl);
      }, error => {
        console.error('Error loading profile picture', error);
      });
    }
  }

  setProfilePicture(imageUrl: string) {
    const circle = this.elementRef.nativeElement.querySelector('.profile-circle-member');
    if (circle) {
      circle.style.backgroundImage = `url(${imageUrl})`;
      circle.style.backgroundSize = 'cover';
    }
  }

}
