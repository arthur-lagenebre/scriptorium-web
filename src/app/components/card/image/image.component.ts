import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../models/card';
import { Sett } from "../../../models/sett";
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

  GetCardName(Languages: Language[]) {
    return Languages[0].Value;
  }  

  GetImageUrl(Sets: Sett[]) {
    return Sets.find(x => x.Order === 1)?.ImageUrl;
  }
}
