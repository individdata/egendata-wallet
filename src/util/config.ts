export default {
  backendBaseUrl: process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:3002/',
  idpBaseUrl: process.env.REACT_APP_IDP_BASE_URL || 'http://localhost:3001/',
  podProviderBaseUrl: process.env.REACT_APP_POD_PROVIDER_BASE_URL || 'http://localhost:3000/',
};
