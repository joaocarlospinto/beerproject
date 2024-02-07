import { Component, Input, OnChanges } from "@angular/core";

@Component ({
    selector: 'pm-star',
    standalone: true,
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss']

})
export class StartComponent implements OnChanges{
    @Input() rating: number = 0;
    cropWidth: number = 100;

    ngOnChanges(): void {

        this.cropWidth = this.rating * 80/5;

    }

}


