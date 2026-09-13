import { ChangeDetectionStrategy, Component, ElementRef, input, model, viewChildren } from '@angular/core';
import { languageName } from '../../core/language/language.service';

@Component({
  selector: 'app-language-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="rail" [attr.aria-label]="label()">
      <ul role="tablist" aria-orientation="vertical">
        @for (code of languages(); track code; let i = $index) {
          <li role="none">
            <button
              #entry
              role="tab"
              [id]="'lang-' + code"
              [attr.aria-selected]="code === selected()"
              [tabindex]="code === selected() ? 0 : -1"
              [class.is-selected]="code === selected()"
              [class.is-official]="code === 'en'"
              (click)="selected.set(code)"
              (keydown)="onKeydown($event, i)">
              <span class="code" aria-hidden="true">{{ code }}</span>
              <span class="name" [attr.lang]="code">{{ name(code) }}</span>
            </button>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    .rail {
      background: var(--ink-soft);
      border-inline-end: 1px solid var(--ink-line);
      block-size: 100%;
    }

    ul {
      margin: 0;
      padding: var(--space-2) 0;
      list-style: none;
    }

    button {
      display: flex;
      flex-direction: column;
      gap: 2px;
      inline-size: 100%;
      padding: var(--space-2) var(--space-3);
      border: 0;
      border-inline-start: 3px solid transparent;
      border-radius: 0;
      text-align: start;
      color: var(--text-on-ink-quiet);
    }

    button:hover {
      color: var(--text-on-ink);
      background: color-mix(in srgb, var(--brass) 12%, transparent);
    }

    .is-selected {
      color: var(--text-on-ink);
      border-inline-start-color: var(--brass);
      background: color-mix(in srgb, var(--brass) 18%, transparent);
    }

    .is-official .code::after {
      content: '';
      display: inline-block;
      inline-size: 1.4em;
      border-block-end: 1px solid currentColor;
      margin-inline-start: 0.4em;
      vertical-align: 0.25em;
    }

    .code {
      font-size: var(--size-xs);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.04em;
    }

    .name {
      font-size: var(--size-sm);
      line-height: var(--leading-tight);
    }

    @media (max-width: 48rem) {
      .rail {
        block-size: auto;
        border-inline-end: 0;
        border-block-end: 1px solid var(--ink-line);
      }

      ul {
        display: flex;
        overflow-x: auto;
        padding: 0;
      }

      button {
        inline-size: auto;
        border-inline-start: 0;
        border-block-end: 3px solid transparent;
      }

      .is-selected {
        border-inline-start-color: transparent;
        border-block-end-color: var(--brass);
      }
    }
  `,
})
export class LanguageRailComponent {
  readonly languages = input.required<string[]>();
  readonly selected = model.required<string>();
  readonly label = input('Langues disponibles');

  private readonly entries = viewChildren<ElementRef<HTMLButtonElement>>('entry');

  protected readonly name = languageName;

  onKeydown(event: KeyboardEvent, index: number): void {
    const codes = this.languages();
    const last = codes.length - 1;

    let target: number | null = null;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        target = index === last ? 0 : index + 1;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        target = index === 0 ? last : index - 1;
        break;
      case 'Home':
        target = 0;
        break;
      case 'End':
        target = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.selected.set(codes[target]);
    this.entries()[target]?.nativeElement.focus();
  }
}
