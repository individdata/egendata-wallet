/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import styles from "./index.module.css";
import styles2 from "../card/index.module.css";
import { style4 } from "../../styles";
import { BodyTypes, CeritificateMissingTypes, CheckTypes } from "../../types";
import { check, review } from "../../popupSlice";
import { checkGetdataCheckInfo } from "../../document";

export function ReviewInfoBox(props: BodyTypes) {
  const { msg } = props;
  return (
    <Grid container className={styles.scroll}>
      <Grid xs={12} sx={style4.pad20}>
        {msg}
      </Grid>
    </Grid>
  );
}

export const MultiCheckMarkBox = () => {
  const [checked, setChecked] = useState([false, false, false]);
  const names = checkGetdataCheckInfo;
  const dispatch = useDispatch();

  function allAreTrue(arr: any) {
    return arr.every((el: boolean) => el === true);
  }

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    const _checked = [...checked];
    _checked[index] = event.target.checked;
    setChecked(_checked);
  };

  useEffect(() => {
    if (allAreTrue(checked)) {
      dispatch(dispatch(check()));
    } else {
      dispatch(dispatch(review()));
    }
  }, [checked]);

  return (
    <Grid container spacing={3}>
      {names.map((values, index) => (
        <>
          <Grid item xs={12} md={2}>
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={(event) => handleCheck(event, index)}
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <CheckBoxText msg={values} />
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export function CheckBoxText(props: BodyTypes) {
  const { msg } = props;
  return (
    <Grid container xs={12} md={10}>
      <Grid item xs={12} md={12} sx={{ fontSize: "13px", fontWeight: "600" }}>
        {msg}
      </Grid>
    </Grid>
  );
}

export function CheckBox(props: CheckTypes) {
  const { items } = props;
  const checks = items.map((key) => {
    return (
      <div key={key} className={styles.check}>
        <MultiCheckMarkBox />
      </div>
    );
  });
  return (
    <Grid container className={styles.scroll}>
      <Grid xs={12} sx={style4.pad20}>
        {checks}
      </Grid>
    </Grid>
  );
}

export const MissingUnEmploymentCertBody = (
  props: CeritificateMissingTypes
) => {
  const { text1, text2, textP } = props;
  return (
    <>
      <Grid item xs={12}>
        <Grid className={styles2.center}>
          <Grid className={styles2.text}>{text1}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid className={styles2.center}>
          <Grid sx={{ maxWidth: "400px" }}>
            <Grid className={styles2.text}>{text2}</Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid className={styles2.center}>
          <Grid sx={{ maxWidth: "550px" }} className={styles2.text2}>
            {textP}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
