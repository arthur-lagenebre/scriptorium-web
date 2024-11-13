import { Component } from '@angular/core';
import { SearchComponent } from "../shared/search/search.component";

@Component({
  selector: 'ct-header',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
