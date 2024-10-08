import { Component } from '@angular/core';

@Component({
  selector: 'ct-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
}
