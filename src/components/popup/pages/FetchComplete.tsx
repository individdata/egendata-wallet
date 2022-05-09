import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { unsetPopupData } from '../../../slices/popup2Slice';
import styles from './FetchComplete.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';

type Props = {
  requestId: string,
};

function FetchComplete(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons = [
    {
      uuid: uuid(),
      label: 'Close',
      onPress: () => {
        dispatch(unsetPopupData());
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupContent>
        <p>
          {`requestId: ${requestId})`}
        </p>
        <p>
          Your Registration certificate
          from Arbetsförmedlingen has now
          been fetched. Click view data to review
          all the fetched data.
        </p>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchComplete;
