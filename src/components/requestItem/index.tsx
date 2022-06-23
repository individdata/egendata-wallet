/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { SubjectRequest } from '../../slices/requests/subjectRequestsSlice';
import styles from './index.module.css';

function RequestItem(props: SubjectRequest) {
  const [redirect, setRedirect] = useState<boolean | string>(false);
  const {
    id,
  } = props;
  const requestor = 'BNP Paribas';
  if (redirect && typeof (redirect) === 'string') {
    return <Navigate to={redirect} replace />;
  }
  console.log('___________', redirect);
  return (
    <div key={id} className={styles.shape}>
      <button
        type="button"
        className={styles.requestBox}
        onClick={() => setRedirect(`/request/${id}`)}
      >
        <img className={styles.logo} alt="logo" />
        <div className={styles.name}>{requestor}</div>
        <div className={styles.brief}>{id}</div>
        <div className={styles.date}>2022-06-10</div>
      </button>
    </div>
  );
}

export default RequestItem;
