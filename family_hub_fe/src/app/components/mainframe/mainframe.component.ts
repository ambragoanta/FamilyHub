import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-mainframe',
  templateUrl: './mainframe.component.html',
  styleUrls: ['./mainframe.component.css']
})
export class MainframeComponent {
  @Input() title = '';
}
