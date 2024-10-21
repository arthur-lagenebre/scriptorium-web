import { Component, computed, Input, signal, SimpleChanges } from '@angular/core';
import { Card } from '../../../models/card';
import { Sett } from "../../../models/sett";
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
  @Input() language: string = "rn";
  collectorNumber: string = "";
  rarity: string = "";

  GetCollectionNumber(sets: Sett[]) {
    return sets.find(x => x.Order === 1)?.CollectorNumber;
  }

  GetRarity(sets: Sett[]) {
    return sets.find(x => x.Order === 1)?.Rarity;
  }
}
