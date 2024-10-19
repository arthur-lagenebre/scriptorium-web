import { Component } from '@angular/core';
import { ImageComponent } from "../image/image.component";
import { TextComponent } from "../text/text.component";
import { SetsComponent } from "../sets/sets.component";
import { Card } from '../card';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

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
  currentLanguage: string = navigator.languages[1] || "en"

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentCard$ = this.activatedRoute.data.pipe(map(data => data['card']));
  }
}
