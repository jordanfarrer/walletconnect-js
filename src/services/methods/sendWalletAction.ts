import {
  WALLET_LIST,
  WALLET_APP_EVENTS,
  PROVENANCE_METHODS,
  WINDOW_MESSAGES,
} from '../../consts';
import { rngNum } from '../../utils';
import type {
  BroadcastEventData,
  WalletConnectClientType,
  WalletId,
  SendWalletActionMethod,
} from '../../types';

interface SendWalletAction {
  connector?: WalletConnectClientType;
  data: SendWalletActionMethod;
  walletAppId?: WalletId;
}

export const sendWalletAction = async ({
  connector,
  walletAppId,
  data,
}: SendWalletAction): Promise<
  BroadcastEventData[typeof WINDOW_MESSAGES.SWITCH_TO_GROUP_COMPLETE]
> => {
  const {
    description = 'Send Wallet Action',
    method = PROVENANCE_METHODS.action,
    action,
    payload,
  } = data;
  const metadata = JSON.stringify({
    description,
    action,
    payload,
    date: Date.now(),
  });
  // Custom Request
  const request = {
    id: rngNum(),
    jsonrpc: '2.0',
    method,
    params: [metadata],
  };
  if (!connector) return { valid: false, request, error: 'No wallet connected' };

  // Check for a known wallet app with special callback functions
  const knownWalletApp = WALLET_LIST.find((wallet) => wallet.id === walletAppId);

  try {
    // If the wallet app has an eventAction (web/extension) trigger it
    if (knownWalletApp && knownWalletApp.eventAction) {
      const eventData = { event: WALLET_APP_EVENTS.EVENT };
      knownWalletApp.eventAction(eventData);
    }

    // send message
    const result = await connector.sendCustomRequest(request);

    return {
      valid: !!result,
      result,
      request,
    };
  } catch (error) {
    return { valid: false, error: `${error}`, request };
  }
};
