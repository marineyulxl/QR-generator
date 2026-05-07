import { enMessages } from './locales/en';
import { zhMessages, type MessageKey } from './locales/zh';

export type { MessageKey };

export type Locale = 'zh' | 'en';

type MessageTable = Record<MessageKey, string>;

export const messagesByLocale: Record<Locale, MessageTable> = {
  zh: { ...zhMessages },
  en: enMessages,
};

const STORAGE_KEY = 'qr-studio-locale';

export function readStoredLocale(): Locale | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'zh' || raw === 'en') return raw;
  } catch {
    /* private mode */
  }
  return null;
}

export function writeStoredLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

export function resolveInitialLocale(): Locale {
  const stored = readStoredLocale();
  if (stored) return stored;
  const nav = typeof navigator !== 'undefined' ? navigator.language : '';
  return nav.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

export function interpolate(template: string, vars: Record<string, string | number>): string {
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{${k}}`, String(v));
  }
  return out;
}
