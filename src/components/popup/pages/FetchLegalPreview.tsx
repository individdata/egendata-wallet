import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { setPopupData } from "../../../store/slices/popupSlice";
import styles from "./FetchLegalPreview.module.css";
import PopupButtons, { PopupButton } from "../PopupButtons";
import PopupContent from "../PopupContent";
import PopupHeader from "../PopupHeader";
import Checkbox from "../../ui/Checkbox";
// import { createOutboundDataRequest } from '../../../slices/requestsSlice';
import { consentFetch } from "../../../store/slices/processesSlice";
import { RootState } from "../../../store/store";
import { AnyAction } from "@reduxjs/toolkit";

type Props = {
  requestId: string;
};

function FetchLegalPreview(props: Props) {
  const intl = useIntl();
  const { requestId } = props;

  const dispatch = useDispatch();
  const { providerWebId } = useSelector(
    (state: RootState) => state.subjectRequests.items[requestId]
  );

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: "primary",
      message: intl.formatMessage({
        id: 'm0KhCy',
        defaultMessage: "Consent and get data",
        description: "Popup providing consent button.",
      }),
      disabled: !(checkbox1 && checkbox2 && checkbox3),
      onPress: () => {
        dispatch(
          consentFetch({
            requestId,
            providerWebId,
            consentDocument: "consent text ...",
          }) as unknown as AnyAction
        ); // TODO: What type should it be?
        dispatch(
          setPopupData({
            component: "FetchInProgress",
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
            id="OCdt+0"
            defaultMessage='{party} will be provided information that you are registered as a job seeker at {providerName} and the date of such registration. For privacy reasons, {party} will not have access to any other information about you. You can withdraw your consent at any time which will terminate any further data transfer. When you are no longer registered as a job seeker in {af}, the transfer automatically terminates and you will need to provide an additional consent for the "job-seeker status" final date to be transfered to {party}.'
            description="Information before starting data fetching process."
            values={{
              party: "BNP Paribas",
              providerName: "X",
              af: "Arbetsförmedligen",
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

export default FetchLegalPreview;
