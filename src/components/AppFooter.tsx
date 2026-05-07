import { useI18n } from '../i18n/I18nProvider';

export function AppFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-outline-variant bg-surface-container-lowest flex w-full shrink-0 flex-col items-center justify-between gap-4 border-t px-8 py-6 md:flex-row">
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm font-bold leading-5 text-on-surface">{t('meta.title')}</span>
        <p className="text-sm leading-5 text-on-surface-variant">{t('footer.copyright')}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <a
          className="text-sm leading-5 text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          {t('footer.privacy')}
        </a>
        <a
          className="text-sm leading-5 text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          {t('footer.terms')}
        </a>
        <a
          className="text-sm leading-5 text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          {t('footer.support')}
        </a>
        <a
          className="text-sm leading-5 text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          {t('footer.apiDocs')}
        </a>
      </div>
    </footer>
  );
}
