import { NgFor, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Card } from "../../models/card";
import { CardSet } from "../../models/cardSet";
import { CardService } from "../../services/card.service";

@Component({
  selector: 'ct-card-list',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  pageTitle = 'Card List';
  errorMessage = '';
  cards: Card[] = [];
  router = inject(Router);
  cardService = inject(CardService);

  GetCardName(card: Card): string {
    return card.Names.length ? card.Names[0].Value : card.CardFaces[0].Names[0].Value;
  }  

  GetImageUrl(sets: CardSet[]): string {
    return sets.find(x => x.Order === 1)?.ImageUrls[0] || "";
  }
  
  ngOnInit(): void {
    this.cardService.cards$.subscribe((cards) => {
      this.cards = cards;
    });
  }
}
