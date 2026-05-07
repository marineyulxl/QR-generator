import { useCallback, useEffect, useReducer, useRef } from 'react';
import type QRCodeStyling from 'qr-code-styling';

import { useI18n } from '../i18n/I18nProvider';
import { buildQrOptions } from '../qr/build-options';
import { triggerDownload } from '../qr/download';
import { initialQrStudioState, qrStudioReducer } from '../qr/qr-studio-reducer';
import type { QrStudioState } from '../qr/types';

export type { OutputMode } from '../qr/types';

type QrCodeStylingInstance = InstanceType<typeof QRCodeStyling>;

function getQrCodeStylingConstructor() {
  return import('qr-code-styling').then((m) => m.default);
}

export function useQrStudio() {
  const { t } = useI18n();
  const [state, dispatch] = useReducer(qrStudioReducer, initialQrStudioState);

  const stateRef = useRef(state);
  stateRef.current = state;

  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QrCodeStylingInstance | null>(null);
  const ensureRef = useRef<() => Promise<QrCodeStylingInstance | null>>(async () => null);

  ensureRef.current = async () => {
    const el = qrContainerRef.current;
    if (!el) return null;

    if (!qrCodeRef.current) {
      const QRCodeStyling = await getQrCodeStylingConstructor();
      el.innerHTML = '';
      const qr = new QRCodeStyling(buildQrOptions(stateRef.current));
      qr.append(el);
      qrCodeRef.current = qr;
    }

    return qrCodeRef.current;
  };

  /** Split effect: teardown only (vercel rerender-split-combined-hooks). */
  useEffect(() => {
    return () => {
      const el = qrContainerRef.current;
      if (el) el.innerHTML = '';
      qrCodeRef.current = null;
    };
  }, []);

  /** Sync imperative QR when encoded-relevant state changes (after first generate). */
  useEffect(() => {
    if (!state.hasGenerated || !qrCodeRef.current) return;
    qrCodeRef.current.update(buildQrOptions(state));
  }, [
    state.hasGenerated,
    state.content,
    state.marginBlocks,
    state.errorCorrection,
    state.typeNumber,
    state.dotColorKey,
    state.bgColorKey,
    state.dotShape,
    state.eyeShape,
    state.useEyeColor,
    state.logoDataUrl,
  ]);

  const setContent = useCallback((content: string) => {
    dispatch({ type: 'patch', patch: { content, contentErrorKey: null } });
  }, []);

  const setMarginBlocks = useCallback((marginBlocks: number) => {
    dispatch({ type: 'patch', patch: { marginBlocks } });
  }, []);

  const setErrorCorrection = useCallback(
    (errorCorrection: QrStudioState['errorCorrection']) => {
      dispatch({ type: 'patch', patch: { errorCorrection } });
    },
    [],
  );

  const setTypeNumber = useCallback((typeNumber: QrStudioState['typeNumber']) => {
    dispatch({ type: 'patch', patch: { typeNumber } });
  }, []);

  const setDotColorKey = useCallback((dotColorKey: string) => {
    dispatch({ type: 'patch', patch: { dotColorKey } });
  }, []);

  const setBgColorKey = useCallback((bgColorKey: string) => {
    dispatch({ type: 'patch', patch: { bgColorKey } });
  }, []);

  const setDotShape = useCallback((dotShape: string) => {
    dispatch({ type: 'patch', patch: { dotShape } });
  }, []);

  const setEyeShape = useCallback((eyeShape: string) => {
    dispatch({ type: 'patch', patch: { eyeShape } });
  }, []);

  const setUseEyeColor = useCallback((useEyeColor: boolean) => {
    dispatch({ type: 'patch', patch: { useEyeColor } });
  }, []);

  const setLogoDataUrl = useCallback((logoDataUrl: string | null) => {
    dispatch({ type: 'patch', patch: { logoDataUrl } });
  }, []);

  const setOutputMode = useCallback((outputMode: QrStudioState['outputMode']) => {
    dispatch({ type: 'patch', patch: { outputMode } });
  }, []);

  const setCaption = useCallback((caption: string) => {
    dispatch({ type: 'patch', patch: { caption } });
  }, []);

  const generateQr = useCallback(() => {
    const s = stateRef.current;
    const trimmed = s.content.trim();
    if (!trimmed) {
      dispatch({ type: 'generateInvalid' });
      return;
    }

    const next: QrStudioState = { ...s, contentErrorKey: null, hasGenerated: true };
    dispatch({ type: 'generate' });

    void (async () => {
      const qr = await ensureRef.current();
      if (qr) qr.update(buildQrOptions(next));
    })();
  }, [dispatch]);

  const downloadPng = useCallback(async () => {
    if (!stateRef.current.hasGenerated) return;
    await ensureRef.current();
    const qr = qrCodeRef.current;
    if (!qr) return;
    qr.update(buildQrOptions(stateRef.current));
    const raw = await qr.getRawData('png');
    if (raw instanceof Blob) {
      triggerDownload(raw, 'qr-studio.png', 'image/png');
    }
  }, []);

  const downloadSvg = useCallback(async () => {
    if (!stateRef.current.hasGenerated) return;
    await ensureRef.current();
    const qr = qrCodeRef.current;
    if (!qr) return;
    qr.update(buildQrOptions(stateRef.current));
    const raw = await qr.getRawData('svg');
    if (raw instanceof Blob) {
      triggerDownload(raw, 'qr-studio.svg', 'image/svg+xml');
    } else if (typeof raw === 'string') {
      triggerDownload(raw, 'qr-studio.svg', 'image/svg+xml');
    }
  }, []);

  const downloadDefault = useCallback(() => {
    void downloadPng();
  }, [downloadPng]);

  const printQr = useCallback(() => {
    if (!stateRef.current.hasGenerated) return;
    window.print();
  }, []);

  const onLogoFile = useCallback((file: File | null) => {
    if (!file) {
      setLogoDataUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }, [setLogoDataUrl]);

  const openGalleryPlaceholder = useCallback(() => {
    window.alert(t('gallery.comingSoon'));
  }, [t]);

  return {
    qrContainerRef,
    content: state.content,
    setContent,
    marginBlocks: state.marginBlocks,
    setMarginBlocks,
    errorCorrection: state.errorCorrection,
    setErrorCorrection,
    typeNumber: state.typeNumber,
    setTypeNumber,
    dotColorKey: state.dotColorKey,
    setDotColorKey,
    bgColorKey: state.bgColorKey,
    setBgColorKey,
    dotShape: state.dotShape,
    setDotShape,
    eyeShape: state.eyeShape,
    setEyeShape,
    useEyeColor: state.useEyeColor,
    setUseEyeColor,
    logoDataUrl: state.logoDataUrl,
    onLogoFile,
    openGalleryPlaceholder,
    outputMode: state.outputMode,
    setOutputMode,
    caption: state.caption,
    setCaption,
    hasGenerated: state.hasGenerated,
    contentErrorKey: state.contentErrorKey,
    generateQr,
    downloadPng,
    downloadSvg,
    downloadDefault,
    printQr,
  };
}
