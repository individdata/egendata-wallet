/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import { style4 } from '../../styles';
import { BodyTypes, CheckTypes } from '../../types';
import { check } from '../../popupSlice';

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

export function Checkbox() {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (c: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(c.target.checked);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (checked) {
      dispatch(dispatch(check()));
    }  
  }, [checked]);
  return (
    <Grid item xs={12} md={2}>
      <input
        type="checkbox"
        className={styles.checkboxItem}
        style={{ margin: 'auto' }}
        checked={checked}
        onChange={handleChange}
      />
    </Grid>
  );
}

export function CheckBoxText(props: BodyTypes) {
  const { msg } = props;
  return (
    <Grid container xs={12} md={10}>
      <Grid item xs={12} md={12} sx={{ fontSize: '13px', fontWeight: '600' }}>
        {msg}
      </Grid>
    </Grid>
  );
}

export function CheckBox(props: CheckTypes) {
  const { items } = props;
  const checks = items.map((key) => {
    return (
      <div className={styles.check}>
        <Checkbox />
        <CheckBoxText msg={key} />
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
