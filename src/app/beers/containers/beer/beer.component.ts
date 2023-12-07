
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConfirmationDialogComponent } from 'src/app/beers/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/beers/shared/components/error-dialog/error-dialog.component';
import { BeersListComponent } from 'src/app/beers/components/beers-list/beers-list.component';
import { Beer } from '../../model/beer';

import { BeersService } from '../../services/beers.service';


@Component({
  selector: 'app-beers',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    NgIf,
    BeersListComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    AsyncPipe
  ]
})
export class BeersComponent implements OnInit {
  beers$!: Beer[];
  sub!: Subscription;
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private beersService: BeersService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {

    this.sub = this.beersService.list().subscribe({
      next: beers => {
        this.beers$ = beers;
      },
      error: err => {
        this.errorMessage = err,
        this.onError('Error loading beers.');}
    });
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(beer: Beer) {
    this.router.navigate(['edit', beer.id], { relativeTo: this.route });
  }

  onView(beer: Beer) {
    this.router.navigate(['view', beer.id], { relativeTo: this.route });
  }

  onRemove(beer: Beer) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you would like to remove this beer?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.beersService.remove(beer.id).subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Beer removed successfully!', 'X', {
              duration: 9000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
            window.location.reload();
          },
          error: () => this.onError('Error trying to remove the beer.')
        });
      }
    });
  }

}
