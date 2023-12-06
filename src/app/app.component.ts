import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, RouterOutlet, MatSlideToggleModule],
  template: `
    <mat-toolbar color="primary">
      <h1 [routerLink]="['/']" style="cursor: pointer;">Beer Project</h1>
      <mat-slide-toggle  ngModel="isDarkTheme" >Dark Mode</mat-slide-toggle>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  isDarkTheme: boolean = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
