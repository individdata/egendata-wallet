import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData } from '../../../slices/popup2Slice';
import styles from './FetchDetailPreview.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';
import PopupHeader from '../PopupHeader';

type Props = {
  requestId: string,
};

function FetchDetailPreview(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons = [
    {
      uuid: uuid(),
      label: 'Continue to get data',
      onPress: () => {
        dispatch(setPopupData({
          component: 'FetchLegalPreview',
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
        title={`Consent document transfer (requestId: ${requestId})`}
        subtitle="You are about to fetch your Unemployment certificate from Arbetsförmedlingen."
      />
      <PopupContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchDetailPreview;
