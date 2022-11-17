export type ExtendedRequestState =
  | 'received'
  | 'fetching'
  | 'available'
  | 'preview'
  | 'consent'
  | 'sharing'
  | 'shared'
  | 'timeout'
  | 'missing'
  | 'error';

export type RequestState = 'received' | 'fetching' | 'available' | 'shared';

export type RequestInfo = {
  id: string;
  url: URL;
  state: RequestState;
};

export type RequestInfoWithDetails = RequestInfo & {
  type: string;
  documentTitle: string;
  documentType: string;
  providerWebId: URL;
  purpose: string;
  requestorWebId: URL;
  returnUrl: URL;
  created: Date;
};
