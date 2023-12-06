import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Beer } from '../../model/beer';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatSortModule]
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

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Beer>(this.beers);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
