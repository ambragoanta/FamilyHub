import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-family-members',
  templateUrl: './family-members.component.html',
  styleUrls: ['./family-members.component.css']
})
export class FamilyMembersComponent implements OnInit{
  title = "Family Members";
  familyMembers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchFamilyMembers();
  }

  fetchFamilyMembers() {
    this.userService.getAll().subscribe({
      next: (users: User[]) => {
        this.familyMembers = users;
      },
      error: (err) => {
        console.error('Error fetching family members:', err);
      }
    });
  }

}
