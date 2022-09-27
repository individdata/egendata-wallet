import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { unsetPopupData } from "../../../store/slices/popupSlice";
import styles from "./FetchTimeout.module.css";
import PopupButtons, { PopupButton } from "../PopupButtons";
import PopupContent from "../PopupContent";
// import { RootState } from '../../../store';

function FetchTimeout() {
  const intl = useIntl();
  // const { requestId } = props;

  const dispatch = useDispatch();
  // const request = useSelector((state: RootState) => state.process[requestId]);

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: "primary",
      message: intl.formatMessage({
        id: 'udrupD',
        defaultMessage: "Close",
        description: "Popup close button.",
      }),
      onPress: () => {
        dispatch(unsetPopupData());
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupContent>
        <div className={styles.content}>
          <FormattedMessage
            id="rE/FVx"
            defaultMessage="Your fetching is under proceed get notified when it''s ready."
            description="Waiting for fetching data."
          />
        </div>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchTimeout;
