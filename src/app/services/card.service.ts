import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  //private cardUrl = '/assets/cards.json';
  private cardUrl = 'https://localhost:7276/api/CardTutors/';

  private cardsSubject = new BehaviorSubject<Card[]>([]);

  cards$ = this.cardsSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardUrl);
  }

  getCardsByCardName(cardName: string): void {
    if (!cardName) {
      this.router.navigate(['./']);
      return;
    }

    this.http.get<Card[]>(`${this.cardUrl}search/${cardName}`)
        .subscribe(cards => {
          if (cards.length === 1) { this.router.navigate([`./details/${cards[0].Id}`])}
          else {
            this.cardsSubject.next(cards);
            this.router.navigate(['./card-list'])
          }
        });
  }

  getCard(id: string | null): Observable<Card | undefined> {
      return this.http.get<Card>(`${this.cardUrl}${id}`);
  }
}
