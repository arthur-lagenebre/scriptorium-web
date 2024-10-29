import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../../models/card';
import { CardSet } from "../../../models/cardSet";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'ct-sets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sets.component.html',
  styleUrl: './sets.component.scss'
})
export class SetsComponent {
  @Input() card$!: Observable<Card>;
  @Input() language = "en";
  @Input() selectedSet = 1;
  @Output() updatedSetEvent = new EventEmitter<number>();

  UpdateSetId(id: number): void {
    this.updatedSetEvent.emit(id);
  }

  GetSetCode(sets: CardSet[]): string {
    let set = sets.find(x => x.Order === this.selectedSet);

    if (set === undefined) {
      return "";
    }

    return '<i class="ss ss-' + set.Code.toLowerCase() + ' ss-' + set.Rarity + ' ss-fw ss-2x"></i>';
  }

  GetSetName(sets: CardSet[]): string {
    return sets.find(x => x.Order === this.selectedSet)?.Name || "";
  }

  GetCollectionNumber(sets: CardSet[]): string {
    return sets.find(x => x.Order === this.selectedSet)?.CollectorNumber || "";
  }

  GetRarity(sets: CardSet[]): string {
    return sets.find(x => x.Order === this.selectedSet)?.Rarity || "";
  }
}
