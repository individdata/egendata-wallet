import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../state/reducers';
import InboxConsentBox from './InboxContentBox/InboxContentBox';

function TagsComponent() {
  const authState = useSelector((state: State) => state.auth);
  return (
    <div style={{ display: authState.tags }}>
      <InboxConsentBox />
    </div>
  );
}

export default TagsComponent;
