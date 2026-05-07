import type { ErrorCorrectionLevel, TypeNumber } from 'qr-code-styling';

export type OutputMode = 'pure' | 'withText';

/** Stable keys for validation messages — copy comes from i18n. */
export type ContentErrorKey = 'emptyContent';

export type QrStudioState = {
  content: string;
  marginBlocks: number;
  errorCorrection: ErrorCorrectionLevel;
  typeNumber: TypeNumber;
  dotColorKey: string;
  bgColorKey: string;
  dotShape: string;
  eyeShape: string;
  useEyeColor: boolean;
  logoDataUrl: string | null;
  outputMode: OutputMode;
  caption: string;
  hasGenerated: boolean;
  contentErrorKey: ContentErrorKey | null;
};

export type QrStudioAction =
  | { type: 'patch'; patch: Partial<QrStudioState> }
  | { type: 'generate' }
  | { type: 'generateInvalid' };
