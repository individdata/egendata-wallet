import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../state/reducers';

function MydataContentBox() {
  const mydataState = useSelector((state: State) => state.mydata);
  return (
    <div style={{ display: mydataState.contentVisible }}>
      hallo, inbox
    </div>
  );
}

export default MydataContentBox;