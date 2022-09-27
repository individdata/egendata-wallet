import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { Grid } from "@mui/material";
import { unsetPopupData } from "../../../store/slices/popupSlice";
import styles from "./ShareComplete.module.css";
import PopupButtons, { PopupButton } from "../PopupButtons";
import PopupContent from "../PopupContent";
import TextField from "../../ui/TextField";

type Props = {
  requestId: string;
};

function ShareComplete(props: Props) {
  const intl = useIntl();
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: "primary",
      message: intl.formatMessage({
        id: '4l8wsO',
        defaultMessage: "Return to requesting service",
        description: "Popup return to requesting service, leaving us.",
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
          <img className={styles.logoSuccess} alt="Success logo" />
          <div className={styles.titleText}>
            <FormattedMessage
              id="ihPHBB"
              defaultMessage="Your {document} is now being shared with {party}."
              description="Successfully shared document title."
              values={{
                document: "unemployment certificate",
                party: "BNP Paribas",
              }}
            />
          </div>
          <div className={styles.noteText}>
            <FormattedMessage 
              id="l8RpOr"
              defaultMessage="You can always revoke your consent under Consents." 
              description="Successfully shared document subtitle."
            />
          </div>
          <div className={styles.ctaText}>
            <FormattedMessage 
              id="Oy3/Wo"
              defaultMessage="Stay up to date on all your data matters."
              description="Popup success share description."
            />
          </div>
          <div className={styles.noteText}>
            <FormattedMessage 
              id="URmXKu"
              defaultMessage="Just enter your Email address"
              description="Success share enter email."
            />
          </div>
          <Grid container spacing={1} className={styles.formContainer}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField type="email" placeholder="example@email.com" />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="phone" placeholder="telephone number" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareComplete;
