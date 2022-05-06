/* eslint-disable */
import { css } from "@emotion/react";
import Grid from "@mui/material/Grid";
import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MissingUnEmployementButton } from "../../button/utils";
import { MissingUnEmployementHeader } from "../../header/utils";
import { style4 } from "../../styles";
import {BarLoader} from "react-spinners"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import {
  BodyTypes,
  CertificateProps,
  ItemsTypes,
  TitleTypes,
  CeritificateMissingTypes,
  PlaceholderTypes,
} from "../../types";
import { MissingUnEmploymentCertBody } from "../info/utils";
import styles from "./index.module.css";

const tryAgainStyle = {
  marginTop: {
    marginTop: '50px'
  },

};

export function Title(props: TitleTypes) {
  const { title } = props;
  return (
    <Grid container sx={style4.centerRow}>
      <Grid xs={6} className={styles.titlefield} sx={style4.colorBottom}>
        {title}
      </Grid>
    </Grid>
  );
}

export function Items(props: ItemsTypes) {
  const { name, status } = props;
  return (
    <div>
      <Grid container className={styles.centerMe}>
        <Grid xs={12} className={styles.field}>
          {name}
          <div className={styles.status}>{status}</div>
        </Grid>
      </Grid>
    </div>
  );
}

export function Certificate(props: CertificateProps) {
  const { certificate } = props;
  const items = Object.keys(certificate).map((key) => {
    return <Items name={key} status={certificate[key]} />;
  });
  return (
    <Grid className={styles.stickyScroll}>
      <Title title="Unmployment certificate" />
      {items}
    </Grid>
  );
}

export function CheckInfo(props: BodyTypes) {
  const { msg } = props;
  return <Grid className={styles.stickyScrollHigh}>{msg}</Grid>;
}

export function SuccessGetDataBox(props: BodyTypes) {
  const { msg } = props;
  return (
    <Grid container className={styles.scroll}>
      <Grid xs={12} sx={style4.pad20}>
        <div className={styles.rows}>
          <div className={styles.row}>
            <img className={styles.logo} />
          </div>
          {msg}
        </div>
      </Grid>
    </Grid>
  );
}

export function MissingUnEmployementCert(props: CeritificateMissingTypes) {
  return (
    <Grid container spacing={3} sx={{ display: "flex" }}>
      <Grid item xs={12} />
      <MissingUnEmployementHeader />
      <MissingUnEmploymentCertBody {...props} />
      <MissingUnEmployementButton />
    </Grid>
  );
}


export const  FetchingDataPopup= (props: BodyTypes) => {
  const { msg } = props;
  const loading = true;
  const color = '#65D36E';

  const oCss = css`
     border-radius: 15px
     ` as any;
  return (

    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={styles.empty} />
      </Grid>
      <Grid item xs={12}>
        <Grid className={styles.center}>
          <Grid className={styles.text}>
            {msg}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid className={styles.center} sx={{ marginTop: '5%' }}>
          <Grid id={styles.danger} />
          <BarLoader color={color} loading={loading} height={10} width={320} css={oCss} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <div className={styles.empty} />
      </Grid>
    </Grid>

  );
}
export const GeneralInputEmail = (props: PlaceholderTypes ) => {
  const { placeholder } = props;
  return (
  <Grid container className={styles.center}>
      <form className={styles.form}>
        <Grid item xs={12} md={3}>
          <FontAwesomeIcon
            icon={faEnvelope}
            fontSize="22"
            className={styles.emailIcon}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder={placeholder}
            className={styles.inputField}
          />
        </Grid>
      </form>
    </Grid>
  );

}

export const TryAgainLaterPopup = (props:BodyTypes) => {
    const { msg } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid className={styles.center} sx={{ marginTop: '15%' }}>
          <Grid id={styles.danger}>
            <AiOutlineExclamationCircle />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid className={styles.center}>
          <Grid className={styles.text}>
            {msg}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={tryAgainStyle.marginTop}>
        <button
          type="button"
          className={styles.button}
        >
          <div className={styles.consent}>ok</div>
        </button>
      </Grid>

      <Grid item xs={12}>
        <div className={styles.empty} />
      </Grid>
    </Grid>

  );
}

export function FecthingBar() {
  return <Grid>
    <div className={styles.fetchColumn}>
      <div className={styles.fecthText}>Fetching data ...</div>
      <div className={styles.ldsring}><div></div><div></div><div></div><div></div></div>
    </div>
  </Grid>;
}
