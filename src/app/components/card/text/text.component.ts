import { Component, Input } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'ct-text',
  standalone: true,
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
  @Input() card: Card | undefined;
  @Input() language: string = "";
}
