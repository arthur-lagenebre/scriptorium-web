import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { AuthService } from '../../core/auth/auth.service';
import { CardApi, DisplayFace, TranslationFace } from '../../core/api/card.api';
import { languageName } from '../../core/language/language.service';

interface EditorFace {
  faceId: number;
  name: string;
  typeline: string;
  text: string;
}

@Component({
  selector: 'app-translation-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
  templateUrl: './translation-editor.component.html',
  styleUrl: './translation-editor.component.css',
})
export class TranslationEditorComponent {
  private readonly api = inject(CardApi);
  readonly auth = inject(AuthService);

  readonly cardId = input.required<string>();
  readonly language = input.required<string>();
  /** Faces telles qu'affichées : elles servent à pré-remplir les champs. */
  readonly faces = input.required<DisplayFace[]>();

  readonly saved = output<void>();

  readonly model = signal<{ faces: EditorFace[]; comment: string }>({ faces: [], comment: '' });
  readonly f = form(this.model);

  private baseline = signal<EditorFace[]>([]);

  readonly saving = signal(false);
  readonly failed = signal(false);
  readonly message = signal<string | null>(null);

  readonly faceCount = computed(() => this.model().faces.length);
  readonly fullLanguage = computed(() => languageName(this.language()));

  /** Rien à enregistrer tant qu'aucun champ n'a bougé. */
  readonly dirty = computed(() => {
    const current = this.model().faces;
    const initial = this.baseline();

    return current.some((face, index) =>
      face.name !== (initial[index]?.name ?? '')
      || face.typeline !== (initial[index]?.typeline ?? '')
      || face.text !== (initial[index]?.text ?? ''));
  });

  constructor() {
    effect(() => {
      this.cardId();
      this.language();
      this.fill(this.faces());
    });
  }

  private fill(faces: DisplayFace[]): void {
    const editable: EditorFace[] = faces.map(face => ({
      faceId: face.faceId,
      name: face.name ?? '',
      typeline: face.typeline ?? '',
      text: face.text ?? '',
    }));

    this.baseline.set(editable.map(face => ({ ...face })));
    this.model.set({ faces: editable, comment: '' });
    this.message.set(null);
    this.failed.set(false);
  }

  reset(): void {
    this.model.set({
      faces: this.baseline().map(face => ({ ...face })),
      comment: '',
    });
    this.message.set(null);
  }

  async save(): Promise<void> {
    this.saving.set(true);
    this.failed.set(false);
    this.message.set(null);

    const current = this.model();

    const payload: TranslationFace[] = current.faces.map(face => ({
      faceId: face.faceId,
      name: face.name.trim() || null,
      typeline: face.typeline.trim() || null,
      text: face.text.trim() || null,
    }));

    try {
      const result = await this.api.saveTranslation(
        this.cardId(),
        this.language(),
        payload,
        current.comment.trim() || null
      );

      this.message.set(result.revisions === 0 ? 'Aucun changement à enregistrer.' : `${result.revisions} modification${result.revisions > 1 ? 's' : ''} enregistrée${result.revisions > 1 ? 's' : ''}.`);

      this.baseline.set(current.faces.map(face => ({ ...face })));
      this.saved.emit();
    } catch {
      this.failed.set(true);
      this.message.set("L'enregistrement a échoué. Vos modifications sont toujours dans le formulaire.");
    } finally {
      this.saving.set(false);
    }
  }
}
