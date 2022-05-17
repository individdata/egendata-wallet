/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../../store';
import { changeLang } from '../../../slices/langSlice';

function LangButton() {
  const lang = useSelector((state: RootState) => state.lang.lang);
  let buttontext = 'English';
  if (lang === 'en') {
    buttontext = 'Svenska';
  }
  const dispatch = useDispatch();
  return (
    <div className={styles.langItem}>
      <img className={styles.logo} alt="logo" />
      <button
        className={styles.button}
        type="button"
        onClick={() => dispatch(changeLang())}
        id="change-lange"
      >
        <div className={styles.buttontext}>
          {buttontext}
        </div>
      </button>
    </div>
  );
}

export default LangButton;
