import { useI18n } from '../i18n/I18nProvider';

const navItem =
  'text-on-surface-variant font-medium hover:text-primary transition-colors text-sm leading-5';

export function AppHeader() {
  const { locale, toggleLocale, t } = useI18n();

  return (
    <header className="bg-surface border-b border-outline-variant flex h-16 w-full shrink-0 items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold leading-7 text-on-surface">{t('meta.title')}</span>
        <nav className="ml-8 hidden min-[1024px]:flex gap-6" aria-label="Main">
          <a
            className="border-primary text-primary border-b-2 pb-2 text-sm font-semibold leading-5"
            href="#"
          >
            {t('nav.dashboard')}
          </a>
          <a className={navItem} href="#">
            {t('nav.history')}
          </a>
          <a className={navItem} href="#">
            {t('nav.templates')}
          </a>
          <a className={navItem} href="#">
            {t('nav.analytics')}
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="border-outline-variant text-on-surface hover:bg-surface-container-low h-9 min-w-[4.5rem] rounded-[var(--radius-button)] border bg-white px-3 text-sm font-medium transition-colors"
          onClick={toggleLocale}
          aria-label={t('lang.toggleAria')}
        >
          {locale === 'zh' ? t('lang.shortEn') : t('lang.shortZh')}
        </button>
        <button
          type="button"
          className="material-symbols-outlined text-on-surface-variant cursor-pointer border-0 bg-transparent p-1"
          aria-label={t('header.helpAria')}
        >
          help
        </button>
      </div>
    </header>
  );
}
