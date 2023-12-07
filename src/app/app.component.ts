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

    <img  src="./assets/logo-bg.png" [routerLink]="['/']" style="width: 20%" />
    </mat-toolbar>
    <router-outlet></router-outlet>

  `,
})
export class AppComponent {

}
