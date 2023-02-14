import type { Action } from 'types';
import { ICON_NAMES } from './iconNames';

export const ALL_ACTIONS: Action[] = [
  // ------------------------------
  // Custom Action Method/Action
  // ------------------------------
  {
    icon: ICON_NAMES.GEAR,
    name: 'Send Message',
    windowMessage: 'SEND_MESSAGE',
    method: 'sendMessage',
    description: 'Pass along an encoded base64 message to the wallet',
    gas: true,
    fields: [
      {
        name: 'message',
        label: 'Base64 Encoded Message',
        value: '',
        placeholder: 'Enter Base64 Encoded Message',
      },
      {
        name: 'method',
        label: 'Message method',
        value: 'provenance_sendTransaction',
        placeholder: 'Enter the message method',
      },
      {
        name: 'description',
        label: 'Wallet message description (Optional)',
        value: '',
        placeholder: 'Enter message description',
      },
    ],
  },
  {
    icon: ICON_NAMES.GEAR,
    name: 'Send Wallet Message',
    windowMessage: 'SEND_WALLET_MESSAGE',
    method: 'sendWalletMessage',
    description: 'Pass along a plain JSON message to the wallet w/o broadcast or signing.',
    fields: [
      {
        name: 'payload',
        label: 'JSON Message',
        value: '',
        placeholder: 'JSON Message',
      },
      {
        name: 'action',
        label: 'Action',
        value: '',
        placeholder: 'Action',
      },
      {
        name: 'method',
        label: 'Message method',
        value: 'provenance_sendTransaction',
        placeholder: 'Enter the message method',
      },
      {
        name: 'description',
        label: 'Wallet message description (Optional)',
        value: '',
        placeholder: 'Enter message description',
      },
    ],
  },

  // ------------------------------
  // Sign JWT Method/Action
  // ------------------------------
  {
    icon: ICON_NAMES.PENCIL,
    name: 'Sign JWT',
    windowMessage: 'SIGN_JWT',
    method: 'signJWT',
    description: 'Sign a new JWT, updated any existing value',
    fields: [
      {
        value: '',
        label: 'Custom JWT Expiration',
        placeholder: 'Enter custom expiration (seconds from now)',
        name: 'expires',
        type: 'number',
      },
    ],
  },
  // ----------------------------------
  // Sign Message Method/Action
  // ----------------------------------
  {
    icon: ICON_NAMES.PENCIL,
    name: 'Sign Message',
    windowMessage: 'SIGNATURE',
    method: 'signMessage',
    description: 'Send a sign request message to the wallet',
    fields: [
      {
        value: 'WalletConnect-JS | WebDemo | Sign Message',
        label: 'Message',
        placeholder: 'Enter Message',
        name: 'message',
      },
    ],
  },
];
