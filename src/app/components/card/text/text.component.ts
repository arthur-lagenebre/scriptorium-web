import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../models/card';
import { CardSet } from "../../../models/cardSet";
import { Language } from "../../../models/language";
import { Observable } from 'rxjs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ct-text',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
  @Input() card$!: Observable<Card>;
  @Input() language: string = "en";

  constructor() { }

  GetValue(languages: Language[]): string {
    return languages.find(x => x.Code === this.language)?.Value || "";
  }

  GetManaCost(manaCost: string): string {
    let result: string = "";
    let regex = /{(\w|\/)+}/gi;
    let match;
    while ((match = regex.exec(manaCost)) !== null) {
      result += '<i class="ms ms-'+ match[0].substring(1, match[0].length-1).toLocaleLowerCase() + ' ms-cost ms-shadow"></i>';
    }
    return result !== "" ? "&nbsp;&nbsp;" + result : "";
  }

  GetText(languages: Language[], typelines: Language[]): string {
    let result: string = languages.find(x => x.Code === this.language)?.Value || "";
    let typeline = typelines.find(x => x.Code === "en")?.Value || "";

    result = this.ReplaceReturnLine(result);
    result = this.ReplaceMana(result);

    if (typeline.includes("Planeswalker")) {
      result = this.ReplaceLoyalty(result);
    } else if (typeline.includes("Saga")) {
      result = this.ReplaceSaga(result);
    }

    if (result.includes("Level up ")) {
      result = this.ReplaceLevelUp(result);
    }

    return result;
  }

  ReplaceSaga(text: string): string {
    let regex = /(I|II|III|IV|V|VI)(( —)|, )/gi;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      text = text.replace(match[0], '<i class="ms ms-saga ms-2x ms-saga-'+ this.RomanToInt(match[1]) + '"></i>');
    }

    return text;
  }

  RomanToInt(s: string): number {
    const roman: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let total = 0;
    let prevValue = 0;

    for (let i = s.length - 1; i >= 0; i--) {

      const currentValue = roman[s[i]];

      if (currentValue < prevValue) {
        total -= currentValue;
      } else {
        total += currentValue;
      }

      prevValue = currentValue;
    }

    return total;
  };

  ReplaceReturnLine(text: string): string {
    let regexRL = /\n/gi;
    return `<span>${text.replace(regexRL, "</span><br /><span>")}</span>`;
  }

  ReplaceMana(text: string): string {
    let regex = /{(\w|\/)+}/gi;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      text = text.replace(match[0], '<i class="ms ms-'+ this.GetMana(match[0]) + ' ms-cost ms-shadow"></i>');
    }

    return text;
  }

  GetMana(match: string): string {
    return match.substring(1, match.length - 1)
                .replace("T", "TAP")
                .replace("/", "")
                .toLocaleLowerCase(); 
  }

  ReplaceLoyalty(text: string): string {
      let regex = /(−|\+)?(\d+|X):/gi;
      let match;
  
      while ((match = regex.exec(text)) !== null) {
        text = text.replace(match[0], '<i class="ms ms-loyalty-'+ this.GetLoyaltySymbol(match[1]) + ' ms-loyalty-' + match[2] + '"></i>:');
      }

      return text;
  }

  GetLoyaltySymbol(symbol?: string): string {
    if (symbol === "+") {
      return "up";
    } else if (symbol === "−") {
      return "down";
    }

    return "zero";
  }

  ReplaceLevelUp(text: string): string {
    let regex = /LEVEL (\d{1,2}(\+|-\d{1,2}))/gi;
    let match;

    while ((match = regex.exec(text)) !== null) {
      text = text.replace(match[0], '<i class="ms ms-level ms-3x"><span>' + match[1] + '</span></i>');
    }

    return text;
  }

  GetArtist(sets: CardSet[], index: number): string {
    return sets.find(x => x.Order === 1)?.Flavors[index].Artist || "";
  }

  GetFlavorName(sets: CardSet[], index: number): string {
    return sets.find(x => x.Order === 1)?.Flavors[index].FlavorName || "";
  }

  GetFlavorText(sets: CardSet[], index: number): string {
    return sets.find(x => x.Order === 1)?.Flavors[index].FlavorText || "";
  }
}
