import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
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
import { countries } from '../../model/country-data-store';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (
      c.value !== null &&
      (isNaN(c.value) || c.value < min || c.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}

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
    NgFor,
  ],
})
export class BeerFormComponent implements OnInit {
  form!: FormGroup;
  public countries: any = countries;
  currentFile?: File;
  fileName? = '';
  message? = '';
  imageInfos?: Observable<any>;
  preview?: string;
  imageToShow: any;
  isImageLoading: boolean = true;
  isFormChanged: boolean = false;
  origFormValue: string = '';
  imageNotExists: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: BeersService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService,
    private uploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    const beer: Beer = this.route.snapshot.data['beer'];

    if (beer.name == '') {
      this.form = this.formBuilder.group({
        id: [null],
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(100),
          ],
        ],
        type: [null, [Validators.required]],
        origin: [null, [Validators.required]],
        price: [null, [Validators.required, Validators.min(0.01)]],
        rating: [null, [Validators.required, ratingRange(0.01, 5.0)]],
        image: [null],
      });
    } else {
      this.form = this.formBuilder.group({
        id: [beer.id],
        name: [
          beer.name,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(100),
          ],
        ],
        type: [beer.type, [Validators.required]],
        origin: [beer.origin, [Validators.required]],
        price: [beer.price, [Validators.required, Validators.min(0.01)]],
        rating: [beer.rating, [Validators.required, ratingRange(0.01, 5.0)]],
        image: [beer.image],
      });

      this.origFormValue = JSON.stringify(this.form.value);
      this.fileName = beer.image;
      if (this.fileName != null) {
         this.obtainImage();
      }
    }

    const nameContr = this.form.get('name');
    nameContr?.valueChanges.subscribe(() => {
      nameContr.patchValue(nameContr.value.toUpperCase(), { emitEvent: false });
    });
    const typeContr = this.form.get('type');
    typeContr?.valueChanges.subscribe(() => {
      typeContr.patchValue(typeContr.value.toUpperCase(), { emitEvent: false });
    });

    this.form.valueChanges.subscribe(() => {
      if (JSON.stringify(this.form.value) === this.origFormValue) {
        this.isFormChanged = false;
      } else {
        this.isFormChanged = true;
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    if (fieldName == 'price') {
      return 'Minimum value is 0.01';
    } else {
      if (fieldName == 'rating') {
        return 'Rating must be between 0.01 and 5.00';
      } else {
        return this.formUtils.getFieldErrorMessage(this.form, fieldName);
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value as Beer).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
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
    this.upload();
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Error saving this beer.',
    });
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
    this.fileName = this.currentFile?.name;
    if (this.currentFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(this.currentFile);

      this.form.patchValue({
        image: this.fileName,
      });
      this.checkImage();
    }
  }

  upload(): void {
    if (this.currentFile && this.imageNotExists) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.imageInfos = this.uploadService.getFile(this.fileName);
          }
        },
        error: (err: any) => {
          console.log(err);
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
        },
        complete: () => {
          this.currentFile = undefined;
        },
      });
    }
  }

  obtainImage(): void {
    this.isImageLoading = true;
    this.uploadService.getFile(this.fileName).subscribe({
      next:(data) => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      error:() => {
        this.isImageLoading = false;
      }
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

   checkImage(): void {
      this.imageNotExists = false;
      this.uploadService.getFile(this.fileName).subscribe({
        next: () => {
          this.imageNotExists = false;
        },
        error: (err: any) => {
          this.imageNotExists = true;
        }
   });
  }
}
