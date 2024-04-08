import {Component, OnInit} from '@angular/core';
import {EventService} from "../../services/event.service";
import {EventModel} from "../../models/event.model";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  title = 'All Events'
  events: EventModel[] = [];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((events: EventModel[]) => {
      this.events = events;
    });
  }

}
