import type { ChangeEvent } from 'react';
import { memo, useRef } from 'react';
import type { ErrorCorrectionLevel, TypeNumber } from 'qr-code-styling';

import { useI18n } from '../i18n/I18nProvider';
import type { ContentErrorKey, OutputMode } from '../qr/types';

type Props = {
  content: string;
  setContent: (v: string) => void;
  marginBlocks: number;
  setMarginBlocks: (v: number) => void;
  errorCorrection: ErrorCorrectionLevel;
  setErrorCorrection: (v: ErrorCorrectionLevel) => void;
  typeNumber: TypeNumber;
  setTypeNumber: (v: TypeNumber) => void;
  dotColorKey: string;
  setDotColorKey: (v: string) => void;
  bgColorKey: string;
  setBgColorKey: (v: string) => void;
  dotShape: string;
  setDotShape: (v: string) => void;
  eyeShape: string;
  setEyeShape: (v: string) => void;
  useEyeColor: boolean;
  setUseEyeColor: (v: boolean) => void;
  logoDataUrl: string | null;
  onLogoFile: (file: File | null) => void;
  openGalleryPlaceholder: () => void;
  outputMode: OutputMode;
  setOutputMode: (v: OutputMode) => void;
  caption: string;
  setCaption: (v: string) => void;
  contentErrorKey: ContentErrorKey | null;
  generateQr: () => void;
  downloadDefault: () => void;
};

const inputBase =
  'focus:border-primary h-10 w-full rounded-[var(--radius-input)] border border-outline-variant bg-[var(--color-input-bg)] px-3 text-sm leading-5 text-on-surface outline-none focus:ring-0';

const labelCls = 'mb-2 block text-sm font-medium leading-5 text-on-surface-variant';

function clampTypeNumber(n: number): TypeNumber {
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(40, Math.floor(n)) as TypeNumber;
}

