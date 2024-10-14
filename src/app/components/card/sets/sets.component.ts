import { Component, Input } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'ct-sets',
  standalone: true,
  imports: [],
  templateUrl: './sets.component.html',
  styleUrl: './sets.component.scss'
})
export class SetsComponent {
  @Input() card: Card | undefined;
}
