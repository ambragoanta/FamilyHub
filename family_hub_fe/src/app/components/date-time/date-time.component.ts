import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'],
  providers: [DatePipe]
})
export class DateTimeComponent implements OnInit, OnDestroy {
  dateTime$: Observable<{ time: string; date: string }> | undefined;
  private subscription: Subscription | undefined;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.dateTime$ = new Observable<{ time: string, date: string }>((observer) => {
      setInterval(() => {
        const time = this.datePipe.transform(new Date(), 'HH:mm')!;
        const date = this.datePipe.transform(new Date(), 'd MMMM yyyy')!;
        observer.next({time, date});
      }, 1000);
    });
    this.subscription = this.dateTime$.subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
