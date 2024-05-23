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
  selectedStatus: 'finished' | 'current' | 'upcoming' | 'all' = 'all';
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
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
      let dayEvents = this.events.filter(event => event.dueDate === dateString);
      dayEvents = dayEvents.sort((a, b) => a.dueTime.localeCompare(b.dueTime));
      const status = this.determineDateStatus(dateObj);
      return {
        date: dateString,
        status: status,
        events: this.selectedStatus === 'all' || this.selectedStatus === status ? dayEvents : []
      };
    });
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

  onEventDeleted(){
    this.getEvents();
  }

  filterEvents(status: 'finished' | 'current' | 'upcoming' | 'all'): void {
    this.selectedStatus = status;
    this.prepareWeekDates();
  }

}
