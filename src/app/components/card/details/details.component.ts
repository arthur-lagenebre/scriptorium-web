import { Component } from '@angular/core';
import { ImageComponent } from "../image/image.component";
import { TextComponent } from "../text/text.component";
import { SetsComponent } from "../sets/sets.component";
import { Card } from '../card';
import { CardService } from '../card.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ct-details',
  standalone: true,
  imports: [ImageComponent, TextComponent, SetsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  errorMessage = '';
  currentCard: Card | undefined;

  constructor(private route: ActivatedRoute,
              private cardService: CardService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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
