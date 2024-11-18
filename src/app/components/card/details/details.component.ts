import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Card } from '../../../models/card';
import { ImageComponent } from "../image/image.component";
import { SetsComponent } from "../sets/sets.component";
import { TextComponent } from "../text/text.component";

@Component({
  selector: 'ct-details',
  standalone: true,
  imports: [ImageComponent, TextComponent, SetsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  errorMessage: string = '';
  currentCard$!: Observable<Card>;
  defaultLanguage: string = navigator.languages[1] || "en";
  currentLanguage: string = "";
  selectedSet: number = 1;

  constructor(private activatedRoute: ActivatedRoute) { }

  UpdateSetId(id: number): void {
    this.selectedSet = id;
  }

  ngOnInit() {
    this.currentCard$ = this.activatedRoute.data.pipe(map(data => data['card']));
    this.currentCard$.subscribe(next =>
      this.currentLanguage = next.Languages.find(x => x === this.defaultLanguage) ? this.defaultLanguage : next.Languages[0]
    )
  }
}
