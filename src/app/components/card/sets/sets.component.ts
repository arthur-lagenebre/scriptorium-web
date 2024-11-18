import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../../../models/card';
import { CardSet } from "../../../models/cardSet";

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
    const set = sets.find(x => x.Order === this.selectedSet);

    return !set ? '' 
      : `<i class="ss ss-${set.Code.toLowerCase()} ss-${set.Rarity.toLowerCase()} ss-fw ss-2x"></i>`;
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
