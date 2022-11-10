export type RequestState =
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
