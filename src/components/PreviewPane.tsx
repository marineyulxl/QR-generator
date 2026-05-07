import { memo, type RefObject } from 'react';

import { useI18n } from '../i18n/I18nProvider';
import type { OutputMode } from '../qr/types';

type Props = {
  qrContainerRef: RefObject<HTMLDivElement | null>;
  hasGenerated: boolean;
  outputMode: OutputMode;
  caption: string;
  content: string;
  downloadPng: () => void;
  downloadSvg: () => void;
  printQr: () => void;
};

export const PreviewPane = memo(function PreviewPane(props: Props) {
  const { t } = useI18n();
  const displayCaption =
    props.outputMode === 'withText'
      ? props.caption.trim() || props.content.trim().split('\n')[0] || ''
      : '';

  return (
    <section className="bg-stage-bg relative flex min-h-[480px] min-w-0 flex-1 flex-col items-center justify-center p-8 min-[1024px]:w-[60%]">
      <div
        id="print-area"
        className="border-outline-variant flex w-full max-w-lg flex-col items-center gap-6 rounded-[var(--radius-card)] border bg-white p-8 shadow-xl"
      >
        <div className="border-outline-variant qr-gradient relative flex aspect-square w-full max-w-[320px] flex-col items-center justify-center rounded-lg border">
          <div
            ref={props.qrContainerRef}
            className={`flex min-h-[280px] w-full items-center justify-center ${props.hasGenerated ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={!props.hasGenerated}
          />
          {!props.hasGenerated ? (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6">
              <span className="material-symbols-outlined text-outline-variant mb-4 text-[120px]">
                qr_code_2
              </span>
              <p className="text-on-surface-variant max-w-xs text-center text-sm leading-5">
                {t('preview.emptyHint')}
              </p>
            </div>
          ) : null}
        </div>

        {props.hasGenerated && displayCaption ? (
          <p className="text-on-surface max-w-full text-center text-sm leading-5">{displayCaption}</p>
        ) : null}

        <div className="border-outline-variant grid w-full grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-3">
          <button
            type="button"
            className="border-outline-variant text-on-surface-variant hover:bg-surface-container-low flex items-center justify-center gap-2 rounded-[var(--radius-button)] border py-2 text-xs font-medium transition-colors"
            onClick={() => props.downloadPng()}
          >
            <span className="material-symbols-outlined text-base">download</span>
            {t('preview.downloadPng')}
          </button>
          <button
            type="button"
            className="border-outline-variant text-on-surface-variant hover:bg-surface-container-low flex items-center justify-center gap-2 rounded-[var(--radius-button)] border py-2 text-xs font-medium transition-colors"
            onClick={() => props.downloadSvg()}
          >
            <span className="material-symbols-outlined text-base">code</span>
            {t('preview.downloadSvg')}
          </button>
          <button
            type="button"
            className="border-outline-variant text-on-surface-variant hover:bg-surface-container-low flex items-center justify-center gap-2 rounded-[var(--radius-button)] border py-2 text-xs font-medium transition-colors"
            onClick={() => props.printQr()}
          >
            <span className="material-symbols-outlined text-base">print</span>
            {t('preview.print')}
          </button>
        </div>
      </div>

      <p className="text-outline absolute bottom-6 right-6 hidden text-xs leading-4 min-[1024px]:block print:hidden">
        {t('preview.engineBadge')}
      </p>
    </section>
  );
});
