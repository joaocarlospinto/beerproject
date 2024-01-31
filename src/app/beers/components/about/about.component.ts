import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NO_ERRORS_SCHEMA,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule, Location, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { StartComponent } from '../../shared/components/star-rating/star-rating.component';


@Component({
  selector: 'app-beer-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    StartComponent,
    CommonModule,
    MatIconModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AboutComponent {
  public pageTitle = 'About this site';
  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
   ) { }
}
