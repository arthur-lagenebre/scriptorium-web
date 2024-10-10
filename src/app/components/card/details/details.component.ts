import { Component } from '@angular/core';
import { ImageComponent } from "../image/image.component";
import { TextComponent } from "../text/text.component";

@Component({
  selector: 'ct-details',
  standalone: true,
  imports: [ImageComponent, TextComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

}
