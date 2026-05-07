import type { QrStudioAction, QrStudioState } from './types';

export const initialQrStudioState: QrStudioState = {
  content: 'https://example.com',
  marginBlocks: 2,
  errorCorrection: 'Q',
  typeNumber: 0,
  dotColorKey: 'black',
  bgColorKey: 'white',
  dotShape: 'normal',
  eyeShape: 'square',
  useEyeColor: false,
  logoDataUrl: null,
  outputMode: 'pure',
  caption: '',
  hasGenerated: false,
  contentErrorKey: null,
};

export function qrStudioReducer(state: QrStudioState, action: QrStudioAction): QrStudioState {
  switch (action.type) {
    case 'patch':
      return { ...state, ...action.patch };
    case 'generateInvalid':
      return { ...state, contentErrorKey: 'emptyContent' };
    case 'generate':
      return {
        ...state,
        contentErrorKey: null,
        hasGenerated: true,
      };
    default:
      return state;
  }
}
