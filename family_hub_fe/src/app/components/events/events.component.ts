import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/event.service";
import { EventModel } from "../../models/event.model";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  title = 'All Events';
  events: EventModel[] = [];
  dateList: { date: string, status: 'finished' | 'current' | 'upcoming' , events: EventModel[]}[] = [];
  currentDate: Date = new Date();

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((events: EventModel[]) => {
      this.events = events;
      this.prepareWeekDates();
    });
  }

  prepareWeekDates(): void {
    const today = new Date(this.currentDate.toISOString().slice(0, 10));
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    this.dateList = Array.from({ length: 7 }).map((_, i) => {
      const dateObj = new Date(startOfWeek);
      dateObj.setDate(startOfWeek.getDate() + i);
      const dateString = this.formatDate(dateObj);
      const dayEvents = this.events.filter(event => event.dueDate === dateString);
      return {
        date: dateString,
        status: this.determineDateStatus(dateObj),
        events: dayEvents
      };
    });

    console.log(this.dateList);
  }


  formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  determineDateStatus(date: Date): 'finished' | 'current' | 'upcoming' {
    const today = new Date(this.currentDate.toISOString().slice(0, 10));
    const comparingDate = new Date(date.toISOString().slice(0, 10));

    if (comparingDate < today) {
      return 'finished';
    } else if (comparingDate > today) {
      return 'upcoming';
    } else {
      return 'current';
    }
  }
}
