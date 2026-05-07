import type { Options } from 'qr-code-styling';
import type { CornerDotType, CornerSquareType, DotType } from 'qr-code-styling';

import type { QrStudioState } from './types';

const QR_SIZE = 320;

const DEFAULT_DATA = ' ';

export const DOT_COLORS: Record<string, string> = {
  black: '#000000',
  blue: '#004ac6',
  indigo: '#4648d4',
};

export const BG_COLORS: Record<string, string> = {
  white: '#ffffff',
  slate: '#f1f5f9',
};

function mapShapeToDotType(shape: string): DotType {
  switch (shape) {
    case 'dots':
      return 'dots';
    case 'rounded':
      return 'rounded';
    case 'extra-rounded':
      return 'extra-rounded';
    case 'classy':
      return 'classy';
    case 'classy-rounded':
      return 'classy-rounded';
    default:
      return 'square';
  }
}

function mapEyeToCornerTypes(eye: string): { square: CornerSquareType; dot: CornerDotType } {
  switch (eye) {
    case 'dot':
      return { square: 'dot', dot: 'dot' };
    case 'extra-rounded':
      return { square: 'extra-rounded', dot: 'dot' };
    case 'rounded':
      return { square: 'extra-rounded', dot: 'rounded' };
    default:
      return { square: 'square', dot: 'square' };
  }
}

export function marginFromBlocks(blocks: number): number {
  return Math.min(48, Math.max(0, blocks) * 4);
}

export function buildQrOptions(state: QrStudioState): Options {
  const fg = DOT_COLORS[state.dotColorKey] ?? DOT_COLORS.black;
  const bg = BG_COLORS[state.bgColorKey] ?? BG_COLORS.white;
  const corners = mapEyeToCornerTypes(state.eyeShape);

  return {
    width: QR_SIZE,
    height: QR_SIZE,
    type: 'svg',
    data: state.content.trim() || DEFAULT_DATA,
    margin: marginFromBlocks(state.marginBlocks),
    qrOptions: {
      errorCorrectionLevel: state.errorCorrection,
      typeNumber: state.typeNumber,
    },
    dotsOptions: {
      type: mapShapeToDotType(state.dotShape === 'normal' ? 'square' : state.dotShape),
      color: fg,
    },
    backgroundOptions: { color: bg },
    cornersSquareOptions: {
      type: corners.square,
      color: state.useEyeColor ? fg : undefined,
    },
    cornersDotOptions: {
      type: corners.dot,
      color: state.useEyeColor ? fg : undefined,
    },
    image: state.logoDataUrl ?? undefined,
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.35,
      margin: 6,
    },
  };
}
