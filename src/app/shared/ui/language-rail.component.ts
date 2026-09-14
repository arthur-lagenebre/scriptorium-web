import { ChangeDetectionStrategy, Component, ElementRef, computed, input, model, viewChildren } from '@angular/core';
import { LanguageEntry } from '../../core/language/language.service';

@Component({
  selector: 'app-language-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-rail.component.html',
  styleUrl: './language-rail.component.scss',
})
export class LanguageRailComponent {
  readonly entries = input.required<LanguageEntry[]>();
  readonly selected = model.required<string>();
  readonly label = input('Langues');

  private readonly buttons = viewChildren<ElementRef<HTMLButtonElement>>('entry');

  /** Rang de la première langue non traduite, où insérer le titre de groupe. */
  readonly firstTodo = computed(() => {
    const index = this.entries().findIndex(entry => !entry.translated);
    return index === -1 ? -1 : index;
  });

  onKeydown(event: KeyboardEvent, index: number): void {
    const list = this.entries();
    const last = list.length - 1;

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
    this.selected.set(list[target].code);
    this.buttons()[target]?.nativeElement.focus();
  }
}
