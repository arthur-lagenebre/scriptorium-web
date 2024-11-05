import { Component } from '@angular/core';
import { SearchComponent } from "../shared/search/search.component";

@Component({
  selector: 'ct-home',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Card tutor';
}
