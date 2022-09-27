import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { setPopupData, unsetPopupData } from "../../../store/slices/popupSlice";
import styles from "./ShareLegalPreview.module.css";
import PopupButtons, { PopupButton } from "../PopupButtons";
import PopupContent from "../PopupContent";
import PopupHeader from "../PopupHeader";
import Checkbox from "../../ui/Checkbox";
import { consentShare } from "../../../store/slices/processesSlice";
import { RootState } from "../../../store/store";
import { AnyAction } from "@reduxjs/toolkit";
// import { shareInboundDataResponse } from '../../../slices/requestsSlice';

type Props = {
  requestId: string;
};

function ShareLegalPreview(props: Props) {
  const intl = useIntl();
  const { requestId } = props;

  const dispatch = useDispatch();
  const { requestorWebId } = useSelector(
    (state: RootState) => state.subjectRequests.items[requestId]
  );

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: "secondary",
      message: intl.formatMessage({
        id: "VwA7Is",
        defaultMessage: "Share later",
        description: "Popup share later button.",
      }),
      onPress: () => {
        dispatch(unsetPopupData());
      },
    },
    {
      uuid: uuid(),
      type: "primary",
      message: intl.formatMessage({
        id: "idsKv7",
        defaultMessage: "Next",
        description: "Popup next button.",
      }),
      disabled: !(checkbox1 && checkbox2 && checkbox3),
      onPress: () => {
        // dispatch(shareInboundDataResponse(requestId));
        dispatch(
          consentShare({
            requestId,
            requestorWebId,
            consentDocument: "consent text ...",
          }) as unknown as AnyAction
        ); // TODO: What type should it be?
        dispatch(
          setPopupData({
            component: "ShareInProgress",
            props: {
              requestId,
            },
          })
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupHeader
        title={intl.formatMessage({
          id: "IwF/TU",
          defaultMessage: "Consent document transfer",
          description: "Popup title when providing consent.",
        })}
        subtitle={intl.formatMessage({
          id: "9rKhuH",
          defaultMessage:
            "You are about to fetch your Unemployment certificate from Arbetsförmedlingen.",
          description: "Popup subtitle when providing consent.",
        })}
      />
      <PopupContent>
        <fieldset>
          <FormattedMessage
            id="3ZcQ4T"
            defaultMessage="TODO {providerName}"
            description="Popup check get data info text."
            values={{
              providerName: "PROVIDER_NAME",
            }}
          />
          <Checkbox
            id="popup_check_get_data_text_1"
            onChange={(evt) => setCheckbox1(evt.target.checked)}
          />
          <Checkbox
            id="popup_check_get_data_text_2"
            onChange={(evt) => setCheckbox2(evt.target.checked)}
          />
          <Checkbox
            id="popup_check_get_data_text_3"
            onChange={(evt) => setCheckbox3(evt.target.checked)}
          />
        </fieldset>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareLegalPreview;