export const ControlPanel = memo(function ControlPanel(props: Props) {
  const { t } = useI18n();
  const fileRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    props.onLogoFile(f);
    e.target.value = '';
  };

  return (
    <aside className="border-outline-variant bg-surface flex max-h-[45dvh] w-full shrink-0 flex-col gap-6 overflow-y-auto border-r px-5 py-5 min-[1024px]:max-h-none min-[1024px]:h-full min-[1024px]:w-[40%] min-[1024px]:max-w-[40%] min-[1024px]:shrink-0 min-[1024px]:px-6 min-[1024px]:py-6 print:hidden">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        aria-hidden
        onChange={onFileChange}
      />

      <section className="border-outline-variant rounded-[var(--radius-card)] border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium leading-7 text-on-surface">{t('panel.logo.title')}</h3>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="border-outline flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-lg border border-dashed bg-surface-container">
            {props.logoDataUrl ? (
              <img
                src={props.logoDataUrl}
                alt={t('panel.logo.previewAlt')}
                className="max-h-[92px] max-w-[92px] rounded object-contain"
              />
            ) : (
              <span className="material-symbols-outlined text-outline text-4xl">image</span>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <button
              type="button"
              className="border-outline-variant text-on-surface hover:bg-surface-container-low flex h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] border px-4 text-sm font-semibold transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <span className="material-symbols-outlined text-base">upload</span>
              <span>{t('panel.logo.upload')}</span>
            </button>
            <button
              type="button"
              className="border-outline-variant text-on-surface hover:bg-surface-container-low flex h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] border px-4 text-sm font-semibold transition-colors"
              onClick={props.openGalleryPlaceholder}
            >
              <span className="material-symbols-outlined text-base">grid_view</span>
              <span>{t('panel.logo.gallery')}</span>
            </button>
          </div>
        </div>
      </section>

      <section className="border-outline-variant rounded-[var(--radius-card)] border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium leading-7 text-on-surface">{t('panel.dots.title')}</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className={labelCls} htmlFor="dot-color">
                {t('panel.dots.color')}
              </label>
              <select
                id="dot-color"
                className={inputBase}
                value={props.dotColorKey}
                onChange={(e) => props.setDotColorKey(e.target.value)}
              >
                <option value="black">{t('options.color.black')}</option>
                <option value="blue">{t('options.color.blue')}</option>
                <option value="indigo">{t('options.color.indigo')}</option>
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="dot-shape">
                {t('panel.dots.shape')}
              </label>
              <select
                id="dot-shape"
                className={inputBase}
                value={props.dotShape}
                onChange={(e) => props.setDotShape(e.target.value)}
              >
                <option value="normal">{t('options.shape.normal')}</option>
                <option value="rounded">{t('options.shape.rounded')}</option>
                <option value="dots">{t('options.shape.dots')}</option>
                <option value="extra-rounded">{t('options.shape.extraRounded')}</option>
              </select>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <input
                id="eye-color"
                type="checkbox"
                className="border-outline-variant text-primary focus:ring-primary h-4 w-4 rounded border"
                checked={props.useEyeColor}
                onChange={(e) => props.setUseEyeColor(e.target.checked)}
              />
              <label htmlFor="eye-color" className="text-sm leading-5 text-on-surface-variant">
                {t('panel.dots.eyeColor')}
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className={labelCls} htmlFor="bg-color">
                {t('panel.dots.bgColor')}
              </label>
              <select
                id="bg-color"
                className={inputBase}
                value={props.bgColorKey}
                onChange={(e) => props.setBgColorKey(e.target.value)}
              >
                <option value="white">{t('options.bg.white')}</option>
                <option value="slate">{t('options.bg.slate')}</option>
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="eye-shape">
                {t('panel.dots.eyeShape')}
              </label>
              <select
                id="eye-shape"
                className={inputBase}
                value={props.eyeShape}
                onChange={(e) => props.setEyeShape(e.target.value)}
              >
                <option value="square">{t('options.eye.square')}</option>
                <option value="dot">{t('options.eye.dot')}</option>
                <option value="extra-rounded">{t('options.eye.extraRounded')}</option>
                <option value="rounded">{t('options.eye.rounded')}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="border-outline-variant rounded-[var(--radius-card)] border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium leading-7 text-on-surface">{t('panel.more.title')}</h3>
        <div className="mb-4 grid grid-cols-2 gap-6">
          <div>
            <label className={labelCls} htmlFor="margin">
              {t('panel.more.margin')}
            </label>
            <select
              id="margin"
              className={inputBase}
              value={props.marginBlocks}
              onChange={(e) => props.setMarginBlocks(Number(e.target.value))}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {t('options.marginBlocks', { count: n })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="ec-level">
              {t('panel.more.errorCorrection')}
            </label>
            <select
              id="ec-level"
              className={inputBase}
              value={props.errorCorrection}
              onChange={(e) => props.setErrorCorrection(e.target.value as ErrorCorrectionLevel)}
            >
              <option value="L">{t('options.ec.L')}</option>
              <option value="M">{t('options.ec.M')}</option>
              <option value="Q">{t('options.ec.Q')}</option>
              <option value="H">{t('options.ec.H')}</option>
            </select>
          </div>
          <div className="col-span-2 min-[480px]:col-span-1">
            <label className={labelCls} htmlFor="version">
              {t('panel.more.version')}
            </label>
            <input
              id="version"
              type="number"
              min={0}
              max={40}
              className={inputBase}
              value={props.typeNumber}
              onChange={(e) => props.setTypeNumber(clampTypeNumber(Number(e.target.value)))}
            />
            <p className="text-on-surface-variant mt-1 text-xs leading-4">{t('panel.more.versionHint')}</p>
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="content">
            {t('panel.more.content')}
          </label>
          <textarea
            id="content"
            rows={4}
            className={`${inputBase} h-24 resize-none py-2 ${props.contentErrorKey ? 'border-error' : ''}`}
            value={props.content}
            onChange={(e) => props.setContent(e.target.value)}
            aria-invalid={props.contentErrorKey !== null}
            aria-describedby={props.contentErrorKey ? 'content-err' : undefined}
          />
          {props.contentErrorKey === 'emptyContent' ? (
            <p id="content-err" className="text-error mt-1 text-xs leading-4">
              {t('errors.emptyContent')}
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-outline-variant rounded-[var(--radius-card)] border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium leading-7 text-on-surface">{t('panel.output.title')}</h3>
        <div className="bg-surface-container-low flex rounded-lg p-1">
          <button
            type="button"
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              props.outputMode === 'pure'
                ? 'bg-white text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => props.setOutputMode('pure')}
          >
            {t('panel.output.pure')}
          </button>
          <button
            type="button"
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              props.outputMode === 'withText'
                ? 'bg-white text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => props.setOutputMode('withText')}
          >
            {t('panel.output.withText')}
          </button>
        </div>
        {props.outputMode === 'withText' ? (
          <div className="mt-4">
            <label className={labelCls} htmlFor="caption">
              {t('panel.output.captionLabel')}
            </label>
            <input
              id="caption"
              type="text"
              className={inputBase}
              placeholder={t('panel.output.captionPlaceholder')}
              value={props.caption}
              onChange={(e) => props.setCaption(e.target.value)}
            />
          </div>
        ) : null}
      </section>

      <div className="flex flex-col gap-4 pb-8 pt-2">
        <button
          type="button"
          className="bg-primary-container text-on-primary-container hover:opacity-95 active:scale-[0.99] h-11 w-full rounded-[var(--radius-button)] text-sm font-semibold shadow-md transition-all"
          onClick={props.generateQr}
        >
          {t('panel.actions.generate')}
        </button>
        <button
          type="button"
          className="border-outline-variant text-on-surface hover:bg-surface-container-low active:scale-[0.99] h-11 w-full rounded-[var(--radius-button)] border bg-white text-sm font-semibold transition-all"
          onClick={props.downloadDefault}
        >
          {t('panel.actions.download')}
        </button>
      </div>
    </aside>
  );
});
