import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { C } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardUrl = '/assets/cards.json';

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardUrl);
  }

  getCardsByCardName(cardName: string): Observable<Card[] | undefined> {
    return this.getCards()
               .pipe(map((Cards: Card[]) => Cards.filter(x => x.Names.find(y => y.Value === cardName))));
  }

  getCard(oracleId: string | null): Observable<Card | undefined> {
      return this.getCards()
                 .pipe(map((cards: Card[]) => cards.find(x => x.OracleId === oracleId)));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
      let errorMessage = '';

      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }

      console.error(errorMessage);
      
      return throwError(() => errorMessage);
  }
}
