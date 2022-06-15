export default {
  backendBaseUrl: process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:8000/', // https://wallet-backend-test.egendata.se/',
  backendWsUrl: process.env.REACT_APP_BACKEND_WS_URL || 'ws://localhost:8000/', // 'wss://wallet-backend-test.egendata.se/',
  idpBaseUrl: process.env.REACT_APP_IDP_BASE_URL || 'https://idp-test.egendata.se/',
  podProviderBaseUrl: process.env.REACT_APP_POD_PROVIDER_BASE_URL || 'https://pod-test.egendata.se/',
};

/*
  backendBaseUrl: process.env.REACT_APP_BACKEND_BASE_URL || 'https://wallet-backend-test.egendata.se/',
  backendWsUrl: process.env.REACT_APP_BACKEND_WS_URL || 'wss://wallet-backend-test.egendata.se/',
  idpBaseUrl: process.env.REACT_APP_IDP_BASE_URL || 'https://idp-test.egendata.se/',
  podProviderBaseUrl: process.env.REACT_APP_POD_PROVIDER_BASE_URL || 'https://pod-test.egendata.se/',

  backendBaseUrl: process.env.REACT_APP_BACKEND_BASE_URL || 'https://digital-wallet-backend-oak-develop.test.services.jtech.se/',
  backendWsUrl: process.env.REACT_APP_BACKEND_WS_URL || 'wss://digital-wallet-backend-oak-develop.test.services.jtech.se/',
  idpBaseUrl: process.env.REACT_APP_IDP_BASE_URL || 'https://oak-identity-provider-oak-develop.test.services.jtech.se/',
  podProviderBaseUrl: process.env.REACT_APP_POD_PROVIDER_BASE_URL || 'https://oak-pod-provider-oak-develop.test.services.jtech.se/',
*/
