import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from "../../models/event.model";
import { UserService } from "../../services/user.service";
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: EventModel | null = null;
  @Input() status: string = '';
  roles: string[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.event?.users) {

      const userObservables: Observable<string>[] = this.event.users.map(user => this.getRole(user));

      forkJoin(userObservables).subscribe(roles => {
        this.roles = roles;
        console.log(this.roles);
      });
    }
  }

  getRole(userId: number): Observable<string> {
    return this.userService.getOne(userId).pipe(
      map(user => {
        return user && user.role ? user.role : 'No role assigned';
      })
    );
  }
}
