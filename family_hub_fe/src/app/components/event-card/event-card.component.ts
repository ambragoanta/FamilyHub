import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventModel } from "../../models/event.model";
import { UserService } from "../../services/user.service";
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThemeService } from "../../services/theme.service";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { EventService } from "../../services/event.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: EventModel | null = null;
  @Input() status: string = '';
  roles: string[] = [];
  @Output() eventDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private userService: UserService,
              protected themeService: ThemeService,
              private dialog: MatDialog,
              private eventService: EventService,
              private router: Router) { }

  ngOnInit() {
    if (this.event) {
      if (typeof this.event.dueTime === 'string') {
        this.event.dueTime = this.formatDueTime(this.event.dueTime);
      }
      if (this.event.users) {
        const userObservables: Observable<string>[] = this.event.users.map(user => this.getRole(user));
        forkJoin(userObservables).subscribe(roles => {
          this.roles = roles;
        });
      }
    }
  }

  formatDueTime(timeString: string): string {
    const timeParts = timeString.split(':');
    return `${timeParts[0]}:${timeParts[1]}`;
  }

  getRole(userId: number): Observable<string> {
    return this.userService.getOne(userId).pipe(
      map(user => {
        return user && user.role ? user.role : 'No role assigned';
      })
    );
  }

  onDeleteCard() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {message: 'Are you sure you want to delete this event?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.event?.eventId !== undefined) {
        this.eventService.deleteEvent(this.event.eventId).subscribe(result => {
           this.eventDeleted.emit();
        });
      }
    });
  }

  onEditCard(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {message: 'Are you sure you want to edit this event?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.event?.eventId !== undefined) {
        this.eventService.deleteEvent(this.event.eventId).subscribe(result => {
          if(this.event){
            this.router.navigate(['/family-hub/edit-event', this.event.eventId]);
          }
        });
      }
    });
  }
}
