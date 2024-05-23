import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { EventService } from "../../services/event.service";
import { EventModel } from "../../models/event.model";
import { UserService } from "../../services/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  usersList: User[] = [];
  @Input() event: EventModel | null = null;

  constructor(private fb: FormBuilder, private router: Router,
              private datePipe: DatePipe,
              private eventService: EventService,
              private userService: UserService,
              private snackBar: MatSnackBar) {

    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(1000)],
      users: [[], Validators.required],
      picker: ['', Validators.required],
    });

    if(this.event) {
      this.eventForm.patchValue({
        title: this.event.title,
        description: this.event.description,
        users: this.event.users,
        picker: this.datePipe.transform(this.event.dueDate, 'yyyy-MM-dd')
      });
    }

    console.log(this.eventForm.value);
  }


  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.usersList = users;
        console.log('Users fetched successfully', this.usersList);
      },
      error: (error) => {
        console.error('Error fetching users', error);
      }
    });

  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;

      const dueDate = this.datePipe.transform(formValue.picker, 'yyyy-MM-dd') || '';
      const dueTime = this.datePipe.transform(formValue.picker, 'HH:mm:ss') || '';

      const newEvent: EventModel = {
        title: formValue.title,
        description: formValue.description,
        dueDate: dueDate,
        dueTime: dueTime,
        users: formValue.users
      };

      this.eventService.createEvent(newEvent).subscribe({
        next: (event) => {
          this.eventForm.reset();
          this.showSuccessMessage();
        },
        error: (error) => {
          console.error('There was an error creating the event', error);
        }
      });
    }
  }

  private showSuccessMessage() {
    this.snackBar.open('Event created successfully!', 'Close', {
      duration: 2000,
      panelClass: ['custom-snackbar']
    });
  }

}
