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
  dateList: { date: string, status: 'finished' | 'current' | 'upcoming' , events: EventModel[]}[] = [];
  currentDate: Date = new Date();
  selectedStatus: 'finished' | 'current' | 'upcoming' | 'all' = 'all';
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.userService.getMyEvents().subscribe((events) => {
      this.myEvents = events;
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
      let dayEvents = this.myEvents.filter(event => event.dueDate === dateString);
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

  getRemainingDays(event: EventModel): string {
    const eventDate = new Date(event.dueDate);
    const today = new Date();
    const timeDiff = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays === 1) {
      return "1 day remaining";
    } else if (diffDays > 1) {
      return `${diffDays} days remaining`;
    } else {
      return "Event has started or finished";
    }
  }

  getRemainingHours(event: EventModel): string {
    const eventDateTime = new Date(`${event.dueDate}T${event.dueTime}`);
    const now = new Date();
    const timeDiff = eventDateTime.getTime() - now.getTime();
    if (timeDiff > 0) {
      const diffHours = Math.ceil(timeDiff / (1000 * 3600));
      return `${diffHours} hours remaining`;
    } else {
      const pastHours = Math.abs(Math.floor(timeDiff / (1000 * 3600)));
      return `${pastHours} hours have passed`;
    }
  }

  onEventDeleted(){
    this.getEvents();
  }
}
