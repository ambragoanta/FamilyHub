import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { DateTimeComponent } from './components/date-time/date-time.component';
import { FamilyMembersComponent } from './components/family-members/family-members.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { EventFormComponent } from './components/event-form/event-form.component';
import { MainframeComponent } from './components/mainframe/mainframe.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FamilyHubComponent } from './components/family-hub/family-hub.component';
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeftSidebarComponent,
    ProfilePictureComponent,
    DateTimeComponent,
    FamilyMembersComponent,
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,
    EventFormComponent,
    MainframeComponent,
    EventCreateComponent,
    EventEditComponent,
    FamilyHubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatIconModule,
    MatSelectModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
