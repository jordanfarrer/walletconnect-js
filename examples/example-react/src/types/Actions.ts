export interface Field {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  width?: string;
  type?: 'number' | 'string';
}
export type WindowMessages = 'SEND_MESSAGE' | 'SIGN_JWT' | 'SIGNATURE';

export type WCJSMethod = 'sendMessage' | 'signJWT' | 'signMessage';

export interface Action {
  icon?: string;
  name: string;
  windowMessage: WindowMessages;
  method: WCJSMethod;
  gas?: boolean;
  fields: Field[];
  description: string;
}
