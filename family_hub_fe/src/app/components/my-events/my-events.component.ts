import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {EventModel} from "../../models/event.model";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  title = 'Your events';
  myEvents: EventModel[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getMyEvents().subscribe((events) => {
      this.myEvents = events;
    });
  }
}
