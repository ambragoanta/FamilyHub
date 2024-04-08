import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from "../../models/event.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  users: User[] = [];
  @Input() event: EventModel | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.event?.users.forEach((userId) => {
      this.userService.getOne(userId).subscribe((user) => {
        this.users.push(user);
      });
    });
  }

}
