import type { Translations } from './en'
import en from './en'
import ptBR from './pt-BR'

const dictionaries: Record<string, Translations> = {
  en,
  'pt-BR': ptBR,
}

/**
 * Returns a `t(key)` accessor that resolves dot-notation keys against the
 * locale dictionary. Falls back to `en` for unknown locales or missing keys.
 *
 * String keys return `string`. Function keys return the function itself —
 * the caller invokes it (e.g. `t('matrix.protocolCount')(42)`).
 */
export function useTranslations(locale: string = 'en') {
  const dict = dictionaries[locale] ?? dictionaries.en

  return function t(key: string): any {
    const parts = key.split('.')
    let current: any = dict
    for (const part of parts) {
      if (current == null) return key
      current = current[part]
    }
    return current ?? key
  }
}
