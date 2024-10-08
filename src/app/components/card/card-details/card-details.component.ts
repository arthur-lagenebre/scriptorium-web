import { Component } from '@angular/core';
import { CardImageComponent } from "../card-image/card-image.component";
import { CardInformationsComponent } from "../card-informations/card-informations.component";
@Component({
  selector: 'ct-card-details',
  standalone: true,
  imports: [CardImageComponent, CardInformationsComponent],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {

}
