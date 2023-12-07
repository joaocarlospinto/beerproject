import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Beer } from '../../model/beer';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { StartComponent } from '../../shared/components/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatSortModule, MatPaginatorModule, StartComponent]
})
export class BeersListComponent implements AfterViewInit{
  @Input() beers: Beer[] = [];
  @Output() details: EventEmitter<Beer> = new EventEmitter(false);
  @Output() edit: EventEmitter<Beer> = new EventEmitter(false);
  @Output() remove: EventEmitter<Beer> = new EventEmitter(false);
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);
  @Output() view: EventEmitter<Beer> = new EventEmitter(false);

  readonly displayedColumns = ['name', 'type', 'origin', 'price', 'rating', 'actions'];

  dataSource!: MatTableDataSource<Beer>;
  @ViewChild(MatSort)  sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Beer>(this.beers);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onDetails(record: Beer) {
    this.details.emit(record);
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(record: Beer) {
    this.edit.emit(record);
  }

  onRemove(record: Beer) {
    this.remove.emit(record);
  }

  onView(record: Beer) {
    this.view.emit(record);
  }



}
