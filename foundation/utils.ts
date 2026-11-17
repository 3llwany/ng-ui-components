import { type TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

let uniqueIdCounter = 0;

export function createUniqueId(prefix = 'uid'): string {
  return `${prefix}_${++uniqueIdCounter}`;
}

export function getDirection(text?: string | number | null): 'rtl' | 'ltr' {
  if (text === null || text === undefined || text === '') return 'ltr';
  const rtlChars = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return rtlChars.test(String(text)) ? 'rtl' : 'ltr';
}

export async function translateText(
  translate: TranslateService | null,
  keyOrText: string,
): Promise<string> {
  if (!translate) return keyOrText;
  try {
    const translated = await firstValueFrom(translate.get(keyOrText));
    return translated || keyOrText;
  } catch {
    return keyOrText;
  }
}



