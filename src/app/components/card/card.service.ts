import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { Card } from "./card";

@Injectable({
    providedIn: 'root'
})
export class CardService {
    private cardUrl = 'assets/cards.json';

    constructor(private http: HttpClient) { }

    getCards(): Observable<Card[]> {
        return this.http.get<Card[]>(this.cardUrl)
          .pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
          );
    }

    getCard(oracleId: string): Observable<Card | undefined> {
        return this.getCards()
          .pipe(
            map((cards: Card[]) => cards.find(x => x.OracleId === oracleId))
          );
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
      }
}
