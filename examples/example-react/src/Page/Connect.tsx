import {
  useWalletConnect,
  QRCodeModal,
  WINDOW_MESSAGES,
  BroadcastResult,
} from '@provenanceio/walletconnect-js';
import { Button, Card, Dropdown, Input, Results, Checkbox } from 'Components';
import { ICON_NAMES, BRIDGE_URLS } from 'consts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS, FONTS } from 'theme';

const AdvancedOptionsToggle = styled.p<{ showAdvanced: boolean }>`
  margin-bottom: 30px;
  user-select: none;
  cursor: pointer;
  color: ${({ showAdvanced }) =>
    showAdvanced ? COLORS.PRIMARY_300 : COLORS.PRIMARY_500};
  font-weight: bold;
  font-style: italic;
  font-size: 1.2rem;
`;
const AdvancedOptions = styled.div`
  border: 1px solid ${COLORS.NEUTRAL_250};
  background: ${COLORS.NEUTRAL_100};
  padding: 20px 30px;
  border-radius: 4px;
  margin-bottom: 20px;
`;
const QRCodeModalStyled = styled(QRCodeModal)`
  background: ${COLORS.BLACK_70};
  font-family: ${FONTS.SECONDARY_FONT};
`;

export const Connect: React.FC = () => {
  const [selectedBridge, setSelectedBridge] = useState(BRIDGE_URLS[0]);
  const [address, setAddress] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [groupsAllowed, setGroupsAllowed] = useState(true);
  const [jwtExpiration, setJwtExpiration] = useState('');
  const [sessionDuration, setSessionDuration] = useState('3600');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState<{
    [key: string]: any;
  } | null>(null);
  const { walletConnectService: wcs, walletConnectState } = useWalletConnect();
  const { status } = walletConnectState;
  const navigate = useNavigate();

  // Listen for a connection, then redirect to action page
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);

      const handleConnectedEvent = (results: BroadcastResult) => {
        setResults({
          data: { ...walletConnectState, broadcastResult: results },
        });
      };
      wcs.addListener(WINDOW_MESSAGES.CONNECTED, handleConnectedEvent);
      wcs.addListener(WINDOW_MESSAGES.DISCONNECT, handleConnectedEvent);
    }
  }, [wcs, navigate, initialLoad, walletConnectState]);

  const toggleAdvancedOptions = () => {
    setShowAdvanced(!showAdvanced);
  };

  if (status === 'connected')
    return (
      <Card
        title="Connection Successful"
        logoIcon={ICON_NAMES.CHECK}
        bannerName="figureBuildings"
        logoBg={COLORS.NOTICE_400}
      >
        Select additional wallet actions from the sidebar menu
        <Results results={results} setResults={setResults} />
      </Card>
    );
  if (status === 'disconnected')
    return (
      <Card title="Connect your Wallet" logoIcon={ICON_NAMES.WALLETCONNECT}>
        <AdvancedOptionsToggle
          showAdvanced={showAdvanced}
          onClick={toggleAdvancedOptions}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </AdvancedOptionsToggle>
        {showAdvanced && (
          <AdvancedOptions>
            <Dropdown
              options={BRIDGE_URLS}
              onChange={setSelectedBridge}
              value={selectedBridge}
              label="Select Bridge"
              bottomGap
            />
            <Input
              onChange={setAddress}
              value={address}
              label="Enter wallet address to connect with (optional)"
              placeholder="Enter wallet address (optional)"
              bottomGap
            />
            <Input
              onChange={setJwtExpiration}
              value={jwtExpiration}
              label="Custom JWT Expiration in seconds (optional)"
              placeholder="Use default (24 hours)"
              bottomGap
            />
            <Input
              onChange={setSessionDuration}
              value={sessionDuration}
              label="Custom session duration in seconds (optional)"
              placeholder="Use default (3600 seconds/1 hour)"
              bottomGap
            />
            <Checkbox
              label="Group Accounts Allowed"
              checked={groupsAllowed}
              onChange={setGroupsAllowed}
            />
          </AdvancedOptions>
        )}
        <Button
          onClick={() =>
            wcs.connect({
              bridge: selectedBridge,
              duration: Number(sessionDuration),
              address,
              prohibitGroups: !groupsAllowed,
              jwtExpiration: Number(jwtExpiration),
            })
          }
        >
          Connect
        </Button>
        <QRCodeModalStyled
          walletConnectService={wcs}
          devWallets={['figure_web_test', 'figure_mobile_test']}
        />
      </Card>
    );
  return (
    <Card
      title="Connection Pending"
      logoIcon={ICON_NAMES.WALLETCONNECT}
      logoBg={COLORS.SECONDARY_500}
    >
      Connection is currently pending.
      <QRCodeModalStyled
        walletConnectService={wcs}
        devWallets={['figure_web_test', 'figure_mobile_test']}
      />
    </Card>
  );
};
