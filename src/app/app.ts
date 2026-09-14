import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { LanguageService } from './core/language/language.service';
import { LanguageRailComponent } from './shared/ui/language-rail.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, LanguageRailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly auth = inject(AuthService);
  readonly language = inject(LanguageService);

  constructor() {
    void this.auth.refreshUser();
    this.language.setAvailable(['en', 'fr', 'ja', 'ru', 'zhs', 'he']);
  }
}
