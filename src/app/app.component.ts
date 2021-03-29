import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vbt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { 'class': 'vbt-root' }
})
export class AppComponent {}
