import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { setPopupData } from "../../../store/slices/popupSlice";
import styles from "./FetchDetailPreview.module.css";
import PopupButtons, { PopupButton } from "../PopupButtons";
import PopupContent from "../PopupContent";
import PopupHeader from "../PopupHeader";
import {
  reviewGetdataBoxItems,
  reviewGetdataInfo,
} from "../../../util/document";
import Certificate from "../../certificate";
import { useIntl } from "react-intl";

type Props = {
  requestId: string;
};

function FetchDetailPreview(props: Props) {
  const intl = useIntl();
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: "primary",
      message: intl.formatMessage({
        id: 'cPkVMH',
        defaultMessage: "Continue to get data",
        description: "Popup continue button.",
      }),
      onPress: () => {
        dispatch(
          setPopupData({
            component: "FetchLegalPreview",
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
        <Certificate certificate={reviewGetdataBoxItems} />
        <p>{reviewGetdataInfo}</p>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchDetailPreview;
