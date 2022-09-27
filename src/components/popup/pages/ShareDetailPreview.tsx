import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { setPopupData, unsetPopupData } from "../../../store/slices/popupSlice";
import styles from "./ShareDetailPreview.module.css";
import PopupButtons, { PopupButton } from "../PopupButtons";
import PopupContent from "../PopupContent";
import PopupHeader from "../PopupHeader";
import {
  reviewGetdataInfo,
  reviewShareddataBoxItems,
} from "../../../util/document";
import Certificate from "../../certificate";
import { useIntl } from "react-intl";

type Props = {
  requestId: string;
};

function ShareDetailPreview(props: Props) {
  const intl = useIntl();
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: "secondary",
      message: intl.formatMessage({
        id: 'VwA7Is',
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
        id: '2PffNX',
        defaultMessage: "Continue to share data",
        description: "Popup share now button.",
      }),
      onPress: () => {
        dispatch(
          setPopupData({
            component: "ShareLegalPreview",
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
          id: "OY/hPX",
          defaultMessage: "Review your document data",
          description: "Popup title when reviewing document to share.",
        })}
        subtitle={intl.formatMessage({
          id: "yU4pU6",
          defaultMessage:
            "Review your Unemployment certificate data to be shared with BNP Paribas.",
          description: "Popup subtitle when reviewing document to share.",
        })}
      />
      <PopupContent>
        <Certificate certificate={reviewShareddataBoxItems} />
        <p>{reviewGetdataInfo}</p>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareDetailPreview;
