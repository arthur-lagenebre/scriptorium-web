import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../models/card';
import { CardSet } from "../../../models/cardSet";
import { Language } from "../../../models/language";
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

  constructor() {}

  GetCardName(languages: Language[]): string {
    return languages[0].Value;
  }  

  GetImageUrl(sets: CardSet[]): string {
    return sets.find(x => x.Order === 1)?.ImageUrl || "";
  }
}
