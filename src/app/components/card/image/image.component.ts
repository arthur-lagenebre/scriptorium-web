import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../models/card';
import { CardSet } from "../../../models/cardSet";
import { Observable } from 'rxjs';

@Component({
  selector: 'ct-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input() card$!: Observable<Card>;
  @Input() selectedSet: number = 1;

  constructor() {}

  GetCardName(card: Card, index: number): string {
    if (card.CardFaces.length > 0) {
      return card.CardFaces[index].Names[0].Value;
    }

    return card.Names[0].Value;
  }  

  GetImageUrl(sets: CardSet[]): string[] {
    return sets.find(x => x.Order === this.selectedSet)?.ImageUrls || [];
  }
}
