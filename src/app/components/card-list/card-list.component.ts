import { Component } from "@angular/core";
import { NgIf, NgFor, LowerCasePipe, CurrencyPipe } from "@angular/common";
import { Subscription } from "rxjs";
import { Card } from "../../models/card";
import { CardService } from "../../services/card.service";
import { RouterLink } from "@angular/router";
import { Sett } from "../../models/sett";

@Component({
  selector: 'ct-card-list',
  standalone: true,
  imports: [NgIf, NgFor, LowerCasePipe, CurrencyPipe, RouterLink],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  pageTitle = 'Card List';
  errorMessage = '';
  sub!: Subscription;
  cards: Card[] = [];

  constructor(private cardService: CardService) {}

  GetCardName(card: Card) {
    return card.Names.length ? card.Names[0].Value : card.CardFaces[0].Names[0].Value;
  }  

  GetImageUrl(Sets: Sett[]) {
    return Sets.find(x => x.Order === 1)?.ImageUrl;
  }
  
  ngOnInit(): void {
    this.sub = this.cardService.getCards().subscribe({
      next: cards => {
        this.cards = cards;
        console.log(cards);
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
