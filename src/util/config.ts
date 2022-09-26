const config = {
  backendBaseUrl: process.env.REACT_APP_BACKEND_BASE_URL || 'https://wallet-backend-test.egendata.se/',
  backendWsUrl: process.env.REACT_APP_BACKEND_WS_URL || 'wss://wallet-backend-test.egendata.se/',
  idpBaseUrl: process.env.REACT_APP_IDP_BASE_URL || 'https://idp-test.egendata.se/',
  podProviderBaseUrl: process.env.REACT_APP_POD_PROVIDER_BASE_URL || 'https://pod-test.egendata.se/',
};

export default config;