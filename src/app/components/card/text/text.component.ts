import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../models/card';
import { Sett } from "../../../models/Sett";
import { Language } from "../../../models/Language";
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
    return `<p>${Languages.find(x => x.Code === this.language)?.Value.replace("\n", "</p><p>")}</p>`;
  }

  GetArtist(Sets: Sett[]) {
    return Sets.find(x => x.Order === 1)?.Flavors[0].Artist;
  }
}
