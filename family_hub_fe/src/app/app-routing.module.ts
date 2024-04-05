import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyMembersComponent } from "./components/family-members/family-members.component";
import { AuthComponent } from "./components/auth/auth.component";

const routes: Routes = [
  {path: 'family-members', component: FamilyMembersComponent},
  {path: 'auth', component:AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

