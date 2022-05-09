import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData, unsetPopupData } from '../../../slices/popup2Slice';
import styles from './ShareLegalPreview.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';
import PopupHeader from '../PopupHeader';

type Props = {
  requestId: string,
};

function ShareLegalPreview(props: Props) {
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
          component: 'ShareComplete',
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
        subtitle="You are about to share your Unemployment certificate to BNP Paribas."
      />
      <PopupContent>
        <p>
          BNP Paribas will be provided information that you are registered as
          a job seeker in Arbetsförmedlingen and the date of such registration.
          For privacy reasons, BNP Paribas will not have access to any other
          information about you. You can withdraw your consent at any time which
          will terminate any further data transfer.
        </p>
        <p>
          When you are no longer registered as a job seeker in Arbetsförmedlingen,
          the transfer automatically terminates and you will need to provide an
          additional consent for the &apos;job-seeker status&apos; final date to be
          transfered to BNP Paribas.
        </p>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareLegalPreview;
