import React, { createContext, useContext, useEffect, useState, ReactElement } from 'react';
import { WalletConnectService, State } from '../services';
import { CONNECTION_TIMEOUT } from '../consts';

interface ProviderState {
  walletConnectService: WalletConnectService,
  walletConnectState: State
}

const StateContext = createContext<ProviderState | undefined>(undefined);
const walletConnectService = new WalletConnectService();

interface Props {
  children: ReactElement,
  network?: 'testnet' | 'mainnet',
  bridge?: string,
  timeout?: number,
}

const WalletConnectContextProvider:React.FC<Props> = ({ children, network, bridge, timeout }) => {
  const [walletConnectState, setWalletConnectState] = useState<State>({ ...walletConnectService.state });

  useEffect(() => {
    walletConnectService.setStateUpdater(setWalletConnectState); // Whenever we change the react state, update the class state
    // If custom props are passed in, update the defaults
    if (network) { walletConnectService.setNetwork(network) }
    if (bridge) { walletConnectService.setBridge(bridge) }
    if (timeout) { walletConnectService.setConnectionTimeout(timeout) }
    // Check if we have an address and public key, if so, auto-reconnect to session
    if (walletConnectState.address) {
      // Reconnect the users walletconnect session
      walletConnectService.connect();
      // Compare the "connection initialized at" time to current time
      const now = Math.floor(Date.now() / 1000);
      const finalTimeout = timeout || CONNECTION_TIMEOUT;
      if (walletConnectState.connectionIat && (now - walletConnectState.connectionIat) > finalTimeout) {
        walletConnectService.disconnect();
      }
    }
    return () => walletConnectService.removeAllListeners();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StateContext.Provider value={{ walletConnectService, walletConnectState }}>
      {children}
    </StateContext.Provider>
  );
};

const useWalletConnect = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useWalletConnect must be used within a WalletConnectContextProvider');
  }
  return context;
};

export { WalletConnectContextProvider, useWalletConnect };
