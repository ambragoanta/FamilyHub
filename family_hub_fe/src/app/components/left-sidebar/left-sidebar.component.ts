import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent {

  constructor(private router: Router) {
  }

  activeButtonIndex: number = 0;

  setActiveButton(index: number, path: string): void {
    this.activeButtonIndex = index;
    this.router.navigate([path]);
  }

}
