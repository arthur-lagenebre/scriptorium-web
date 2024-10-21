import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../models/card';
import { Sett } from "../../../models/sett";
import { Language } from "../../../models/language";
import { Observable } from 'rxjs';

@Component({
  selector: 'ct-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
  @Input() card$!: Observable<Card>;
  @Input() language: string = "en";

  constructor() { }

  GetValue(Languages: Language[]) {
    return Languages.find(x => x.Code === this.language)?.Value;
  }

  GetText(Languages: Language[]) {
    let regex = /\n/gi;
    return `<span>${Languages.find(x => x.Code === this.language)?.Value.replace(regex, "</span><br /><span>")}</span>`;
  }

  GetArtist(Sets: Sett[], index: number) {
    return Sets.find(x => x.Order === 1)?.Flavors[index].Artist;
  }

  GetFlavorName(Sets: Sett[], index: number) {
    return Sets.find(x => x.Order === 1)?.Flavors[index].FlavorName;
  }

  GetFlavorText(Sets: Sett[], index: number) {
    return Sets.find(x => x.Order === 1)?.Flavors[index].FlavorText;
  }
}
