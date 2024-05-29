import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../../services/event.service";
import { EventModel } from "../../models/event.model";

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit{
    title = 'Edit Event';
    eventId: string | null = null;
    event: EventModel | null = null;
    constructor(private route: ActivatedRoute,
                private eventService: EventService){}
    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.eventId = params.get('id');
        if (this.eventId) {
          this.loadEventData(this.eventId);
        }
      });
    }

  loadEventData(eventId: string): void {
    this.eventService.getEvent(+eventId).subscribe(event => {
      this.event = event;
      console.log(event);
    });
  }
}
