import { Component } from '@angular/core';
import { ImageComponent } from "../image/image.component";
import { TextComponent } from "../text/text.component";
import { SetsComponent } from "../sets/sets.component";
import { Card } from '../../../models/card';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'ct-details',
  standalone: true,
  imports: [ImageComponent, TextComponent, SetsComponent, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  errorMessage: string = '';
  currentCard$!: Observable<Card>;
  defaultLanguage: string = navigator.languages[1] || "en";
  currentLanguage: string = "";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentCard$ = this.activatedRoute.data.pipe(map(data => data['card']));
    this.currentCard$.subscribe(next =>
      this.currentLanguage = next.Languages.find(x => x === this.defaultLanguage) ? this.defaultLanguage : next.Languages[0]
    )
  }
}
