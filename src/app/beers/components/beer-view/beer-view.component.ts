import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NO_ERRORS_SCHEMA,
  OnInit
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';

import { Beer } from '../../model/beer';
import { CommonModule, Location, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { StartComponent } from '../../shared/components/star-rating/star-rating.component';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-beer-view',
  templateUrl: './beer-view.component.html',
  styleUrls: ['./beer-view.component.scss'],
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
    CommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BeerViewComponent implements OnInit {
  beer!: Beer;
  fileName? = '';
  imageShow: any;
  isImageLoading: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private uploadService: FileUploadService) { }

  ngOnInit() {
    this.beer = this.route.snapshot.data['beer'];
    this.fileName = this.beer.image;
    this.obtainImage();
  }

  onCancel() {
    this.location.back();
  }


  obtainImage(): void {
   console.log("obtain image");
   console.log(this.fileName);
    this.isImageLoading = true;
    this.uploadService.getFile(this.fileName).subscribe(
      (data) => {
        this.createImageFromBlob(data);
        console.log("ok");
        this.isImageLoading = false;
        console.log(this.isImageLoading);
      },
      (error) => {
        console.log("erro");
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageShow = reader.result;
        console.log(this.imageShow);
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }


}
