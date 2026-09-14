import { ChangeDetectionStrategy, Component, ElementRef, input, model, viewChildren } from '@angular/core';
import { languageName } from '../../core/language/language.service';

@Component({
  selector: 'app-language-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-rail.component.html',
  styleUrl: './language-rail.component.css',
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
