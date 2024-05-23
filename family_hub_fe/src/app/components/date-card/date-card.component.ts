import { Component, Input } from '@angular/core';
import { EventModel } from "../../models/event.model";

@Component({
  selector: 'app-date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.css']
})
export class DateCardComponent {
  @Input() date: string = '';
  @Input() status: 'finished' | 'current' | 'upcoming' | 'default' = 'default';
  @Input() events: EventModel[] = [];
}
