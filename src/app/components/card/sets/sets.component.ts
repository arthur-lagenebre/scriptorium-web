import { Component, Input } from '@angular/core';
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
  @Input() language: string = "en";

  GetSetName(sets: CardSet[]): string {
    return sets.find(x => x.Order === 1)?.Name || "";
  }

  GetCollectionNumber(sets: CardSet[]): string {
    return sets.find(x => x.Order === 1)?.CollectorNumber || "";
  }

  GetRarity(sets: CardSet[]): string {
    return sets.find(x => x.Order === 1)?.Rarity || "";
  }
}
