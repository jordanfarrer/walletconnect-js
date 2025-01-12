import {
  DYNAMIC_LINK_FIGURE_MOBILE_URL,
  FIGURE_MOBILE_WALLET_CONNECT_URL,
  FIGURE_MOBILE_WALLET_APP_ID,
  FIGURE_MOBILE_WALLET_PACKAGE_NAME,
} from '../../consts';
import { generateDynamicUrl } from '../../utils';

const urlDataArray = [
  // PRODUCTION URL
  {
    dataType: 'Production Url',
    appId: FIGURE_MOBILE_WALLET_APP_ID,
    originUrl: DYNAMIC_LINK_FIGURE_MOBILE_URL,
    packageName: FIGURE_MOBILE_WALLET_PACKAGE_NAME,
    qRCodeUrl:
      'wc%3A79d1d765-8d4c-49f6-95d8-baffeeb22808%401%3Fbridge%3Dwss%253A%252F%252Fwww.figure.tech%252Fservice-wallet-connect-bridge%252Fws%252Fexternal%26key%3Da3a477709e4ad8bbd3bf1318eaf8c1930124b3afc8824859caa0612c2ca36f4f',
    walletConnectUrl: FIGURE_MOBILE_WALLET_CONNECT_URL,
    result:
      'https://figurewallet.page.link?link=https%3A%2F%2Ffigure.com%2Fwallet-connect%3Fdata%3Dwc%25253A79d1d765-8d4c-49f6-95d8-baffeeb22808%2525401%25253Fbridge%25253Dwss%2525253A%2525252F%2525252Fwww.figure.tech%2525252Fservice-wallet-connect-bridge%2525252Fws%2525252Fexternal%252526key%25253Da3a477709e4ad8bbd3bf1318eaf8c1930124b3afc8824859caa0612c2ca36f4f&apn=com.figure.mobile.wallet&ibi=com.figure.mobile.wallet&isi=6444263900&efr=1',
  },
];

describe('Generate a dynamic mobile urls for production and test', () => {
  urlDataArray.forEach((urlData) => {
    const {
      appId,
      originUrl,
      packageName,
      qRCodeUrl,
      walletConnectUrl,
      dataType,
      result,
    } = urlData;
    test(`Valid dynamic mobile ${dataType} created`, () => {
      expect(
        generateDynamicUrl({
          appId,
          originUrl,
          packageName,
          qRCodeUrl,
          walletConnectUrl,
        })
      ).toBe(result);
    });
  });
});
