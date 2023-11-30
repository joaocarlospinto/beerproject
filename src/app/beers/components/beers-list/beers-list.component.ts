import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Beer } from '../../model/beer';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule]
})
export class BeersListComponent {
  @Input() beers: Beer[] = [];
  @Output() details: EventEmitter<Beer> = new EventEmitter(false);
  @Output() edit: EventEmitter<Beer> = new EventEmitter(false);
  @Output() remove: EventEmitter<Beer> = new EventEmitter(false);
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);
  @Output() view: EventEmitter<Beer> = new EventEmitter(false);

  readonly displayedColumns = ['name', 'type', 'origin', 'price', 'rating', 'actions'];

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
