import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'English', url: '/english', icon: 'mail' },
    { title: 'Arabic', url: '/folder/Outbox', icon: 'paper-plane' },
  ];
  constructor() {}
}
