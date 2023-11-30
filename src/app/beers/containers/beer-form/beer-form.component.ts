import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { Beer } from 'src/app/beers/model/beer';

import { BeersService } from 'src/app/beers/services/beers.service';
import { ErrorDialogComponent } from 'src/app/beers/shared/components/error-dialog/error-dialog.component';
import { FormUtilsService } from 'src/app/beers/shared/services/form-utils.service';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    NgFor
  ]
})
export class BeerFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: BeersService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {}

  ngOnInit(): void {
    const beer: Beer = this.route.snapshot.data['beer'];
    this.form = this.formBuilder.group({
      id: [beer.id],
      name: [
        beer.name,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      type: [beer.type, [Validators.required]],
      origin: [beer.origin, [Validators.required]],
      price: [beer.price, [Validators.required]],
      rating: [beer.rating, [Validators.required]]
    });
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.form, fieldName);
  }


  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value as Beer).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError()
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Beer saved successfully!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Error saving this beer.'
    });
  }
}
