import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface UserRole {
  role: string;
  language: string | null;
}

export interface CurrentUser {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  provider: string;
  isBlocked: boolean;
  roles: UserRole[];
}

const TOKEN_KEY = 'scriptorium.token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private readonly _user = signal<CurrentUser | null>(null);

  readonly token = this._token.asReadonly();
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._token() !== null);
  readonly canEdit = computed(() => {
    const user = this._user();
    return user !== null && !user.isBlocked;
  });

  login(provider: 'google' | 'github', returnPath = '/'): void {
    const url = `${environment.apiBaseUrl}/api/auth/login/${provider}`
      + `?returnPath=${encodeURIComponent(returnPath)}`;

    window.location.href = url;
  }

  async completeLogin(token: string): Promise<void> {
    localStorage.setItem(TOKEN_KEY, token);
    this._token.set(token);
    await this.refreshUser();
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this._token.set(null);
    this._user.set(null);
  }

  async refreshUser(): Promise<void> {
    if (this._token() === null) {
      this._user.set(null);
      return;
    }

    try {
      const user = await firstValueFrom(
        this.http.get<CurrentUser>(`${environment.apiBaseUrl}/api/auth/me`)
      );
      this._user.set(user);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.logout();
      }
    }
  }
}
