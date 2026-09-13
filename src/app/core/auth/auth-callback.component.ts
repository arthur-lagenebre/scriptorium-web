import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-callback',
  template: `
    @if (error()) {
      <p class="auth-error">La connexion a échoué. <a routerLink="/">Revenir à l'accueil</a></p>
    } @else {
      <p>Connexion en cours…</p>
    }
  `,
  styles: `.auth-error { padding: 2rem; }`,
})
export class AuthCallbackComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly error = signal(false);

  constructor() {
    void this.handle();
  }

  private async handle(): Promise<void> {
    const fragment = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const token = fragment.get('token');
    const next = fragment.get('next') ?? '/';

    if (!token) {
      this.error.set(true);
      return;
    }

    await this.auth.completeLogin(token);

    // replaceUrl efface le fragment de l'historique : le jeton ne reste pas
    // accessible par le bouton Précédent.
    await this.router.navigateByUrl(next, { replaceUrl: true });
  }
}
