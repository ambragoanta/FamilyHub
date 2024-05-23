import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyMembersComponent } from "./components/family-members/family-members.component";
import { AuthComponent } from "./components/auth/auth.component";
import { EventCreateComponent } from "./components/event-create/event-create.component";
import { EventEditComponent } from "./components/event-edit/event-edit.component";
import { FamilyHubComponent } from "./components/family-hub/family-hub.component";
import { EventsComponent } from "./components/events/events.component";
import { MyEventsComponent } from "./components/my-events/my-events.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";

const routes: Routes = [
  {path: 'auth', component:AuthComponent},
  {
    path: 'family-hub',
    component: FamilyHubComponent,
    children: [
      {path: 'family-members', component: FamilyMembersComponent},
      {path: 'add-event', component: EventCreateComponent},
      {path: 'edit-event/:id', component: EventEditComponent},
      {path: 'edit-event', component: EventEditComponent},
      {path: 'edit-user-profile', component: UserEditComponent},
      {path: 'all-events', component: EventsComponent},
      {path: 'my-events', component: MyEventsComponent},
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

