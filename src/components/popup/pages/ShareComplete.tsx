import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { unsetPopupData } from '../../../slices/popup2Slice';
import styles from './ShareComplete.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';

type Props = {
  requestId: string,
};

function ShareComplete(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons = [
    {
      uuid: uuid(),
      label: 'Return to requesting service',
      onPress: () => {
        dispatch(unsetPopupData());
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupContent>
        <p>
          {`requestId: ${requestId}`}
        </p>
        <p>
          Your unemployement certificat is now being shared with BNP Paribas.
        </p>
        <p>
          You can always revoke your consent under Consents.
        </p>
        <p>
          Stay up to date on all your data matters.
        </p>
        <p>
          Just enter your Email address
        </p>
        <div>
          <input type="text" placeholder="example@email.com" />
        </div>
        <div>
          <input type="text" placeholder="telephone number" />
        </div>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareComplete;
