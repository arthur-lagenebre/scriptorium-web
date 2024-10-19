import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CardService } from '../services/card.service';

export const cardResolver: ResolveFn<Object> = (route, state) => {
  const cardId = route.paramMap.get('id');
  return inject(CardService).getCard(cardId);
}