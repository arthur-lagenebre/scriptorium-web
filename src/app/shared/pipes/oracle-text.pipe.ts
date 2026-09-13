import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Rend la notation du texte oracle de Scryfall avec la typographie Magic.
 *
 * Pipe pur : le calcul n'a lieu que si le texte ou la langue changent,
 * contrairement à un appel de méthode depuis un gabarit, ré-évalué à
 * chaque cycle de détection.
 *
 * Sécurité : le texte est échappé AVANT toute injection de balises. C'est
 * indispensable ici, puisque ce texte sera bientôt saisi par des
 * contributeurs et non plus seulement importé de Scryfall.
 */
@Pipe({ name: 'oracleText' })
export class OracleTextPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(text: string | null | undefined): SafeHtml {
    if (!text) {
      return '';
    }

    const escaped = this.escape(text);

    const rendered = escaped
      .split('\n')
      .map(line => this.renderLine(line))
      .join('');

    return this.sanitizer.bypassSecurityTrustHtml(rendered);
  }

  private escape(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private renderLine(line: string): string {
    if (line.trim().length === 0) {
      return '';
    }

    let content = this.renderSymbols(line);
    content = this.renderReminder(content);

    // Capacité de loyauté : « +1: », « −2: », « 0: » en tête de ligne.
    const loyalty = content.match(/^([+−-]?(?:\d+|X)):\s*/);
    if (loyalty) {
      const cost = loyalty[1].replace(/^-/, '−');
      const rest = content.slice(loyalty[0].length);
      return `<p class="ability loyalty"><span class="loyalty-cost">${cost}</span>${rest}</p>`;
    }

    // Chapitre de saga : « I — », « II, III — ».
    const chapter = content.match(/^((?:[IVX]+(?:,\s*)?)+)\s*[—-]\s*/);
    if (chapter) {
      const rest = content.slice(chapter[0].length);
      return `<p class="ability chapter"><span class="chapter-mark">${chapter[1]}</span>${rest}</p>`;
    }

    // Palier de niveau : « LEVEL 2-4 ».
    const level = content.match(/^LEVEL\s+([\d+-]+)\s*/i);
    if (level) {
      const rest = content.slice(level[0].length);
      return `<p class="ability level"><span class="level-mark">${level[1]}</span>${rest}</p>`;
    }

    return `<p>${content}</p>`;
  }

  /**
   * Convertit les accolades de Scryfall en glyphes de mana-font.
   * {T} et {Q} ont leurs propres noms ; pour tout le reste, la règle est
   * uniforme : minuscules, barres obliques retirées. {W/U} devient wu,
   * {2/W} devient 2w, {W/P} devient wp.
   */
  private renderSymbols(line: string): string {
    return line.replace(/\{([^}]+)\}/g, (_, raw: string) => {
      const symbol = this.symbolClass(raw);
      const label = `{${raw}}`;
      return `<i class="ms ms-${symbol} ms-cost" role="img" aria-label="${label}"></i>`;
    });
  }

  private symbolClass(raw: string): string {
    const key = raw.toUpperCase();

    if (key === 'T') return 'tap';
    if (key === 'Q') return 'untap';
    if (key === '∞') return 'infinity';
    if (key === '½') return '1-2';

    return key.toLowerCase().replace(/\//g, '');
  }

  /** Le texte de rappel, entre parenthèses, s'imprime en italique sur les cartes. */
  private renderReminder(content: string): string {
    return content.replace(/\(([^)]+)\)/g, '<em class="reminder">($1)</em>');
  }
}
