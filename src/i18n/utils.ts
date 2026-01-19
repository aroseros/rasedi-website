// Map keys to the JSON files
import en from './en.json';
import ar from './ar.json';
import ku from './ku.json';

export const languages = {
    en: 'English',
    ar: 'العربية',
    ku: 'کوردی'
};

export const defaultLang = 'en';

export const ui = {
    en,
    ar,
    ku,
} as const;

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        const value = (ui[lang] as any)[key];
        return value !== undefined ? value : ui[defaultLang][key];
    }
}
