import { Component } from '@angular/core';
import { Funnel } from './data-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  funnel = new Funnel();
  title = 'app works!';
}
