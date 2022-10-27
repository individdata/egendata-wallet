import React, { ReactElement } from 'react';
import { SWRConfig } from 'swr';

const withSWR = (content: ReactElement): ReactElement => {
  return <SWRConfig value={{ provider: () => new Map() }}>{content}</SWRConfig>;
};

export default withSWR;
