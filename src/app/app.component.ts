import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, RouterOutlet, MatSlideToggleModule, MatIconModule],
  template: `

    <mat-toolbar color="primary">

    <img  src="./assets/logo-bg.png" [routerLink]="['/']" style="width: 20%" />
    <a [routerLink]="['about']">About</a>
    </mat-toolbar>
    <router-outlet></router-outlet>

  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {


}
