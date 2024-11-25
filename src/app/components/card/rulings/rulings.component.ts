import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../../../models/card';

@Component({
  selector: 'ct-rulings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rulings.component.html',
  styleUrl: './rulings.component.scss'
})
export class RulingsComponent {
  @Input() card$!: Observable<Card>;
  @Input() language: string = "en";
}
