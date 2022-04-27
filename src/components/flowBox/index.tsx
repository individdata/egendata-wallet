/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../store';

export type Title = {
  status: string;
};

export type Logo = {
  number: string;
};

export type Text = {
  text: string;
};

function FlowTitle(props: Title) {
  const { status } = props;
  if (status === 'null') {
    return (
      <div className={styles.projectOak}>
        <div className={styles.project}>
          Project
          <div className={styles.oak}>OAK</div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.space} />
  );
}

function FlowLogo(props: Logo) {
  const { number } = props;
  return (
    <div className={styles.img}>
      <div className={styles.number}>{number}</div>
    </div>
  );
}

function FlowText(props: Text) {
  const { text } = props;
  return (
    <div className={styles.text}>{text}</div>
  );
}

function FlowBox() {
  const { id } = useParams();
  let requestState = 'null';
  if (id) {
    requestState = useSelector((state: RootState) => state.requests[id].status);
  }
  console.log(requestState);
  return (
    <div className={styles.box}>
      <div className={styles.lines}>
        <FlowTitle status={requestState} />
        <div className={styles.flow}>
          <div className={styles.showrow}>
            <FlowLogo number="1" />
            <div className={styles.arrowflow}>
              <img className={styles.arrow} alt="arrow" />
            </div>
            <FlowLogo number="2" />
          </div>
        </div>
        <div className={styles.texts}>
          <div className={styles.showrow}>
            <FlowText text="Get your data" />
            <FlowText text="Share your data" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowBox;
