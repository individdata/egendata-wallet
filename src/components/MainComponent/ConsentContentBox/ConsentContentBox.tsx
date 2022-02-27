import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../state/reducers';

function ConsentContentBox() {
  const consentState = useSelector((state: State) => state.consent);
  return (
    <div style={{ display: consentState.contentVisible }}>
      hallo, inbox
    </div>
  );
}

export default ConsentContentBox;