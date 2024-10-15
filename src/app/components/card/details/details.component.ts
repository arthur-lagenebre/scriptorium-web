import { Component } from '@angular/core';
import { ImageComponent } from "../image/image.component";
import { TextComponent } from "../text/text.component";
import { SetsComponent } from "../sets/sets.component";
import { Card } from '../card';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'ct-details',
  standalone: true,
  imports: [ImageComponent, TextComponent, SetsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  errorMessage: string = '';
  currentCard: Card | undefined;
  currentLanguage: string = navigator.language || "en"

  constructor(private route: ActivatedRoute,
              private cardService: CardService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(navigator.language);
    if (id) {
      this.getCard(id);
    }
  }
  
  getCard(id: string): void {
    this.cardService.getCard(id).subscribe({
      next: card => this.currentCard = card,
      error: err => this.errorMessage = err
    });
  }
}
