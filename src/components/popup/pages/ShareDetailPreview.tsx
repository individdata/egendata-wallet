import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData, unsetPopupData } from '../../../slices/popup2Slice';
import styles from './ShareDetailPreview.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';
import PopupHeader from '../PopupHeader';

type Props = {
  requestId: string,
};

function ShareDetailPreview(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons = [
    {
      uuid: uuid(),
      label: 'Share later',
      onPress: () => {
        dispatch(unsetPopupData());
      },
    },
    {
      uuid: uuid(),
      label: 'Next',
      onPress: () => {
        dispatch(setPopupData({
          component: 'ShareLegalPreview',
          props: {
            requestId,
          },
        }));
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupHeader
        title={`Review your document data (requestId: ${requestId})`}
        subtitle="Review your Unemployment certificate data to be shared with BNP Paribas."
      />
      <PopupContent>
        <p>
          If you don&apos;t think the data is correct or have any
          objections you should contact Arbetsförmedlingen.
        </p>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareDetailPreview;
