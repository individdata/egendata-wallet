import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { setPopupData } from "../../../store/slices/popupSlice";
import styles from "./FetchInProgress.module.css";
import PopupButtons from "../PopupButtons";
import PopupContent from "../PopupContent";
import { RootState } from "../../../store/store";
import ActivityIndicator from "../../ui/ActivityIndicator";
import useTimeout from "../../../hooks/useTimeout";
import { request } from "http";

type Props = {
  requestId: string;
};

function FetchInProgress(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.items[requestId]);
  const intl = useIntl();

  const expired = useTimeout(15000);

  useEffect(() => {
    if (data && data.document) {
      dispatch(
        setPopupData({
          component: "FetchComplete",
          props: {
            requestId,
          },
        })
      );
    }
  }, [data, requestId]);

  useEffect(() => {
    if (expired) {
      dispatch(
        setPopupData({
          component: "FetchTimeout",
          props: {
            requestId,
          },
        })
      );
    }
  }, [expired, requestId]);

  return (
    <div className={styles.container}>
      <PopupContent>
        <ActivityIndicator
          text={intl.formatMessage({
            id: 'nGzRRb',
            defaultMessage: "Fetching data...",
            description: "Waiting on process.",
          })}
        />
      </PopupContent>
      <PopupButtons buttons={[]} />
    </div>
  );
}

export default FetchInProgress;
