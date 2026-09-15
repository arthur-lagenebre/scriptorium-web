import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardApi, CardTutor, valueIn } from '../../core/api/card.api';
import { languageName } from '../../core/language/language.service';

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnDestroy {
  private readonly api = inject(CardApi);

  readonly query = signal('');
  readonly results = signal<CardTutor[]>([]);
  readonly loading = signal(false);
  readonly error = signal(false);

  private timer?: ReturnType<typeof setTimeout>;
  private latest = 0;

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);

    clearTimeout(this.timer);

    const term = value.trim();

    if (term.length < 3) {
      this.results.set([]);
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.timer = setTimeout(() => void this.run(term), 300);
  }

  private async run(term: string): Promise<void> {
    const ticket = ++this.latest;
    this.error.set(false);

    try {
      const found = await this.api.search(term);

      if (ticket !== this.latest)
        return;

      this.results.set(found);
    } catch {
      if (ticket !== this.latest)
        return;
      this.error.set(true);
      this.results.set([]);
    } finally {
      if (ticket === this.latest)
        this.loading.set(false);
    }
  }

  name(card: CardTutor): string {
    return valueIn(card.names, 'en') ?? card.names[0]?.value ?? 'Sans nom';
  }

  typeline(card: CardTutor): string {
    const own = valueIn(card.typelines, 'en');
    if (own)
      return own;

    const first = card.cardFaces?.[0];
    return first ? valueIn(first.typelines, 'en') ?? '' : '';
  }

  fullName(code: string): string {
    return languageName(code);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
