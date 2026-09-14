import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

/**
 * Maquette jetable : vérifie la syntaxe réelle des Signal Forms en v22
 * avant de construire le formulaire d'édition.
 *
 * Trois choses à valider ici :
 *   1. la liaison bidirectionnelle entre le signal et le champ ;
 *   2. l'état de validation lisible comme un signal ;
 *   3. un tableau de champs de taille variable, puisque le formulaire
 *      réel aura autant de blocs que la carte a de faces.
 */
@Component({
  selector: 'app-forms-spike',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField],
  templateUrl: './forms-spike.component.html',
  styleUrl: './forms-spike.component.css',
})
export class FormsSpikeComponent {
  // Le signal est la source de vérité ; le formulaire reste synchronisé
  // avec lui dans les deux sens.
  readonly model = signal({
    name: '',
    text: '',
    faces: [{ value: 'Face initiale' }],
  });

  readonly f = form(this.model, path => {
    required(path.name, { message: 'Le nom est obligatoire.' });
  });

  addFace(): void {
    this.model.update(current => ({
      ...current,
      faces: [...current.faces, { value: '' }],
    }));
  }

  debug(): string {
    return JSON.stringify(this.model(), null, 2);
  }
}
