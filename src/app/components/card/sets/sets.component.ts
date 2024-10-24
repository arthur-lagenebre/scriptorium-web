import { Component, Input } from '@angular/core';
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
  @Input() language: string = "en";

  GetSetName(sets: Sett[]) {
    return sets.find(x => x.Order === 1)?.Name;
  }

  GetCollectionNumber(sets: Sett[]) {
    return sets.find(x => x.Order === 1)?.CollectorNumber;
  }

  GetRarity(sets: Sett[]) {
    return sets.find(x => x.Order === 1)?.Rarity;
  }
}
