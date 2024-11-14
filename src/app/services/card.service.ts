import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardUrl = '/assets/cards.json';

  constructor(private http: HttpClient, private router: Router) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardUrl);
  }

  getCardsByCardName(cardName: string): void {
    this.getCards()
        .pipe(map((Cards: Card[]) => Cards.filter(x => x.Names.find(y => y.Value.includes(cardName)))))
        .subscribe(cards => {
          if (cards.length === 0) { this.router.navigate(['./'])}
          if (cards.length === 1) { this.router.navigate([`./details/${cards[0].Id}`])}
          if (cards.length > 1) { this.router.navigate(['./card-list']) }
        });
  }

  getCard(id: string | null): Observable<Card | undefined> {
      return this.getCards()
                 .pipe(map((cards: Card[]) => cards.find(x => x.Id === id)));
  }
}
